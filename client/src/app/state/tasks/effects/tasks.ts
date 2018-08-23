import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import {
  catchError,
  map,
  mergeMap,
  retry,
  switchMap,
  tap
} from "rxjs/operators";
import { TaskService } from "../../../core/services/task.service";
import { AddTaskDialogComponent } from "../../../shared/dialogs/add-task-dialog/add-task-dialog.component";
import { HttpError } from "../../shared/actions/error";
import { SnackbarOpen } from "../../shared/actions/snackbar";
import { HideSpinner, ShowSpinner } from "../../shared/actions/spinner";
import {
  ADD_TASK,
  ADD_TASK_DIALOG_CLOSE,
  ADD_TASK_DIALOG_OPEN,
  ADD_TASK_SUCCESS,
  AddTask,
  AddTaskDialogClose,
  AddTaskDialogOpen,
  AddTaskSuccess,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DeleteTask,
  DeleteTaskSuccess,
  LOAD_TASK,
  LOAD_TASK_SUCCESS,
  LOAD_TASKS,
  LOAD_TASKS_SUCCESS,
  LoadTask,
  LoadTasks,
  LoadTasksSuccess,
  LoadTaskSuccess,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UpdateTask,
  UpdateTaskSuccess
} from "../actions/tasks";
import { Task } from "../../../core/models/task.model";

type showSpinnerTypes =
  | AddTask
  | DeleteTask
  | LoadTask
  | LoadTasks
  | UpdateTask;

const showSpinnerActions = [
  ADD_TASK,
  DELETE_TASK,
  LOAD_TASK,
  LOAD_TASKS,
  UPDATE_TASK
];

type hideSpinnerTypes =
  | AddTaskSuccess
  | DeleteTaskSuccess
  | LoadTaskSuccess
  | LoadTasksSuccess
  | UpdateTaskSuccess;

const hideSpinnerActions = [
  ADD_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  LOAD_TASK_SUCCESS,
  LOAD_TASKS_SUCCESS,
  UPDATE_TASK_SUCCESS
];

@Injectable()
export class TasksEffects {
  @Effect()
  showSpinner: Observable<Action> = this.actions
    .ofType<showSpinnerTypes>(...showSpinnerActions)
    .pipe(map(() => new ShowSpinner()));

  @Effect()
  hideSpinner: Observable<Action> = this.actions
    .ofType<hideSpinnerTypes>(...hideSpinnerActions)
    .pipe(map(() => new HideSpinner()));

  @Effect()
  addTask: Observable<Action> = this.actions
    .pipe(
      ofType<AddTask>(ADD_TASK),
      map(action => action.payload),
      switchMap(task => this.tasksService.createTask(task).pipe(retry(3))),
      map(task => new AddTaskSuccess(task)),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  addTaskSuccess: Observable<Action> = this.actions
    .ofType<AddTaskSuccess>(ADD_TASK_SUCCESS)
    .pipe(
      mergeMap(() => [
        new SnackbarOpen({
          message: "Task Created",
          action: "Success"
        }),
        new AddTaskDialogClose()
      ])
    );

  @Effect({
    dispatch: false
  })
  addTaskDialogClose: Observable<any> = this.actions
    .ofType<AddTaskDialogClose>(ADD_TASK_DIALOG_CLOSE)
    .pipe(tap(() => this.matDialog.closeAll()));

  @Effect({
    dispatch: false
  })
  addTaskDialogOpen: Observable<any> = this.actions
    .ofType<AddTaskDialogOpen>(ADD_TASK_DIALOG_OPEN)
    .pipe(tap(() => this.matDialog.open(AddTaskDialogComponent)));

  @Effect()
  deleteTask: Observable<Action> = this.actions
    .ofType<DeleteTask>(DELETE_TASK)
    .pipe(
      map(action => action.payload),
      switchMap(task => this.tasksService.deleteTask(task).pipe(retry(3))),
      map(task => new DeleteTaskSuccess(task)),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  loadTasks: Observable<Action> = this.actions
    .pipe(
      ofType<LoadTasks>(LOAD_TASKS),
      switchMap(() =>
        this.tasksService.getTasks().pipe(retry(3),
          map((tasks: Task[]) => new LoadTasksSuccess(tasks)),
          catchError((e: HttpErrorResponse) => of(new HttpError(e)))
        )
      )
    );

  @Effect()
  loadTask: Observable<Action> = this.actions
    .ofType<LoadTask>(LOAD_TASK)
    .pipe(
      map(action => action.payload),
      switchMap(payload =>
        this.tasksService.getTask(payload._id).pipe(retry(3))
      ),
      map(task => new LoadTaskSuccess(task)),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  updateTask: Observable<Action> = this.actions
    .ofType<UpdateTask>(UPDATE_TASK)
    .pipe(
      map(action => action.payload),
      switchMap(task => this.tasksService.updateTask(task).pipe(retry(3))),
      map(task => new UpdateTaskSuccess(task)),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  updateTaskSuccess: Observable<Action> = this.actions
    .ofType<UpdateTaskSuccess>(UPDATE_TASK_SUCCESS)
    .pipe(
      map(
        () =>
          new SnackbarOpen({
            message: "Task Updated",
            action: "Success"
          })
      )
    );

  constructor(
    private actions: Actions,
    private matDialog: MatDialog,
    private tasksService: TaskService
  ) { }
}

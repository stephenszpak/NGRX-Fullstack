import { Action } from "@ngrx/store";
import { Task } from "../../../core/models/task.model";
import { createActionType } from "../../shared/utils";


export const ADD_TASK = createActionType('ADD_TASK');
export const ADD_TASK_SUCCESS = createActionType('ADD_TASK_SUCCESS');
export const ADD_TASK_DIALOG_CLOSE = createActionType('ADD_TASK_DIALOG_CLOSE');
export const ADD_TASK_DIALOG_OPEN = createActionType('ADD_TASK_DIALOG_OPEN');
export const DELETE_TASK = createActionType('DELETE_TASK');
export const DELETE_TASK_SUCCESS = createActionType('DELETE_TASK_SUCCESS');
export const LOAD_TASKS = createActionType('LOAD_TASKS');
export const LOAD_TASKS_SUCCESS = createActionType('LOAD_TASKS_SUCCESS');
export const LOAD_TASK = createActionType('LOAD_TASK');
export const LOAD_TASK_SUCCESS = createActionType('LOAD_TASK_SUCCESS')
export const SELECT_TASK = createActionType('SELECT_TASK');
export const UPDATE_TASK = createActionType('UPDATE_TASK');
export const UPDATE_TASK_SUCCESS = createActionType('UPDATE_TASK_SUCCESS');

export enum TaskActionTypes {
  ADD_TASK = '[Task] Add Task'
};

export class AddTask implements Action {
  readonly type = ADD_TASK;

  constructor(public payload: Task) {
  }
}

export class AddTaskSuccess implements Action {
  readonly type = ADD_TASK_SUCCESS;

  constructor(public payload: Task) {
  }
}

export class AddTaskDialogClose implements Action {
  readonly type = ADD_TASK_DIALOG_CLOSE;
}

export class AddTaskDialogOpen implements Action {
  readonly type = ADD_TASK_DIALOG_OPEN;
}

export class DeleteTask implements Action {
  readonly type = DELETE_TASK;

  constructor(public payload: Task) {
  }
}

export class DeleteTaskSuccess implements Action {
  readonly type = DELETE_TASK_SUCCESS;

  constructor(public payload: Task) {
  }
}

export class LoadTasks implements Action {
  readonly type = LOAD_TASKS;
}

export class LoadTasksSuccess implements Action {
  readonly type = LOAD_TASKS_SUCCESS;

  constructor(public payload: Task[]) { }
}

export class LoadTask implements Action {
  readonly type = LOAD_TASK;

  constructor(public payload: { _id: string }) {
  }
}

export class LoadTaskSuccess implements Action {
  readonly type = LOAD_TASK_SUCCESS;

  constructor(public payload: Task) {
  }
}

export class SelectTask implements Action {
  readonly type = SELECT_TASK;

  constructor(public payload: { _id: string }) {
  }
}

export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;

  constructor(public payload: Task) {
  }
}

export class UpdateTaskSuccess implements Action {
  readonly type = UPDATE_TASK_SUCCESS;

  constructor(public payload: Task) {
  }
}

export type TasksAction =
  | AddTask
  | AddTaskSuccess
  | AddTaskDialogClose
  | AddTaskDialogOpen
  | DeleteTask
  | DeleteTaskSuccess
  | LoadTasks
  | LoadTasksSuccess
  | LoadTask
  | LoadTaskSuccess
  | SelectTask
  | UpdateTask
  | UpdateTaskSuccess;

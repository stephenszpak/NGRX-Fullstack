import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";
import { first, map, switchMap, tap } from "rxjs/operators";

import { Task } from "../../../core/models/task.model";
import {
  LoadTask,
  SelectTask,
  UpdateTask
} from "../../../state/tasks/actions/tasks";
import {
  getTasksTotal,
  getSelectedTask,
  TasksState,
  getTaskEntities
} from "../../../state/tasks/reducers";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {
  task: Observable<Task>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store: Store<TasksState>
  ) {}

  ngOnInit() {
    this.task = this.activatedRoute.paramMap.pipe(
      tap(paramMap => {
        console.log('parma',paramMap)
        const id = paramMap.get("id");
        this.store.dispatch(new SelectTask({ _id: id }));
        this.hasTaskInStore(id).subscribe(exists => {
          if (!exists) {
            this.store.dispatch(new LoadTask({ _id: id }));
          }
        });
      }),
      switchMap(() => this.store.pipe(select(getSelectedTask)))
    );
  }

  hasTaskInStore(id: string): Observable<any> {
    return this.store
      .select(getTaskEntities)
      .pipe(
        first(tasks => tasks != null, tasks => tasks[id] != undefined)
      );
  }

  taskChange(task: Task) {
    this.store.dispatch(new UpdateTask(task));
  }
}

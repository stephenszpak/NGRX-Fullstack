import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";
import { Task } from "../../../core/models/task.model";
import { TaskService } from "../../../core/services/task.service";
import {
  AddTaskDialogOpen,
  DeleteTask,
  LoadTasks
} from "../../../state/tasks/actions/tasks";
import { getAllTasks, TasksState } from "../../../state/tasks/reducers";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"]
})
export class IndexComponent implements OnInit {
  tasks: Observable<Task[]>;

  constructor(
    private store: Store<TasksState>,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    // this.tasks = this.store.pipe(select(getAllTasks));
    // this.store.dispatch(new LoadTasks());
  }

  getTasks(){
    this.taskService.getTasks();
  }

  add() {
    this.store.dispatch(new AddTaskDialogOpen());
  }

  delete(task: Task) {
    this.store.dispatch(new DeleteTask(task));
  }
}

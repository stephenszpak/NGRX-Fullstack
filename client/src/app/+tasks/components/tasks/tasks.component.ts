import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Task } from "../../../core/models/task.model";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"]
})
export class TasksComponent {
  @Output() delete = new EventEmitter<Task>();

  @Input() tasks: Task[];

  constructor() {}

}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import {
  LoadTask,
  SelectTask,
  UpdateTask
} from "../../../state/tasks/actions/tasks";
import { Store, select } from "@ngrx/store";
import {
  getTasksTotal,
  getSelectedTask,
  TasksState,
  getTaskEntities
} from "../../../state/tasks/reducers";
import { Task } from "../../../core/models/task.model";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnChanges, OnInit {

  form: FormGroup;

  @Input() task: Task;

  @Output() taskChange = new EventEmitter<Task>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<TasksState>
  ) {
    this.createForm();
  }

  ngOnChanges() {
    if (this.task) {
      this.form.patchValue(this.task, {
        emitEvent: false
      });
    }
  }

  ngOnInit() {


  }

  save() {
    const task = <Task>this.form.value;
    this.store.dispatch(new UpdateTask(task));
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

}

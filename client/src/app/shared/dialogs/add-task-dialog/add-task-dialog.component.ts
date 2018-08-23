import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
import { Task } from "../../../core/models/task.model";
import { AddTask, AddTaskDialogClose } from "../../../state/tasks/actions/tasks";
import { TasksState } from "../../../state/tasks/reducers/index";

@Component({
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AddTaskDialogComponent>,
    private store: Store<TasksState>) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  close() {
    this.store.dispatch(new AddTaskDialogClose());
  }

  @HostListener('keydown.esc')
  onEsc() {
    this.close();
  }

  save() {
    const task = <Task>this.form.value;
    this.store.dispatch(new AddTask(task));
  }

}

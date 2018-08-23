import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module'
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule
} from '@angular/material';

import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TaskComponent } from './containers/task/task.component';
import { IndexComponent } from './containers/index/index.component';
import { EditComponent } from './containers/edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [TasksComponent, TaskDetailComponent, EditTaskComponent, TaskComponent, IndexComponent, EditComponent]
})
export class TasksModule { }

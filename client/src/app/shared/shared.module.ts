import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from "@angular/material";

import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { AddTaskDialogComponent } from './dialogs/add-task-dialog/add-task-dialog.component';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';

const components = [
  LayoutComponent,
  NotFoundComponent,
  AddTaskDialogComponent,
  DialogHeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  entryComponents: [AddTaskDialogComponent],
  declarations: [...components],
  exports: [...components]
})
export class SharedModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { StateModule } from './state/state.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent, canActivate:[AuthGuard] },
  { path: "tasks", loadChildren: "./+tasks/tasks.module#TasksModule", canActivate:[AuthGuard] },
  { path: 'auth', loadChildren: './+auth/auth.module#AuthModule' },
  { path: '**', component: NotFoundComponent },
];

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './shared/containers/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    StateModule.forRoot(),
    CoreModule.forRoot(),
    SharedModule,
    MaterialModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

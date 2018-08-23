import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { environment } from '../../environments/environment';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';

import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';

export function tokenGetter() {
  return localStorage.getItem('currentUser');
}

export const components = [LoginComponent, LoginPageComponent, RegisterComponent, RegisterPageComponent]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/api/users/authenticate'],
        throwNoTokenError: true
      }
    })
  ],
  declarations: components
})
export class AuthModule { }

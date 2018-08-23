import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { AuthService } from '../../../core/services/auth.service';
import { first } from 'rxjs/operators';
import { User } from '../../../core/models/user.model';

export interface UserInfo {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: UserInfo;
  registerForm: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.user = this.prepareForm();
    this.authService.register(this.user)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['auth/login']),
        err => this.error = 'Could not Register'
      );
  }

  prepareForm(): UserInfo {
    const formValues = this.registerForm.value;
    const saveForm: any = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      username: formValues.username,
      password: formValues.password
    }
    return saveForm;
  }

}

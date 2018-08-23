import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, Authenticate } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  error: string;
  public loading: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { this.createForm() }

  createForm() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  zub($event: Authenticate) {
  }

  onSubmit() {
    const formValues = this.loginForm.value;
    this.user = this.prepareForm();
    this.authService.login(this.user)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['index']),
        err => this.error = 'Could not Authenticate'
      );
  }
  prepareForm(): User {
    const formValues = this.loginForm.value;
    const saveForm: any = {
      username: formValues.username,
      password: formValues.password
    }
    return saveForm;
  }
}

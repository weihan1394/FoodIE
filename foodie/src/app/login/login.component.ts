import { AlertService } from './../_services/alert.service';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Invalid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' }
    ],
  }

  loginForm: FormGroup;

  constructor(private authenticationService: AuthenticationService, private router: Router,
    private alertService: AlertService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  success(message: string) {
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

  getEmailErrorMessage() {
    return this.loginForm.get('email').hasError('required') ? 'Email is required' :
        this.loginForm.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let formValues = this.loginForm.value;
    } else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  switchPage(page){

  }

}
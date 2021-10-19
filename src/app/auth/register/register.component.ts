import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterPayload } from '../register-payload';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { emitWarning } from 'process';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterPayload;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.registerPayload = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.registerPayload.userName = this.registerForm.get('userName').value;
      this.registerPayload.email = this.registerForm.get('email').value;
      this.registerPayload.password = this.registerForm.get('password').value;
      this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword').value;

      this.authService.register(this.registerPayload).subscribe(data => {
        console.log('Registered successfully!');
        this.router.navigateByUrl('/auth/register-success');
      }, error => {
        console.log('Registration failure!');
      });
    } else {
      alert('invalid data!')
    }
  }
}

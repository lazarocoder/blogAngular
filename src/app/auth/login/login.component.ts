import { browser } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginPayload } from '../login-payload';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginPayload = {
      userName: '',
      password: ''
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginPayload.userName = this.loginForm.get('userName').value;
      this.loginPayload.password = this.loginForm.get('password').value;

      this.authService.login(this.loginPayload).subscribe(data => {
        if (data) {
          console.log('Login successfully!');
          this.router.navigateByUrl('/home');
        } else {
          console.log('Login failed!');
        }
      });
    } else {
      alert('invalid data!')
    }
  }
}

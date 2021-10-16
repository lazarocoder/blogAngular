import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {LoginPayload} from '../login-payload';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';

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
      userName: '',
      password: ''
    });
    this.loginPayload = {
      userName: '',
      password: ''
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loginPayload.userName = this.loginForm.get('userName').value;
    this.loginPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginPayload).subscribe(data => {
      if (data) {
        console.log('Logado com sucesso!');
        this.router.navigateByUrl('/home');
      } else {
        console.log('Falha no login!');
      }
    });
  }
}

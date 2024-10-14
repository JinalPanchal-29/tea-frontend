import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent {
  router = inject(Router)
  fb = inject(FormBuilder)
  http = inject(HttpClient)
  authService= inject(AuthService)

  registerForm: FormGroup;
  loginForm: FormGroup;


  viewMode:string = 'register'
  

  constructor() {
    // Form configuration

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(){
    this.loginForm.get('email').setValue("jinal@gmail.com")
    this.loginForm.get('password').setValue("jinal")
  }

  goHome(){
    this.router.navigate(['home/timeline'])
  }

  onRegister(){
    let url = "http://localhost:3000/user/createUser"
    this.http.post(url, this.registerForm.getRawValue()).subscribe((res)=>{
    })
    this.router.navigate(['home/timeline'])
  }

  onLogin(){
    let url = "http://localhost:3000/user/login"
    this.http.post(url, this.loginForm.getRawValue()).subscribe((res)=>{
      localStorage.setItem('token', res['accessToken'])
      this.authService.setCurrentUser(res['userDetails'])
      this.router.navigate(['home/timeline'])
    })
    
  }
}

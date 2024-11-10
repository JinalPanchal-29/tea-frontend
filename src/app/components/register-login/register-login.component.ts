import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { API_ENDPOINTS } from 'src/app/constants/api-constant';

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
  confirmPass;
  validPassword: boolean = false;
  viewMode:string = 'register'
  

  constructor() {
    // Form configuration

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    })
  }

  ngOnInit(){
    this.loginForm.get('email').setValue("akhileshpillai1@gmail.com")
    this.loginForm.get('pass').setValue("Ace2314@@")
  }

  goHome(){
    this.router.navigate(['home/timeline'])
  }

  onRegister(){
    let url = API_ENDPOINTS.authentication.register;
    this.http.post(url, this.registerForm.getRawValue()).subscribe((res)=>{
    })
    this.router.navigate(['home/timeline'])
  }

  onLogin(){
    let url;
    let userEmail = this.loginForm.get('email').value
    let password = this.loginForm.get('pass').value

    console.log(API_ENDPOINTS.authentication.login)

    url = API_ENDPOINTS.authentication.login + "email=" + userEmail +"&password="+ password
    this.http.get(url).subscribe((res)=>{
      console.log(res['data'].token)
      localStorage.setItem('token', res['data'].token)
      this.authService.setCurrentUser(res['data'].user)
      this.router.navigate(['home/timeline'])
    })
    
  }

  comparePass(event) {
    this.confirmPass = event.target.value;
    if(this.confirmPass == this.registerForm.get('pass').value){
      this.validPassword = true;
    }
    console.log(event.target.value)
  }
}

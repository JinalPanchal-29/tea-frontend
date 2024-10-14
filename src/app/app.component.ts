import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tea-frontend';
  authService = inject(AuthService)
  http = inject(HttpClient)

  ngOnInit(){
    this.getUserDetails()
  }

  getUserDetails(){
    let url = "http://localhost:3000/user/getUserDetails"
    this.http.get(url).subscribe((res)=>{
      console.log("res",res)
      this.authService.setCurrentUser(res['userDetails'])
      console.log(this.authService.currentUserSignal())
    })
  }
}

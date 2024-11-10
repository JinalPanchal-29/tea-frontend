import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from './services/theme.service';
import { API_ENDPOINTS } from './constants/api-constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tea-frontend';
  authService = inject(AuthService)
  http = inject(HttpClient)
  constructor(private themeService: ThemeService){}

  ngOnInit(){
    this.getUserDetails()
    this.themeService.theme.subscribe((theme) => {
      document.body.classList.remove('light-theme', 'dark-theme')
      document.body.classList.add(`${theme}-theme`)
    })
  }

  getUserDetails(){
    let url = API_ENDPOINTS.user.getUserDetails;
    this.http.get(url).subscribe((res)=>{
      console.log("res",res)
      this.authService.setCurrentUser(res['data'])
      console.log(this.authService.currentUserSignal())
    })
  }
}

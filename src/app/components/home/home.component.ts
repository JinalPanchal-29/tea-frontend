import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  theme;
  constructor(private themeService: ThemeService){}

  ngOnInit(){
    this.theme = localStorage.getItem('theme');
  }
  toggleTheme(){
    this.themeService.toggleTheme();
    this.theme = localStorage.getItem('theme');
  }
}

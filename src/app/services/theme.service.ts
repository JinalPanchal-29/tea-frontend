import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject('dark');
  theme = this.themeSubject.asObservable()

  constructor() {
    const storedTheme = localStorage.getItem('theme');
    if(storedTheme){
      this.themeSubject.next(storedTheme);
    }else{
      localStorage.setItem('theme', 'dark')
    }
  }

  toggleTheme(){
    const currentTheme = this.themeSubject.getValue()
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.themeSubject.next(newTheme)
    localStorage.setItem('theme', newTheme)
  }
}

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSignal = signal<Object | undefined | null>(undefined)
  constructor() { }

  setCurrentUser(user: any): void {
    this.currentUserSignal.set(user);
  }
}

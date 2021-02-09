import { Injectable } from "@angular/core";
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
    this.navigateTo('/training');
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
    this.navigateTo('/training');
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.navigateTo('/login');
  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }

  private navigateTo(route: string) {
    this.router.navigate([
      route
    ])
  }
}

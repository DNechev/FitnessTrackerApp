import { Injectable } from "@angular/core";
import { AuthData } from './auth-data.model';
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from "../training/training.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router, private auth: AngularFireAuth, private trainingsService: TrainingService) {}

  registerUser(authData: AuthData) {
    console.log(authData.email);
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      this.authChange.next(true);
      this.navigateTo('/training');
    })
    .catch(err => console.log(err));
  }

  login(authData: AuthData) {
    this.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      this.isAuthenticated = true;
      this.authChange.next(true);
      this.navigateTo('/training');
    });
    this.authChange.next(true);
    this.navigateTo('/training');
  }

  logout() {
    this.auth.signOut();
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.trainingsService.cancelSubs();
    this.navigateTo('/login');
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private navigateTo(route: string) {
    this.router.navigate([
      route
    ])
  }
}

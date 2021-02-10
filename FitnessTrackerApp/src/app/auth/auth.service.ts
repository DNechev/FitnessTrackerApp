import { Injectable } from "@angular/core";
import { AuthData } from './auth-data.model';
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from "../training/training.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UiService } from "../shared/ui.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router, private auth: AngularFireAuth, private uiService: UiService,
              private trainingsService: TrainingService, private snackbar: MatSnackBar) {}

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      if(user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.navigateTo('/training');
      } else {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.trainingsService.cancelSubs();
        this.navigateTo('/login');
      }
    })
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(() => {
      this.uiService.loadingStateChanged.next(false);
    })
    .catch(err => {
      this.uiService.loadingStateChanged.next(false);
      this.snackbar.open(err.message, null, {
        duration: 3000
      });
    });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(() => {
      this.uiService.loadingStateChanged.next(false);
    })
    .catch(err => {
      this.uiService.loadingStateChanged.next(false);
      this.snackbar.open(err.message, null, {
        duration: 3000
      });
    });
  }

  logout() {
    this.auth.signOut();
    this.initAuthListener();
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

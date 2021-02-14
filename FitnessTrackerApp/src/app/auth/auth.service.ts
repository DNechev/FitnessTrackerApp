import { Injectable } from "@angular/core";
import { AuthData } from './auth-data.model';
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from "../training/training.service";
import { UiService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../app.reducer"
import * as uiActions from '../shared/ui.actions'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router,
              private auth: AngularFireAuth,
              private uiService: UiService,
              private trainingsService: TrainingService,
              private store: Store<fromApp.State>) {}

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
    this.store.dispatch(new uiActions.StartLoading());
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(() => {
      this.store.dispatch(new uiActions.StopLoading());
    })
    .catch(err => {
      this.store.dispatch(new uiActions.StopLoading());
      this.uiService.showSnackbar(err.message, null, 3000);
    });
  }

  login(authData: AuthData) {
    this.store.dispatch(new uiActions.StartLoading());
    this.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(() => {
      this.store.dispatch(new uiActions.StopLoading());
    })
    .catch(err => {
      this.store.dispatch(new uiActions.StopLoading());
      this.uiService.showSnackbar(err.message, null, 3000);
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
    ]);
  }
}

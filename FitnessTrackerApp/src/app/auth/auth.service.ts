import { Injectable } from "@angular/core";
import { AuthData } from './auth-data.model';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { UiService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../app.reducer"
import * as uiActions from '../shared/ui.actions'
import * as authActions from '../auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,
    private auth: AngularFireAuth,
    private uiService: UiService,
    private store: Store<fromApp.State>) { }

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new authActions.SetAuth());
        this.navigateTo('/training');
      } else {
        this.navigateTo('/login');
        this.store.dispatch(new authActions.SetUnauth());
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
    this.initAuthListener();
    this.auth.signOut();
  }

  private navigateTo(route: string) {
    this.router.navigate([
      route
    ]);
  }
}

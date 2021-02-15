import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import * as fromApp from '../app.reducer';
import { take, tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.State>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.store.select(fromApp.getIsAuth).pipe(take(1));
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.store.select(fromApp.getIsAuth).pipe(take(1));
  }
}

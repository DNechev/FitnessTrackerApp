import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromApp.State>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromApp.getIsAuth);
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  onClose() {
    this.closeSideNav.emit();
  }
}

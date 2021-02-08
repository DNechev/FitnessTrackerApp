import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output()closeSideNav = new EventEmitter();
  isAuth: boolean = false;
  private sub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.authService.authChange.subscribe((authStat) => {
      this.isAuth = authStat;
    })
  }

  onClose() {
    this.closeSideNav.emit();
  }
}

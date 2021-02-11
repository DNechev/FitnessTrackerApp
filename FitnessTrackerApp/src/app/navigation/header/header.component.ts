import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()sideNavToggle = new EventEmitter();
  isAuth: boolean = false;
  private sub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.sub = this.authService.authChange.subscribe((authStat) => {
      this.isAuth = authStat;
    })
  }

  onToggle() {
    this.sideNavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date;
  isLoading: boolean = false;
  private sub: Subscription;

  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.sub = this.uiService.loadingStateChanged.subscribe(loading => {
      this.isLoading = loading;
    });
  }

  onSubmit(form: NgForm){
    this.authService.registerUser({
      email: form.value.mail,
      password: form.value.pass
    });
  }
}

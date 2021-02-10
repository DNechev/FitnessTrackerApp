import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiService{
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  showSnackbar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration
    })
  }
}

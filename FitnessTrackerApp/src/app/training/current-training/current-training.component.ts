import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainning } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  timer: number;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if(this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000)
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainning, {
      data: {
        progress: this.progress
      }
    })
    .afterClosed()
    .subscribe(result => {
      if(!result) {
        this.timer = setInterval(() => {
          this.progress = this.progress + 5;
          if(this.progress >= 100) {
            clearInterval(this.timer);
          }
        }, 1000)
      } else {

      }
    });
  }
}

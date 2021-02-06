import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainning } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output()exitTraining = new EventEmitter();
  progress: number = 0;
  timer: number;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
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
        this.startOrResumeTimer();
      } else {
        this.exitTraining.emit();
      }
    });
  }


  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if(this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000)
  }
}

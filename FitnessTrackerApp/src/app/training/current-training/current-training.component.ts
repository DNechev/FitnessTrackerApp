import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TrainingService } from '../training.service';
import { StopTrainningComponent } from './stop-training.component';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  timer: number;

  constructor(private dialog: MatDialog, private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainningComponent, {
      data: {
        progress: this.progress
      }
    })
      .afterClosed()
      .subscribe(result => {
        if (!result) {
          this.startOrResumeTimer();
        } else {
          this.trainingService.cancelExercise(this.progress);
        }
      });
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe(ex => {

        const step: number = ex.duration / 100 * 1000;

        this.timer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step)
      });
  }
}

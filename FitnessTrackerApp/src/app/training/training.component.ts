import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining: boolean = false;
  private sub: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.sub = this.trainingService.exerciseChange.subscribe(exercise => {
      if(exercise) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    })
  }

}

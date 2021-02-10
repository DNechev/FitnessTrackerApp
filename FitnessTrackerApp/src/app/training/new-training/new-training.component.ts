import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from '../training.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  private sub: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.sub = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.trainingService.getExercises();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onStart(form: NgForm) {
    this.trainingService.startExercise(form.value.selected);
  }
}

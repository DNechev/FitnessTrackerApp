import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from '../training.model';
import { TrainingService } from '../training.service';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  private subs: Subscription[] = [];
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<fromApp.State>) { }

  ngOnInit(): void {
    this.subs.push(this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    }));

    this.isLoading$ = this.store.select(fromApp.getIsLoading);

    this.fetchExercises();
  }

  ngOnDestroy(): void {
    if(this.subs) {
      this.subs.forEach(sub => sub.unsubscribe());
    }
  }

  onStart(form: NgForm) {
    this.trainingService.startExercise(form.value.selected);
  }

  fetchExercises(){
    this.trainingService.getExercises();
  }
}

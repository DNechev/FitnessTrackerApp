import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exercise } from '../training.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);

    this.isLoading$ = this.store.select(fromApp.getIsLoading);

    this.fetchExercises();
  }

  onStart(form: NgForm) {
    this.trainingService.startExercise(form.value.selected);
  }

  fetchExercises() {
    this.trainingService.getExercises();
  }
}

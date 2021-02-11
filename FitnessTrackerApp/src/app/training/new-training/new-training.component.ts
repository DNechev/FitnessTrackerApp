import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { Exercise } from '../training.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  private subs: Subscription[] = [];
  isLoading: boolean = false;

  constructor(private trainingService: TrainingService, private uiService: UiService) { }

  ngOnInit(): void {
    this.subs.push(this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    }));

    this.subs.push(this.uiService.loadingStateChanged.subscribe(loading => {
      this.isLoading = loading;
    }));

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

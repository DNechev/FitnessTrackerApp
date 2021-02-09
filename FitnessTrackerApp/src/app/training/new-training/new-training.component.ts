import { Component, OnInit } from '@angular/core';
import { Exercise } from '../training.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[];

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exercises = this.trainingService.getExercises();
  }

  onStart(selectedId: any) {
    this.trainingService.startExercise(selectedId);
  }
}

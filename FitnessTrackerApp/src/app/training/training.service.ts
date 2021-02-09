import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Exercise } from "./training.model";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private runningExercise: Exercise;
  trainingStart = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  getExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    console.log('running exercise from service: ' + this.runningExercise.name)
    this.trainingStart.next({...this.runningExercise});
  }

  getRunningExercise(): Exercise {
    return {...this.runningExercise};
  }
}

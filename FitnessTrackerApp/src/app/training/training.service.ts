import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Exercise } from "./training.model";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private runningExercise: Exercise;
  exerciseChange = new Subject<Exercise>();
  private pastExercises: Exercise[] = [];

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
    this.exerciseChange.next({...this.runningExercise});
  }

  getRunningExercise(): Exercise {
    return {...this.runningExercise};
  }

  completeExercise() {
    this.pastExercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
    console.log(this.pastExercises);
  }

  cancelExercise(progress: number) {
    this.pastExercises.push({
      ...this.runningExercise,
      date: new Date(),
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
    console.log(this.pastExercises);
  }

  getPastExercises() {
    return this.pastExercises.slice();
  }
}

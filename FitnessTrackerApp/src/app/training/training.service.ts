import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { UiService } from "../shared/ui.service";
import { Exercise } from "./training.model";
import * as fromApp from '../app.reducer';
import * as uiActions from '../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private runningExercise: Exercise;
  exerciseChange = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  pastExercisesChanged = new Subject<Exercise[]>();
  private subs: Subscription[] = [];

 constructor(private db: AngularFirestore, private uiService: UiService, private store: Store<fromApp.State>) {}

  getExercises() {
    this.store.dispatch(new uiActions.StartLoading());
    this.subs.push(this.db.collection('availableExercises')
    .snapshotChanges()
    .pipe(
      map(docData => {
       return docData.map(doc => {
         return {
           id: doc.payload.doc.id,
           name: doc.payload.doc.data()['name'],
           duration: doc.payload.doc.data()['duration'],
           calories: doc.payload.doc.data()['calories']
         };
       })
      })
    )
    .subscribe((exercises: Exercise[]) => {
      this.availableExercises = exercises;
      this.exercisesChanged.next(...[this.availableExercises]);
      this.store.dispatch(new uiActions.StopLoading());
    }, error => {
      this.uiService.showSnackbar('Could not fetch exercises, please reload the page.', null, 3000);
      this.exercisesChanged.next(null);
      this.store.dispatch(new uiActions.StopLoading());
    })
    );
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChange.next({...this.runningExercise});
  }

  getRunningExercise(): Exercise {
    return {...this.runningExercise};
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  getPastExercises() {
    this.subs.push(this.db.collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises: Exercise[]) => {
      this.pastExercisesChanged.next(exercises);
    })
    );
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

  cancelSubs() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}

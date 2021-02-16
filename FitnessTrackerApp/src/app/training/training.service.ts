import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { UiService } from "../shared/ui.service";
import { Exercise } from "./training.model";
import * as fromTraining from '../training/training.reducer';
import * as uiActions from '../shared/ui.actions';
import * as trainingActions from '../training/training.actions';
import { take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private subs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService, private store: Store<fromTraining.State>) { }

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
        this.store.dispatch(new trainingActions.SetAvailableExercises(exercises))
        this.store.dispatch(new uiActions.StopLoading());
      }, error => {
        this.uiService.showSnackbar('Could not fetch exercises, please reload the page.', null, 3000);
        this.store.dispatch(new uiActions.StopLoading());
      })
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new trainingActions.StartExercise(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: 'completed'
        });
        this.store.dispatch(new trainingActions.StopExercise());
      })
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          duration: ex.duration * (progress / 100),
          calories: ex.calories * (progress / 100),
          state: 'cancelled'
        });
        this.store.dispatch(new trainingActions.StopExercise());
      })
  }

  getPastExercises() {
    this.subs.push(this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new trainingActions.SetPastExercises(exercises));
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

import { Action } from "@ngrx/store/src";
import { Exercise } from "./training.model";

export const SET_AVAILABLE_EXERCISES = '[Training] Set available exercises';
export const SET_PAST_EXERCISES = '[Training] Set past exercises';
export const START_EXERCISE = '[Training] Start exercise';
export const STOP_EXERCISE = '[Training] Stop exercise';

export class SetAvailableExercises implements Action {
  readonly type = SET_AVAILABLE_EXERCISES;

  constructor(public payload: Exercise[]) { }
}

export class SetPastExercises implements Action {
  readonly type = SET_PAST_EXERCISES;

  constructor(public payload: Exercise[]) { }
}

export class StartExercise implements Action {
  readonly type = START_EXERCISE;

  constructor(public payload: string) { }
}

export class StopExercise implements Action {
  readonly type = STOP_EXERCISE;
}

export type TrainingActions = SetAvailableExercises | SetPastExercises | StartExercise | StopExercise;


import { TrainingActions, SET_AVAILABLE_EXERCISES, SET_PAST_EXERCISES, START_EXERCISE, STOP_EXERCISE } from './training.actions';
import { Exercise } from './training.model';
import * as fromApp from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[];
  pastExercises: Exercise[];
  activeExercise: Exercise;
}

export interface State extends fromApp.State {
  training: TrainingState
}

const initialState: TrainingState = {
  availableExercises: [],
  pastExercises: [],
  activeExercise: null,
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_PAST_EXERCISES:
      return {
        ...state,
        pastExercises: action.payload
      };
    case START_EXERCISE:
      return {
        ...state,
        activeExercise: { ...state.availableExercises.find(ex => ex.id === action.payload) }
      };
    case STOP_EXERCISE:
      return {
        ...state,
        activeExercise: null
      };
    default:
      return {
        ...state
      }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState): Exercise[] => state.availableExercises);
export const getPastExercises = createSelector(getTrainingState, (state: TrainingState) => state.pastExercises);
export const getActiveExercise = createSelector(getTrainingState, (state: TrainingState) => state.activeExercise);
export const isTrainingActive = createSelector(getTrainingState, (state: TrainingState) => state.activeExercise != null);

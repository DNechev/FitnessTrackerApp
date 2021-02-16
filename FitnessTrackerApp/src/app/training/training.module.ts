import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { StopTrainningComponent } from "./current-training/stop-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingRouteModule } from "./training-routing.module";
import { TrainingComponent } from "./training.component";
import { trainingReducer } from './training.reducer';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainningComponent
  ],
  imports: [
    SharedModule,
    TrainingRouteModule,
    StoreModule.forFeature('training', trainingReducer)
  ]
})
export class TrainingModule { }

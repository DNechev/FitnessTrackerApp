import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { WellcomeComponent } from "./wellcome/wellcome.component";

const routes: Routes = [
  { path: '', component: WellcomeComponent },
  { path: 'training', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule), canLoad: [AuthGuard]}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class AppRoutingModule{}

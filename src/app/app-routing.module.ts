import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormControlsComponent } from './reactive-form-controls/reactive-form-controls.component';

const routes: Routes = [{
  path:'', pathMatch:'full',redirectTo:'reactiveForm'
},{
  path:'reactiveForm',component:ReactiveFormControlsComponent
},{
  path:'reactiveForm/:id',component:ReactiveFormControlsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './component/upload/upload.component';
import { ViewmodelComponent } from './component/viewmodel/viewmodel.component';

const routes: Routes = [
  {path: '', component: UploadComponent},
  {path: 'viewmodel', component: ViewmodelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

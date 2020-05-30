import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from '../guards/auth.guard';
import { FormGuard } from '../guards/form.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CreateComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    canDeactivate: [FormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoutingModule {}

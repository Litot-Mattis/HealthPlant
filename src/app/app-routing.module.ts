import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash/dash.component';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: 'dashboard', component: DashComponent },
                        { path: 'test', component: PolicyListComponent}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

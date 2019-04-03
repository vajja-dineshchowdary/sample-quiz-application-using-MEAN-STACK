import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';


const routes: Routes = [{
  path: '', redirectTo: '/login', pathMatch: 'full',
},
{
path: 'test', loadChildren: './question/question.module#QuestionModule',
canLoad: [AuthGuard]
},
{
path: 'result', loadChildren: './result/result.module#ResultModule',
canLoad: [AuthGuard]
},
{
  path: 'login', loadChildren: './start/start.module#StartModule'
},{
  path: '**', redirectTo: '/login', pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

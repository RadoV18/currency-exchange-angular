import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeFormComponent } from './components/exchange-form/exchange-form.component';
import { RequestHistoryComponent } from './components/request-history/request-history.component';
import { ErrorComponent } from "./components/error/error.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  { path: '', component: ExchangeFormComponent, data: {roles: ['USER']}, canActivate: [AuthGuard] },
  { path: 'exchanges', pathMatch: 'full', component: RequestHistoryComponent, data: {roles: ['ADMIN']}, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: ErrorComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

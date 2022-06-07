import { AdminGuard } from './../login/admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from '../login/auth.guard';
import { NotfoundComponent } from '../notfound/notfound.component';

const routes: Routes = [
  // { path: 'user', redirectTo: 'user/index', pathMatch: 'full'},
  { path: 'user/index', component: IndexComponent,canActivate:[AdminGuard] },
  { path: 'user/:userId/view', component: ViewComponent,canActivate:[AdminGuard] },
  { path: 'user/create', component: CreateComponent,canActivate:[AdminGuard] },
  { path: 'user/:userId/edit', component: EditComponent,canActivate:[AdminGuard] },
  {path:'**',component:NotfoundComponent,}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class userRoutingModule { }

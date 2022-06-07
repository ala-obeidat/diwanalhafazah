import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './login/auth.guard';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './user/edit/edit.component';

const routes: Routes = [
  {path:'',redirectTo:"home",pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  { path: 'user/:userId/edit', component: EditComponent,canActivate:[] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

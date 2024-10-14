import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { HomeComponent } from './components/home/home.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TimelineComponent } from './components/timeline/timeline.component';

const routes: Routes = [
  {path:'', component: RegisterLoginComponent},
  { path: 'home', component: HomeComponent, children: [
    { path: 'timeline', component: TimelineComponent },
    { path: 'bookmark', component: BookmarkComponent },
    { path: 'profile', component: ProfileComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../auth/auth.service';
import { AddPostComponent } from './../add-post/add-post.component';
import { PostComponent } from './../post/post.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children:[
      { path: 'post/:id', component: PostComponent },
      { path: 'add-post', component: AddPostComponent },
      { path: 'add-post', component: AddPostComponent }
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

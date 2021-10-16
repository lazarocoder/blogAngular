import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AuthService } from '../auth/auth.service';
import { HeaderModule } from '../header/header.module';
import { AddPostComponent } from './../add-post/add-post.component';
import { PostComponent } from './../post/post.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';




@NgModule({
  declarations: [
    HomeComponent,
    AddPostComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    HeaderModule
  ]
})
export class HomeModule { }


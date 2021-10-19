import { PostsComponent } from './../posts/posts.component';
import { CommentsComponent } from './../comments/comments.component';
import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AuthService } from '../auth/auth.service';
import { HeaderModule } from '../header/header.module';
import { AddPostComponent } from './../add-post/add-post.component';
import { PostComponent } from './../post/post.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DateFormatPipe } from './date-format.pipe';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    HomeComponent,
    AddPostComponent,
    PostComponent,
    DateFormatPipe,
    CommentsComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    HeaderModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class HomeModule { }


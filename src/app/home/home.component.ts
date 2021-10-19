import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AddPostService } from '../add-post.service';
import { Observable } from 'rxjs';
import { PostPayload } from '../add-post/post-payload';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Array<PostPayload>;

  constructor(private postService: AddPostService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getAllPosts();
    this.postService.observableAddPost.subscribe(res => {
      this.getAllPosts();
    });
  }

  isOwner(userName: string) {
    return this.authService.isOwner(userName);
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(res => {
      this.posts = res;
    });
  }

  atualizar(id: number) {
    this.router.navigate(['/home/add-post/' + id]);
  }

  visualizar(id: number) {
    this.router.navigate(['/home/post/' + id]);
  }

  excluir(id: number) {
    this.postService.deletePost(id).subscribe(res => {
      this.getAllPosts();
    });
  }

  formatDate(createdOn: number) {
    return moment(createdOn).format('DD/MM/YYYY');
  }

}

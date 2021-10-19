import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { PostPayload } from './../add-post/post-payload';
import { AddPostService } from './../add-post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: PostPayload[] = [];

  constructor(private postService: AddPostService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(res => {
      this.posts = res;
    });
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  visualizar(id: number) {
    this.router.navigate(['/post/' + id]);
  }

}

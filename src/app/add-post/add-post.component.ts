import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostPayload } from './post-payload';
import { AddPostService } from '../add-post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload = new PostPayload();
  title = new FormControl('');
  body = new FormControl('');
  idPost: number;

  constructor(private authService: AuthService, private addpostService: AddPostService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(res => {
      this.idPost = res["params"].id;
      if (this.idPost) {
        this.addpostService.getPost(this.idPost).subscribe(res => {
          this.postPayload = res;
          this.addPostForm.patchValue({
            title: res.title,
            body: res.content
          });
        });
      }
    });

  }

  addPost() {
    this.postPayload.content = this.addPostForm.get('body').value;
    this.postPayload.title = this.addPostForm.get('title').value;
    if (this.postPayload && this.postPayload.id) {
      this.addpostService.updatePost(this.postPayload).subscribe(data => {
        this.router.navigateByUrl('/');
        this.addpostService.atualizarPosts();
      }, error => {
        console.log('Response failure!');
      });
    } else {
      this.addpostService.addPost(this.postPayload).subscribe(data => {
        this.router.navigateByUrl('/');
        this.addpostService.atualizarPosts();
      }, error => {
        console.log('Response failure!');
      });
    }
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  isOwner() {
    return this.authService.isOwner(this.postPayload.userName);
  }

  isUpdate() {
    return this.postPayload && this.postPayload.id;
  }
}

import { AuthService } from './../auth/auth.service';
import { CommentService } from './comment.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddPostService } from './../add-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { PostPayload } from '../add-post/post-payload';
import { Comment } from './comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  idPost: number;

  @Input() post: PostPayload;
  comments: Comment[] = [];

  commentForm: FormGroup;

  comment: Comment = new Comment();

  constructor(private authService: AuthService, private commentService: CommentService, private addpostService: AddPostService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.commentForm = this.fb.group({
      content: [null]
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(res => {
      this.idPost = res["params"].id;
      if (this.idPost) {
        this.buscarCommentsPorPostId();
      }
    });
    this.commentService.observableComment.subscribe(res => {
      this.buscarCommentsPorPostId();
    });
  }

  buscarCommentsPorPostId() {
    this.addpostService.buscarPublicCommentsPorPostId(this.idPost).subscribe(res => {
      this.comments = res;
    });
  }

  onSubmit() {
    this.comment.postId = this.idPost;
    this.comment.content = this.commentForm.get('content').value;
    if (this.comment && this.comment.id) {
      this.commentService.atualizar(this.comment).subscribe(data => {

        this.commentService.atualizarComments();
        this.commentForm.patchValue({
          content: ''
        });
        this.comment = new Comment();
      }, error => {
        console.log('Response failure!');
      });
    } else {
      this.commentService.adicionar(this.comment).subscribe(data => {
        this.commentService.atualizarComments();
        this.commentForm.patchValue({
          content: ''
        });
        this.comment = new Comment();
      }, error => {
        console.log('Response failure!');
      });
    }
  }

  atualizar(id: number) {
    this.commentService.buscar(id).subscribe(res => {
      this.comment = res;
      this.commentForm.patchValue({
        content: res.content
      });
    });
  }

  excluir(id: number) {
    this.commentService.excluir(id).subscribe(res => {
      this.buscarCommentsPorPostId();
    });
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  isOwner() {
    return this.authService.isOwner(this.post.userName);
  }

  isUpdate() {
    return this.post && this.post.id;
  }

}

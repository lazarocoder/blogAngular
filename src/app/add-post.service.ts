import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostPayload } from './add-post/post-payload';
import { Observable, Subject } from 'rxjs';
import { Comment } from './comments/comment';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  private subjectAddPost = new Subject();
  observableAddPost = this.subjectAddPost.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  atualizarPosts() {
    this.subjectAddPost.next();
  }

  addPost(postPayload: PostPayload) {
    return this.httpClient.post('http://localhost:8080/api/posts/', postPayload);
  }

  updatePost(postPayload: PostPayload) {
    return this.httpClient.put(`http://localhost:8080/api/posts/${postPayload.id}`, postPayload);
  }

  deletePost(id: number) {
    return this.httpClient.delete(`http://localhost:8080/api/posts/${id}`);
  }

  getAllPosts(): Observable<Array<PostPayload>> {
    return this.httpClient.get<Array<PostPayload>>("http://localhost:8080/api/posts/public/all");
  }

  getPublicPost(permaLink: Number): Observable<PostPayload> {
    return this.httpClient.get<PostPayload>('http://localhost:8080/api/posts/public/get/' + permaLink);
  }

  getPost(permaLink: Number): Observable<PostPayload> {
    return this.httpClient.get<PostPayload>('http://localhost:8080/api/posts/get/' + permaLink);
  }

  buscarPublicCommentsPorPostId(id: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`http://localhost:8080/api/posts/${id}/public/comments`);
  }

  buscarCommentsPorPostId(id: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`http://localhost:8080/api/posts/${id}/comments`);
  }

}

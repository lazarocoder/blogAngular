import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Comment } from './comment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private subjectComment = new Subject();
  observableComment = this.subjectComment.asObservable();

  constructor(private http: HttpClient) { }

  atualizarComments() {
    this.subjectComment.next();
  }

  buscar(id: number): Observable<Comment> {
    return this.http.get<Comment>(`http://localhost:8080/api/comments/${id}`);
  }

  adicionar(comment: Comment) {
    return this.http.post(`http://localhost:8080/api/comments`, comment);
  }

  atualizar(comment: Comment) {
    return this.http.put(`http://localhost:8080/api/comments/${comment.id}`, comment);
  }

  excluir(id: number) {
    return this.http.delete(`http://localhost:8080/api/comments/${id}`);
  }

}

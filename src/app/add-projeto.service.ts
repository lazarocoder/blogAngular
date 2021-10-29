import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjetoPayload } from './add-projeto/projeto-payload';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AddProjetoService {

  private subjectAddProjeto = new Subject();
  observableAddProjeto = this.subjectAddProjeto.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  atualizarProjetos() {
    this.subjectAddProjeto.next();
  }

  addProjeto(projetoPayload: ProjetoPayload) {
    return this.httpClient.post('http://localhost:8080/api/projetos/', projetoPayload);
  }

  updateProjeto(projetoPayload: ProjetoPayload) {
    return this.httpClient.put(`http://localhost:8080/api/projetos/${projetoPayload.id}`, projetoPayload);
  }

  deleteProjeto(id: number) {
    return this.httpClient.delete(`http://localhost:8080/api/projetos/${id}`);
  }

  getAllProjetos(): Observable<Array<ProjetoPayload>> {
    return this.httpClient.get<Array<ProjetoPayload>>("http://localhost:8080/api/projetos/public/all");
  }

  getPublicProjeto(permaLink: Number): Observable<ProjetoPayload> {
    return this.httpClient.get<ProjetoPayload>('http://localhost:8080/api/projetos/public/get/' + permaLink);
  }

  getProjeto(permaLink: Number): Observable<ProjetoPayload> {
    return this.httpClient.get<ProjetoPayload>('http://localhost:8080/api/projeto/get/' + permaLink);
  }

}

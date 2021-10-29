import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AddProjetoService } from '../add-projeto.service';
import { Observable } from 'rxjs';
import { ProjetoPayload } from '../add-projeto/projeto-payload';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projetos: Array<ProjetoPayload>;

  constructor(private projetoService: AddProjetoService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getAllProjetos();
    this.projetoService.observableAddProjeto.subscribe(res => {
      this.getAllProjetos();
    });
  }

  isOwner(userName: string) {
    return this.authService.isOwner(userName);
  }

  getAllProjetos() {
    this.projetoService.getAllProjetos().subscribe(res => {
      this.projetos = res;
    });
  }

  atualizar(id: number) {
    this.router.navigate(['/home/add-projeto/' + id]);
  }

  visualizar(id: number) {
    this.router.navigate(['/home/projeto/' + id]);
  }

  excluir(id: number) {
    this.projetoService.deleteProjeto(id).subscribe(res => {
      this.getAllProjetos();
    });
  }

  formatDate(createdOn: number) {
    return moment(createdOn).format('DD/MM/YYYY');
  }

}

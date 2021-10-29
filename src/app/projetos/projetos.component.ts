import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProjetoPayload } from './../add-projeto/projeto-payload';
import { AddProjetoService } from '../add-projeto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {

  projetos: ProjetoPayload[] = [];

  constructor(private projetoService: AddProjetoService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getAllProjetos();
  }

  getAllProjetos() {
    this.projetoService.getAllProjetos().subscribe(res => {
      this.projetos = res;
    });
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  visualizar(id: number) {
    this.router.navigate(['/projeto/' + id]);
  }

}

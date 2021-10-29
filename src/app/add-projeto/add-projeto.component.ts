import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjetoPayload } from './projeto-payload';
import { AddProjetoService } from '../add-projeto.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-projeto',
  templateUrl: './add-projeto.component.html',
  styleUrls: ['./add-projeto.component.css']
})
export class AddProjetoComponent  implements OnInit {

  addProjetoForm: FormGroup;
  projetoPayload: ProjetoPayload = new ProjetoPayload();
  valor = new FormControl('');
  body = new FormControl('');

  constructor(private authService: AuthService, private addProjetoService: AddProjetoService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.addProjetoForm = new FormGroup({
      valor: this.valor,
      body: this.body
    });

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(res => {
      const idProjeto = res.get("id")?Number(res.get("id")):null;
      if (idProjeto) {
        this.addProjetoService.getProjeto(idProjeto).subscribe(projeto => {
          this.projetoPayload = projeto;
          this.addProjetoForm.patchValue({
            valor: projeto.valor,
            body: projeto.descricao
          });
        });
      }
    });

  }

  addProjeto() {
    this.projetoPayload.descricao = this.addProjetoForm.get('body').value;
    this.projetoPayload.valor = this.addProjetoForm.get('valor').value;
    if (this.projetoPayload && this.projetoPayload.id) {
      this.addProjetoService.updateProjeto(this.projetoPayload).subscribe(data => {
        this.router.navigateByUrl('/');
        this.addProjetoService.atualizarProjetos();
      }, error => {
      });
    } else {
      this.addProjetoService.addProjeto(this.projetoPayload).subscribe(data => {
        this.router.navigateByUrl('/');
        this.addProjetoService.atualizarProjetos();
      }, error => {
      });
    }
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  isOwner() {
    return this.authService.isOwner(this.projetoPayload.userName);
  }

  isUpdate() {
    return this.projetoPayload && this.projetoPayload.id;
  }
}

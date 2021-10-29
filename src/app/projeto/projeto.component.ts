import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProjetoService } from '../add-projeto.service';
import { ProjetoPayload } from '../add-projeto/projeto-payload';

// @ts-ignore
@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {

  projeto: ProjetoPayload = new ProjetoPayload();
  permaLink: Number;

  constructor(private activatedRoute: ActivatedRoute, private projetoService: AddProjetoService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(res => {
      this.permaLink = res["params"].id;
      if (this.permaLink) {
        this.projetoService.getPublicProjeto(this.permaLink).subscribe((data: ProjetoPayload) => {
          this.projeto = data;
        }, (err: any) => {
        });
      }
    });

  }

}


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../auth/auth.service';
import { AddProjetoComponent } from './../add-projeto/add-projeto.component';
import { ProjetoComponent } from './../projeto/projeto.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children:[
      { path: 'projeto/:id', component: ProjetoComponent },
      { path: 'add-projeto', component: AddProjetoComponent },
      { path: 'add-projeto/:id', component: AddProjetoComponent }

    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

import { ProjetosComponent } from '../projetos/projetos.component';

import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AuthService } from '../auth/auth.service';
import { HeaderModule } from '../header/header.module';
import { AddProjetoComponent } from './../add-projeto/add-projeto.component';
import { ProjetoComponent } from './../projeto/projeto.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DateFormatPipe } from './date-format.pipe';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    HomeComponent,
    AddProjetoComponent,
    ProjetoComponent,
    DateFormatPipe,
    ProjetosComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    HeaderModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class HomeModule { }


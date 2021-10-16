import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'  },
  //{ path: 'home', canActivate: [AuthGuard], loadChildren: './home/home.module#HomeModule'   },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

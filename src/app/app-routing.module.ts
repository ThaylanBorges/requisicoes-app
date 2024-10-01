import { NgModule } from '@angular/core';
import { authGuardGuard } from './guards/auth-guard.guard';
import { RouterModule, Routes } from '@angular/router';

// components
import { LoginComponent } from './components/public/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin/painel', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin/painel',
    loadChildren: () =>
      import('./components/admin/painel/painel.module').then(
        (m) => m.PainelModule
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'admin/departamento',
    loadChildren: () =>
      import('./components/admin/departamento/departamento.module').then(
        (m) => m.DepartamentoModule
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'admin/funcionario',
    loadChildren: () =>
      import('./components/admin/funcionario/funcionario.module').then(
        (m) => m.FuncionarioModule
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'admin/requisicao',
    loadChildren: () =>
      import('./components/admin/requisicao/requisicao.module').then(
        (m) => m.RequisicaoModule
      ),
    canActivate: [authGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
    data: { animation: 'Home' },
  },
  {
    path: 'sistema',
    loadChildren: () =>
      import('./modules/sistema/sistema.module').then((m) => m.SistemaModule),
    data: { animation: 'any' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

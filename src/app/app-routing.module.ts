import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoRestaurantesComponent } from './restaurantes/listado-restaurantes/listado-restaurantes.component';
import { ListadoOpinionesComponent } from './restaurantes/listado-opiniones/listado-opiniones.component';
import { RegistrarComponent } from './restaurantes/registrar/registrar.component';
import { AgregarOpinionComponent } from './restaurantes/agregar-opinion/agregar-opinion.component';

const routes: Routes = [
  { path: '', component: ListadoRestaurantesComponent },
  { path: 'restaurantes', component: ListadoRestaurantesComponent },
  { path: 'restaurantes/registrar', component: RegistrarComponent },
  { path: 'restaurantes/editar/:id', component: RegistrarComponent },
  { path: 'restaurantes/opiniones/:id', component: ListadoOpinionesComponent },
  { path: 'restaurantes/opiniones/:id/agregar', component: AgregarOpinionComponent },
  { path: 'restaurantes/opiniones/:id/editar/:idOpinion', component: AgregarOpinionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { ListadoRestaurantesComponent } from './listado-restaurantes/listado-restaurantes.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoOpinionesComponent } from './listado-opiniones/listado-opiniones.component';
import { AgregarOpinionComponent } from './agregar-opinion/agregar-opinion.component';



@NgModule({
  declarations: [
    ListadoRestaurantesComponent,
    RegistrarComponent,
    ListadoOpinionesComponent,
    AgregarOpinionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RestaurantesModule { }

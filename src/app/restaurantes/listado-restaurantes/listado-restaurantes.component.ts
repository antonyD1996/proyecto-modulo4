import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Restaurante } from './../../entidades/restaurante';
import { Router } from '@angular/router';
import { Categoria } from './../../entidades/categoria';
import { ToastService } from 'angular-toastify';


@Component({
  selector: 'app-listado-restaurantes',
  templateUrl: './listado-restaurantes.component.html',
  styleUrls: ['./listado-restaurantes.component.sass']
})
export class ListadoRestaurantesComponent implements OnInit {

  restaurantes: Restaurante[] = []
  urlBase: string = 'http://localhost:3000/restaurantes/'
  categorias: Categoria[] = [
    { id: 1, Nombre: 'Comida China', Fondo: 'assets/images/china.jpg' },
    { id: 2, Nombre: 'Comida Mexicana', Fondo: 'assets/images/mexicana.jpg' },
    { id: 3, Nombre: 'Comida Rapida', Fondo: 'assets/images/rapida.jpg' }]

  constructor(private http: HttpClient, private router: Router, private _toastService: ToastService) {
    http.get<Restaurante[]>(this.urlBase)
      .subscribe(res => {
        this.restaurantes = res.map(r => {
          r.Categoria = this.categorias.find(c => c.id == r.idCategoria)!
          return r
        })
      })

  }

  ngOnInit(): void {
  }

  eliminarRestaurante(id: string) {
    this.http.delete(this.urlBase + id)
      .subscribe(
        res => {
          this.restaurantes = this.restaurantes.filter(r => r._id !== id)
          this._toastService.error("Restaurante elimindo!")
        }
      )
  }

  editarRestaurante(id: string) {
    console.log(id)
    this.router.navigateByUrl('restaurantes/editar/' + id)
  }

  verOpiniones(id: string) {
    this.router.navigateByUrl('restaurantes/opiniones/' + id)
  }

  redirect() {
    this.router.navigateByUrl('restaurantes/registrar')
  }

}

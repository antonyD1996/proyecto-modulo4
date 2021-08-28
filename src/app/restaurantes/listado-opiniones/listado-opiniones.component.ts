import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/entidades/categoria';
import { Opinion } from 'src/app/entidades/opinion';
import { Resumen } from './../../entidades/resumen';
import { Restaurante } from './../../entidades/restaurante';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-listado-opiniones',
  templateUrl: './listado-opiniones.component.html',
  styleUrls: ['./listado-opiniones.component.sass']
})
export class ListadoOpinionesComponent implements OnInit {

  opiniones: Opinion[] = []
  urlBase: string = 'http://localhost:3000/opiniones/'
  id!: string;
  resumenRestaurante: Resumen = {} as Resumen;
  leyenda: string = 'Opiniones';
  categorias: Categoria[] = [
    { id: 1, Nombre: 'Comida China', Fondo: 'assets/images/china.jpg' },
    { id: 2, Nombre: 'Comida Mexicana', Fondo: 'assets/images/mexicana.jpg' },
    { id: 3, Nombre: 'Comida Rapida', Fondo: 'assets/images/rapida.jpg' }]

  constructor(private http: HttpClient, private activedRoute: ActivatedRoute, private router: Router, private _toastService: ToastService) {

  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(id => this.id = id['id'])
    if (this.id) {

      this.http.get<Resumen[]>(this.urlBase + "resumen/" + this.id).subscribe(res => {
        if (res.length < 1) {
          this.http.get<Restaurante>('http://localhost:3000/restaurantes/' + this.id).subscribe(r => {
            this.resumenRestaurante.Calificacion = 0;
            this.resumenRestaurante.Mayor = 0
            this.resumenRestaurante.Menor = 0
            this.resumenRestaurante._id = r
            this.resumenRestaurante._id.Categoria = this.categorias.find(c => c.id == r.idCategoria)!
          })
        } else {
          res.map(e => {
            e._id.Categoria = this.categorias.find(c => c.id == e._id.idCategoria)!
            e.Estrellas = [1]
            for (let i = 2; i < e.Calificacion + 1; i++) {
              e.Estrellas.push(i)
            }
            console.log(e)
          })
          this.resumenRestaurante = res[0]
        }

      })

    }

    this.http.get<Opinion[]>(this.urlBase + this.id).subscribe(res => {
      this.opiniones = res
      this.opiniones.map(op => {
        op.Estrellas = [1]
        for (let i = 2; i < op.Puntuacion + 1; i++) {
          op.Estrellas.push(i)
        }
      })

      if (this.opiniones.length < 1) this.leyenda = 'Todavia no hay opiniones!'
    })


  }

  redirect() {
    this.router.navigateByUrl('restaurantes/opiniones/' + this.id + '/agregar')
  }

  eliminarOpinion(id: string) {
    this.http.delete(this.urlBase + id)
      .subscribe(
        res => {
          this.opiniones = this.opiniones.filter(r => r._id !== id)
          this._toastService.error("Opinion Eliminada!")
        }
      )
  }

  editarOpinion(id: string) {
    console.log(id)
    this.router.navigateByUrl('restaurantes/opiniones/' + this.id + '/editar/' + id)
  }

}

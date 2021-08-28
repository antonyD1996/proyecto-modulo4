import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Categoria } from 'src/app/entidades/categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurante } from './../../entidades/restaurante';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.sass']
})
export class RegistrarComponent implements OnInit {

  restauranteForm!: FormGroup
  urlBase: string = 'http://localhost:3000/restaurantes/'
  accion: string = 'Registrar'
  idRestaurante!: string;
  restaurante: Restaurante = {} as Restaurante;
  categorias: Categoria[] = [
    { id: 1, Nombre: 'Comida China', Fondo: 'assets/images/china.jpg' },
    { id: 2, Nombre: 'Comida Mexicana', Fondo: 'assets/images/mexicana.jpg' },
    { id: 3, Nombre: 'Comida Rapida', Fondo: 'assets/images/rapida.jpg' }]

  constructor(private http: HttpClient, private activedRoute: ActivatedRoute, private router: Router, private _toastService: ToastService) {

  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(param => {
      this.idRestaurante = param['id']
    })

    this.restauranteForm = new FormGroup({
      'Nombre': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'Direccion': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'Telefono': new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      'idCategoria': new FormControl('1')
    })

    if (this.idRestaurante) {
      this.accion = "Editar"
      this.http.get<Restaurante>(this.urlBase + this.idRestaurante).subscribe(res => {
        this.restaurante = res
        this.restauranteForm = new FormGroup({
          'Nombre': new FormControl(this.restaurante.Nombre, [Validators.required, Validators.minLength(1)]),
          'Direccion': new FormControl(this.restaurante.Direccion, [Validators.required, Validators.minLength(1)]),
          'Telefono': new FormControl(this.restaurante.Telefono, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
          'idCategoria': new FormControl(this.restaurante.idCategoria)
        })
      })

    }

  }

  enviar(): void {

    console.log(this.restauranteForm.value);
    console.log(this.restauranteForm.valid);

    this.idRestaurante
      ?
      this.http.put(this.urlBase + this.idRestaurante, this.restauranteForm.value)
        .subscribe(res => {
          this._toastService.success("Registro Editado con exito!")
          this.router.navigate([''])
        })
      :
      this.http.post(this.urlBase, this.restauranteForm.value)
        .subscribe(res => {
          this._toastService.success("Registro Guardado con exito!")
          this.restauranteForm.reset()
          this.router.navigate([''])
        })
  }

}

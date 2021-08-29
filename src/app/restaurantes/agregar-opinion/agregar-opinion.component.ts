import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { Opinion } from './../../entidades/opinion';
import { ToastService } from 'angular-toastify';
import * as myGlobals from '../../globals'

@Component({
  selector: 'app-agregar-opinion',
  templateUrl: './agregar-opinion.component.html',
  styleUrls: ['./agregar-opinion.component.sass']
})
export class AgregarOpinionComponent implements OnInit {

  urlBase: string = myGlobals.URL_BASE + 'opiniones/'
  id!: string;
  opinionForm!: FormGroup
  opinion: Opinion = { Nombre: 'Carlos' } as Opinion;
  accion: string = 'Agregar'

  constructor(private http: HttpClient, private activedRoute: ActivatedRoute, private router: Router, private _toastService: ToastService, private location: Location) {

  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(id => {
      this.id = id['id']
      this.opinion._id = id['idOpinion']
    })
    this.opinionForm = new FormGroup({
      'Nombre': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'Comentario': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'Puntuacion': new FormControl('1', [Validators.required]),
      'Restaurante': new FormControl(this.id, [Validators.required, Validators.minLength(1)]),
    })

    if (this.opinion._id) {
      this.http.get<Opinion>(this.urlBase + 'getOne/' + this.opinion._id)
        .subscribe(res => {
          this.opinion = res
          this.opinionForm = new FormGroup({
            'Nombre': new FormControl(this.opinion.Nombre, [Validators.required, Validators.minLength(1)]),
            'Comentario': new FormControl(this.opinion.Comentario, [Validators.required, Validators.minLength(1)]),
            'Puntuacion': new FormControl(3, [Validators.required]),
            'Restaurante': new FormControl(this.id, [Validators.required, Validators.minLength(1)]),
          })
        })
      this.accion = 'Editar'
    }



  }

  enviar(): void {
    const value = { ...this.opinionForm.value, Puntuacion: +this.opinionForm.value.Puntuacion };

    console.log(value);
    console.log(this.opinionForm.valid);

    this.opinion._id ?
      this.http.put(this.urlBase + this.opinion._id, value)
        .subscribe(res => {
          this._toastService.success("Registro Editado con exito!")
          this.location.back()
        }) :
      this.http.post(this.urlBase, value)
        .subscribe(res => {
          this._toastService.success("Registro Guardado con exito!")
          this.opinionForm.reset()
          this.location.back()
        })
  }



}

import { Categoria } from './categoria';
export interface Restaurante {

    _id: string;
    Nombre: string;
    Direccion: string;
    Telefono: number;
    idCategoria: number;
    Categoria: Categoria;
}

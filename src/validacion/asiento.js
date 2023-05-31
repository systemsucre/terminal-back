import { check } from "express-validator"
import { validaciones } from "./headers.js"

// registrar vehiculo desde el usuario
export const insertar = [
    check('idasientoubi')
        .exists()
        .matches(/^\d{1,10}$/),
    check('idvehiculo')
        .exists()
        .matches(/^\d{1,10}$/),
    check('numero')
        .exists()
        .matches(/^[0-9]{1,20}$/),
    check('capacidad')
        .exists()
        .matches(/^[0-9]{1,20}$/),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const eliminar = [

    check('idvehiculo')
        .exists()
        .matches(/^\d{1,10}$/),
    check('numero')
        .exists()
        .matches(/^[0-9]{1,20}$/),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),


    (req, res, next) => {
        validaciones(req, res, next)
    }
]


export const id = [
    check('id')
        .exists()
        .matches(/^\d{1,10}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

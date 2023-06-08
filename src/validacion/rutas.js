import { check } from "express-validator"
import { validaciones } from "./headers.js"

// registrar vehiculo desde el usuario
export const insertar = [
    check('origen')
        .exists()
        .matches(/^\d{1,10}$/),
    check('destino')
        .exists()
        .matches(/^\d{1,10}$/),
    check('lugarorigen')
        .exists()
        .matches(/^[a-zA-ZÑñ /0-9-@+]{2,30}$/),
    check('lugardestino')
        .exists()
        .matches(/^[a-zA-ZÑñ /0-9-@+]{2,30}$/),
    check('duracion')
        .exists()
        .matches(/^[0-9]{1,20}$/),
    check('empresa')
        .exists()
        .matches(/^\d{1,10}$/),
    check('dia')
        .exists()
        .matches(/^[a-zA-ZÑñ ]{2,30}$/),
    check('hora')
        .exists()
        .matches(/\d{2}[:]\d{2}/),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const actualizar = [
    check('id')
        .exists()
        .matches(/^\d{1,10}$/),
    check('origen')
        .exists()
        .matches(/^\d{1,10}$/),
    check('destino')
        .exists()
        .matches(/^\d{1,10}$/),
    check('lugarorigen')
        .exists()
        .matches(/^[a-zA-ZÑñ /0-9-@+]{2,30}$/),
    check('lugardestino')
        .exists()
        .matches(/^[a-zA-ZÑñ /0-9-@+]{2,30}$/),
    check('duracion')
        .exists()
        .matches(/^[0-9]{1,20}$/),
    check('empresa')
        .exists()
        .matches(/^\d{1,10}$/),
    check('dia')
        .exists()
        .matches(/^[a-zA-ZÑñ ]{2,30}$/),
    check('hora')
        .exists()
        .matches(/\d{2}[:]\d{2}/),
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

export const buscar = [
    check('dato').exists().matches(/^[()/a-zA-Z Ññ0-9_-]{1,400}$/),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

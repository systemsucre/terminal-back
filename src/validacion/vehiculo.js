import { check } from "express-validator"
import { validaciones } from "./headers.js"

// registrar vehiculo desde el usuario
export const insertar = [
    check('idtipo')
        .exists()
        .matches(/^\d{1,10}$/),
    check('idusuario')
        .exists()
        .matches(/^\d{1,10}$/),
    check('capacidad')
        .exists()
        .matches(/^[0-9]{1,20}$/),
    check('placa')
        .exists()
        .matches(/^\d{3,5}[-][A-Z]{3}?$/),
    check('modelo')
        .exists()
        .matches(/^[0-9]{1,20}$/),
    check('fil')
        .exists()
        .matches(/^\d{1,10}$/),
    check('col')
        .exists()
        .matches(/^\d{1,10}$/),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]
// registrar vehiculo desde el administrador

// export const insertar_admin = [
//     check('idtipo')
//         .exists().matches(),
//     check('idusuario')
//         .exists().matches(),
//     check('capacidad')
//         .exists().matches(),
//     check('placa')
//         .exists().matches(),
//     check('modelo')
//         .exists().matches(),
//     check('creado')
//         .exists()
//         .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
//     check('usuario')
//         .exists().matches(),

//     (req, res, next) => {
//         validaciones(req, res, next)
//     }
// ]

export const actualizar = [
    check('id')
        .exists()
        .matches(/^\d{1,10}$/),
    check('idusuario')
        .exists()
        .matches(/^\d{1,10}$/),
    check('capacidad')
        .exists()
        .matches(/^[0-9]{1,20}$/),
    check('placa')
        .exists()
        .matches(/^\d{3,5}[-][A-Z]{3}?$/),
    check('modelo')
        .exists()
        .matches(/^[0-9]{1,20}$/),
    check('fil')
        .exists()
        .matches(/^\d{1,10}$/),
    check('col')
        .exists()
        .matches(/^\d{1,10}$/),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]
export const reConfigurar = [
    check('idvehiculo')
        .exists()
        .matches(/^\d{1,10}$/),
    check('idtipo')
        .exists()
        .matches(/^\d{1,10}$/),
    check('fil')
        .exists()
        .matches(/^\d{1,10}$/),
    check('col')
        .exists()
        .matches(/^\d{1,10}$/),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]




export const eliminar = [
    check('id')
        .exists()
        .matches(/^\d{1,10}$/),
    check('fecha')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),


    (req, res, next) => {
        validaciones(req, res, next)
    }
]


export const restaurar = [
    check('id')
        .exists()
        .matches(/^\d{1,10}$/),
    check('fecha')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),

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

export const id = [
    check('id')
        .exists()
        .matches(/^\d{1,10}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

// export const anterior = [
//     check('id').isLength({ min: 1 }).exists().isNumeric(),

//     (req, res, next) => {
//         validaciones(req, res, next)
//     }
// ]

// export const recet = [
//     check('id')
//         .isLength({ min: 1 })
//         .exists().isNumeric(),

//     check('fecha')
//         .exists()
//         .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
//     check('usuario')
//         .exists()
//         .isLength({ min: 1 }).isNumeric(),

//     (req, res, next) => {
//         validaciones(req, res, next)
//     }
// ]

// buscar
import { check } from "express-validator"
import { validaciones } from "./headers.js"

// registrar vehiculo desde el usuario
export const insertar = [
    check('idviaje')
        .exists()
        .matches(/^\d{1,10}$/),
    check('idasiento')
        .exists()
        .matches(/^\d{1,10}$/),
    check('idcliente')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/),
    check('fecha')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/),
    check('hora')
        .exists()
        .matches(/\d{2}[:]\d{2}/),
    check('comprador')
        .exists()
        .matches(/^\d{1,10}$/),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const actualizar = [
    check('id')
        .exists()
        .matches(/^\d{1,10}$/),
    check('idviaje')
        .exists()
        .matches(/^\d{1,10}$/),
    check('idasiento')
        .exists()
        .matches(/^\d{1,10}$/),
    check('idcliente')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/),
    check('fecha')
        .exists()
        .matches(/\d{4}[-]\d{2}[-]\d{2}/),
    check('hora')
        .exists()
        .matches(/\d{2}[:]\d{2}/),
    check('comprador')
        .exists()
        .matches(/^\d{1,10}$/),
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
export const listarViajeVehiculo = [
    check('idvehiculo')
        .exists()
        .matches(/^\d{1,10}$/),
    check('idviaje')
        .exists()
        .matches(/^\d{1,10}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const buscar = [
    check('dato').exists().matches(/^[()/a-zA-Z Ññ0-9_-]{1,400}$/),
    check('idviaje')
        .exists()
        .matches(/^\d{1,10}$/),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

import { check } from "express-validator"
import { validaciones } from "./headers.js"

export const insertar = [
    check('idrol')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('username')
        .isLength({ min: 4 })
        .exists(),
    check('xyz')
        .isLength({ min: 4 })
        .exists(),
    check('ci')
        .isLength({ min: 5, max: 15 })
        .exists(),
    check('nombre')
        .isLength({ min: 4 })
        .exists(),
    check('apellido1')
        .isLength({ min: 4 })
        .exists(),
    check('apellido2')
        .isLength({ min: 4 })
        .exists(),
    check('celular')
        .exists()
        .isNumeric()
        .isLength({ min: 4, max: 25 }),
    check('direccion')
        .exists()
        .matches(/^[()/a-zA-Z Ññ0-9_-]{1,400}$/),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const actualizar = [
    check('id')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('idrol')
        .isLength({ min: 1 })
        .exists().isNumeric(),

    check('ci')
        .isLength({ min: 5, max: 15 })
        .exists(),
    check('nombre')
        .isLength({ min: 4 })
        .exists(),
    check('apellido1')
        .isLength({ min: 4 })
        .exists(),
    check('apellido2')
        .isLength({ min: 4 })
        .exists(),
    check('celular')
        .exists()
        .isNumeric()
        .isLength({ min: 4, max: 25 }),
    check('direccion')
        .exists()
        .matches(/^[()/a-zA-Z Ññ0-9_-]{1,400}$/),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]


export const insertarA = [
    check('idoficina')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('idrol')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('username')
        .isLength({ min: 4 })
        .exists(),
    check('xyz')
        .isLength({ min: 4 })
        .exists(),
    check('ci')
        .isLength({ min: 5, max: 15 })
        .exists(),
    check('nombre')
        .isLength({ min: 4 })
        .exists(),
    check('apellido1')
        .isLength({ min: 4 })
        .exists(),
    check('apellido2')
        .isLength({ min: 4 })
        .exists(),
    check('celular')
        .exists()
        .isNumeric()
        .isLength({ min: 4, max: 25 }),
    check('direccion')
        .exists()
        .matches(/^[()/a-zA-Z Ññ0-9_-]{1,400}$/),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const actualizarA = [
    check('id')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('idoficina')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('idrol')
        .isLength({ min: 1 })
        .exists().isNumeric(),

    check('ci')
        .isLength({ min: 5, max: 15 })
        .exists(),
    check('nombre')
        .isLength({ min: 4 })
        .exists(),
    check('apellido1')
        .isLength({ min: 4 })
        .exists(),
    check('apellido2')
        .isLength({ min: 4 })
        .exists(),
    check('celular')
        .exists()
        .isNumeric()
        .isLength({ min: 4, max: 25 }),
    check('direccion')
        .exists()
        .matches(/^[()/a-zA-Z Ññ0-9_-]{1,400}$/),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]









export const actualizarMiPerfil = [

    check('nombre')
        .isLength({ min: 4 })
        .exists(),
    check('apellido1')
        .isLength({ min: 4 })
        .exists(),
    check('apellido2')
        .isLength({ min: 4 })
        .exists(),
    check('ci')
        .exists()
        .isLength({ min: 4 }),
    // check('correo')
    //     .exists()
    //     .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/),
    check('telefono')
        .exists()
        .isNumeric()
        .isLength({ min: 4, max: 25 }),
    // check('direccion')
    //     .exists()
    //     .isString()
    //     .isLength({ min: 5, max: 100 }),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]
export const actualizarRol = [
    check('id')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('idrol')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const actualizarRolesServicios = [
    check('id')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('idproyecto')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    check('idrol')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    check('sueldo')
        .exists()
        .matches(/^-?\d+([.]\d+)?(?:[Ee][-+]?\d+)?$/),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const validar = [
    check('id')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('idproyecto')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('idrol')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('sueldo')
        .isLength({ min: 1 })
        .matches(/^-?\d+([.]\d+)?(?:[Ee][-+]?\d+)?$/),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const deshabilitar = [
    check('id')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const cambiarMiContraseña = [

    check('pass1')
        .exists().
        isLength({ min: 5 }),
    check('pass2')
        .exists().
        isLength({ min: 5 }),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]


export const eliminar = [
    check('id').isLength({ min: 1 }).exists().isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const buscar = [
    check('dato').isLength({ min: 1 }).exists(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const siguiente = [
    check('id').isLength({ min: 1 }).exists().isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const anterior = [
    check('id').isLength({ min: 1 }).exists().isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const recet = [
    check('id')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('pass1')
        .exists()
        .matches(/^.{4,200}$/),
    check('fecha')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

// buscar
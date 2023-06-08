import { Router } from "express"
import { Asiento } from "../modelo/asiento.js"
import { insertar,  eliminar, id } from '../validacion/asiento.js'
import pool from '../modelo/bdConfig.js'



const rutas = Router()
const asiento = new Asiento()


// listar los registros pertenecientes a la empresa del usaurio secretaria
rutas.post("/all", id, async (req, res) => {
    console.log(req.body, 'controlller lista asientos')
    const { empresa } = req.body
    const datos = { empresa }
    try {
        const resultado = await asiento.listar(datos)
        console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})



rutas.post("/ver", async (req, res) => {
    // console.log(req.body, 'ver usuario')
    try {
        const resultado = await asiento.ver(req.body.id)
        // console.log(resultado)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})








// listar los diferentes tipo de vehiculos para permitir registrar o modificar los registros de vehiculos, ej: bus, buscama, miniban etc
// se pasa el parametro empresa para listar los registros del personal de la empresa que corresponde


rutas.post("/asientoubi", id, async (req, res) => {
    try {
        const resultado = await asiento.listarAsientoUbicacion(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        return res.json({ ok: false, msg: 'Contactese con el administrador' })
    }
})

// la operacion regisrtras asiento solo esta permitido para el rol secretaria
// se pasa el parametro empresa para listar los registros correspondientes

rutas.post("/registrar",insertar, async (req, res) => {

    try {
        const { idasientoubi, idvehiculo, capacidad, numero, creado, usuario } = req.body

        if (numero <= capacidad) {
            const datos = { idasientoubi, idvehiculo, numero, creado, usuario }
            const resultado = await asiento.insertar(datos, capacidad)

            if (resultado.existe === 1)
                return res.json({ ok: false, msg: 'El numero de asiento ya está registraso' })
            if (resultado.existe === 2)
                return res.json({ ok: false, msg: 'Ya no se puede agregar mas asientos' })
            else return res.json({ data: resultado, ok: true, msg: 'El asiento se ha registrado correctamente' })
        } else return res.json({ ok: false, msg: 'El numero de asiento esta por encima de la capacidad del vehículo' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Intente nuevamente', ok: false })
    }

})


// se pasa el parametro empresa para listar los registros correspondientes

rutas.post("/eliminar", eliminar, async (req, res) => {
    console.log(req.body)
    try {

        const {  idvehiculo, numero, modificado, usuario } = req.body;
        const datos = {
            idvehiculo,numero, modificado, usuario
        }
        const resultado = await asiento.eliminar(datos)
        return res.json({ data: resultado, ok: true, msg: 'El registro se ha quitado de la lista activa' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error, Elimine los registros dependientes' })
    }

})




export default rutas;
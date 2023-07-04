import { Router } from "express"
import { Asiento } from "../modelo/asiento.js"
import { insertar, eliminar, id } from '../validacion/asiento.js'
import pool from '../modelo/bdConfig.js'



const rutas = Router()
const asiento = new Asiento()



rutas.post("/registrar", insertar, async (req, res) => {

    try {
        const { idvehiculo, x, y, numero, creado, usuario } = req.body

        const datos = { idvehiculo, x, y, numero, creado, usuario }
        const resultado = await asiento.insertar(datos)

        if (resultado.existe === 1)
            return res.json({ ok: false, msg: 'El numero de asiento ya está registraso' })

        else return res.json({ data: resultado, ok: true, msg: 'El asiento se ha registrado correctamente' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Intente nuevamente', ok: false })
    }

})


// se pasa el parametro empresa para listar los registros correspondientes

rutas.post("/eliminar", eliminar, async (req, res) => {
    console.log(req.body)
    try {

        const { idvehiculo, numero, modificado, usuario } = req.body;
        const datos = {
            idvehiculo, numero, modificado, usuario
        }
        const resultado = await asiento.eliminar(datos)
        return res.json({ data: resultado, ok: true, msg: 'El registro se ha quitado de la lista activa' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error, Elimine los registros dependientes' })
    }

})




export default rutas;
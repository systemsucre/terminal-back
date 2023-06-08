import { Router } from "express"
import { Viaje } from "../modelo/viaje.js"
import { insertar, id, buscar, actualizar } from '../validacion/viaje.js'



const rutas = Router()
const viaje = new Viaje()


// listar los registros pertenecientes a la empresa del usaurio secretaria
rutas.post("/all", async (req, res) => {
    // console.log(req.body, 'controlller list data rutas')
    const { empresa } = req.body
    try {
        const resultado = await viaje.listar(empresa)
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})





rutas.post("/ver", async (req, res) => {
    // console.log(req.body, 'ver usuario')
    try {
        const resultado = await viaje.ver(req.body.id)
        // console.log(resultado)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})








// la funcion pasa el id de la empresa para listar vehiculos pertenecientes a esa empresa

rutas.post("/siguiente", id, async (req, res) => {

    const { id, empresa } = req.body
    const datos = { id, idempresa: empresa }
    try {
        const resultado = await viaje.listarSiguiente(datos)
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})





// la funcion pasa el id de la empresa para listar vehiculos pertenecientes a esa empresa

rutas.post("/anterior", id, async (req, res) => {
    const { id, empresa } = req.body
    const datos = { id, idempresa: empresa }
    try {
        const resultado = await viaje.listarAnterior(datos)
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})


// listar los diferentes tipo de vehiculos para permitir registrar o modificar los registros de vehiculos, ej: bus, buscama, miniban etc
// se pasa el parametro empresa para listar los registros del personal de la empresa que corresponde


rutas.post("/listarrutas", async (req, res) => {
    // console.log(req.body, 'listar lugares')
    try {
        const resultado = await viaje.listarRutas(req.body.empresa)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Contactese con el administrador' })
    }
})


rutas.post("/registrar", insertar, async (req, res) => {

    try {
        const { idruta, idvehiculo, fecha, creado, usuario } = req.body

        const datos = { idruta, idvehiculo, fecha, creado, usuario }
        const resultado = await viaje.insertar(datos) 

        if (resultado?.existe === 1)
            return res.json({ ok: false, msg: 'Esta vehiculo ya fue programado para esta fecha en esta viaje' })
        else return res.json({ data: resultado, ok: true, msg: 'El viaje se ha registrado correctamente' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Intente nuevamente', ok: false })
    }

})


// operaciones desde el usuario
// esta operacion evita registrar capacidades fuera del limite superior o exterior,

rutas.post("/actualizar", actualizar, async (req, res) => {
    try {

        const { id, idruta, idvehiculo, fecha, creado, modificado } = req.body

        const datos = { id, idruta, idvehiculo, fecha, creado, modificado }
        const resultado = await viaje.actualizar(datos)

        if (resultado?.existe === 1)
            return res.json({ ok: false, msg: 'Ya existe este registro' })
        else return res.json({ data: resultado, ok: true, msg: 'La viaje se ha actualizado correctamente' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Intente nuevamente', ok: false })
    }

})
// se pasa el parametro empresa para listar los registros correspondientes

rutas.post("/eliminar", async (req, res) => {
    console.log(req.body)
    try {

        const { id, fecha, usuario, empresa } = req.body;
        const datos = {
            id, modificado: fecha, usuario, empresa
        }
        const resultado = await viaje.eliminar(datos)
        return res.json({ data: resultado, ok: true, msg: 'El registro se ha quitado de la lista activa exitosamente' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error, Elimine los registros dependientes' })
    }

})




// se pasa el parametro empresa para listar los registros del personal de la empresa que corresponde

rutas.post("/buscar", buscar, async (req, res) => {
    // console.log(req.body)
    const { dato, usuario, empresa } = req.body
    const datos = { dato, usuario, empresa }
    try {
        const resultado = await viaje.buscar(datos)
        return res.send({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})




export default rutas;
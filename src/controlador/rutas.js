import { Router } from "express"
import { Ruta } from "../modelo/rutas.js"
import { insertar, id, buscar, actualizar } from '../validacion/rutas.js'



const rutas = Router()
const ruta = new Ruta()


// listar los registros pertenecientes a la empresa del usaurio secretaria
rutas.post("/all", async (req, res) => {
    const { empresa } = req.body
    try {
        const resultado = await ruta.listar(empresa)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})





rutas.post("/ver", async (req, res) => {
    try {
        const resultado = await ruta.ver(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})








// la funcion pasa el id de la empresa para listar vehiculos pertenecientes a esa empresa

rutas.post("/siguiente", id, async (req, res) => {

    const { id, empresa } = req.body
    const datos = { id, idempresa:empresa }
    try {
        const resultado = await ruta.listarSiguiente(datos)
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
        const resultado = await ruta.listarAnterior(datos)
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


rutas.post("/lugares", async (req, res) => {
    try {
        const resultado = await ruta.listarLugares()
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Contactese con el administrador' })
    }
})


rutas.post("/registrar", insertar, async (req, res) => {

    try {
        const { origen,destino, lugarorigen, lugardestino, duracion, empresa, dia, hora, creado, usuario } = req.body

        const datos = { origen,destino, lugarorigen, lugardestino, duracion, idempresa: empresa, dia, hora, creado, usuario }
        const resultado = await ruta.insertar(datos)

        if (resultado?.existe === 1)
            return res.json({ ok: false, msg: 'Ya existe este registro' })
        else return res.json({ data: resultado, ok: true, msg: 'La ruta se ha registrado correctamente' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Intente nuevamente', ok: false })
    }

})


// operaciones desde el usuario
// esta operacion evita registrar capacidades fuera del limite superior o exterior,

rutas.post("/actualizar", actualizar, async (req, res) => {
    try {

        const { id, origen, destino,lugarorigen, lugardestino, duracion, empresa, dia, hora, creado, usuario } = req.body

        const datos = { id, origen, destino, lugarorigen, lugardestino, duracion, idempresa:empresa, dia, hora, creado, usuario }
        const resultado = await ruta.actualizar(datos)

        if (resultado?.existe === 1)
            return res.json({ ok: false, msg: 'Ya existe este registro' })
        else return res.json({ data: resultado, ok: true, msg: 'La ruta se ha actualizado correctamente' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Intente nuevamente', ok: false })
    }

})
// se pasa el parametro empresa para listar los registros correspondientes

rutas.post("/eliminar", async (req, res) => {
    try {

        const { id, fecha, usuario, empresa } = req.body;
        const datos = {
            id, modificado: fecha, usuario, empresa
        }
        const resultado = await ruta.eliminar(datos)
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
        const resultado = await ruta.buscar(datos)
        return res.send({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})




export default rutas;
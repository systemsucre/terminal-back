import { Router } from "express"
import { Vehiculo } from "../modelo/vehiculo.js"
import { insertar, actualizar, eliminar, restaurar,reConfigurar, buscar, id } from '../validacion/vehiculo.js'
import pool from '../modelo/bdConfig.js'



const rutas = Router()
const vehiculo = new Vehiculo()


// listar los registros pertenecientes a la empresa del usaurio secretaria
rutas.post("/all", async (req, res) => {
    console.log(req.body, 'controlller list data users')
    const { empresa } = req.body
    const datos = { empresa }
    try {
        const resultado = await vehiculo.listar(datos)
        console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})

rutas.post("/reciclaje", async (req, res) => {
    console.log(req.body, 'controlador delete')
    const { empresa } = req.body
    const datos = { empresa }
    try {
        const resultado = await vehiculo.listarReciclaje(datos)
        console.log(resultado)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        return res.json({ ok: false, msg: 'Error en el Servidor' })
    }

})



rutas.post("/ver", async (req, res) => {
    // console.log(req.body, 'ver usuario')
    try {
        const resultado = await vehiculo.ver(req.body.id)
        // console.log(resultado)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})








// la funcion pasa el id de la empresa para listar vehiculos pertenecientes a esa empresa

rutas.post("/next", id, async (req, res) => {

    const { id, empresa } = req.body
    const datos = { id, empresa }
    try {
        const resultado = await vehiculo.listarSiguiente(datos)
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

rutas.post("/nextdelete", id, async (req, res) => {
    console.log('nextdelete')

    const { id, empresa } = req.body
    const datos = { id, empresa }
    try {
        const resultado = await vehiculo.listarSiguienteEliminados(datos)
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
    const datos = { id, empresa }
    try {
        const resultado = await vehiculo.listarAnterior(datos)
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

rutas.post("/anterioreliminados", id, async (req, res) => {
    const { id, empresa } = req.body
    const datos = { id, empresa }
    try {
        const resultado = await vehiculo.listarAnteriorEliminados(datos)
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


rutas.post("/tipo-personal", async (req, res) => {
    try {
        const resultado = await vehiculo.listarTipo(req.body.empresa)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Contactese con el administrador' })
    }
})

// la operacion regisrtras vehiculo solo esta permitido para el rol secretaria
// se pasa el parametro empresa para listar los registros correspondientes

rutas.post("/registrar", insertar, async (req, res) => {

    try {
        const { idtipo, idusuario, placa, modelo, creado, usuario } = req.body

        const datos = { idtipo, idusuario, placa, modelo, creado, usuario }
        const resultado = await vehiculo.insertar(datos, req.body.empresa)

        if (resultado?.existe === 1)
            return res.json({ ok: false, msg: 'Ya existe este registro' })
        else return res.json({ data: resultado, ok: true, msg: 'El vehiculo se ha registrado correctamente' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Intente nuevamente', ok: false })
    }

})


// operaciones desde el usuario
// esta operacion evita registrar capacidades fuera del limite superior o exterior,

rutas.post("/actualizar", actualizar, async (req, res) => {
    try {
        const { id,  idusuario, placa, modelo, modificado, usuario } = req.body
        const datos = { id, idusuario, placa, modelo, modificado, usuario }
        const resultado = await vehiculo.actualizar(datos)

        if (resultado?.existe === 1)
            return res.json({ ok: false, msg: 'Ya existe este registro' })
        else return res.json({ data: resultado, ok: true, msg: 'El vehiculo se ha actualizado correctamente' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Intente nuevamente', ok: false })
    }

})
// se pasa el parametro empresa para listar los registros correspondientes

rutas.post("/eliminar", eliminar, async (req, res) => {
    console.log(req.body)
    try {

        const { id, fecha, usuario, empresa } = req.body;
        const datos = {
            id, modificado: fecha, usuario, empresa
        }
        const resultado = await vehiculo.eliminar(datos)
        return res.json({ data: resultado, ok: true, msg: 'El registro se ha quitado de la lista activa exitosamente' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error, Elimine los registros dependientes' })
    }

})


// se pasa el parametro empresa para listar los registros correspondientes
rutas.post("/restaurar", restaurar, async (req, res) => {
    // console.log(req.body)
    try {
        const { id, fecha, usuario, empresa } = req.body;
        const datos = {
            id, modificado: fecha, usuario, empresa
        }
        const resultado = await vehiculo.restaurar(datos)
        return res.json({ ok: true, data: resultado, msg: 'El vehículo se activo correctamente' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el Servidor' })
    }
})

// se pasa el parametro empresa para listar los registros del personal de la empresa que corresponde

rutas.post("/buscar", buscar, async (req, res) => {
    // console.log(req.body)
    const { dato, usuario, empresa } = req.body
    const datos = { dato, usuario, empresa }
    try {
        const resultado = await vehiculo.buscar(datos)
        return res.send({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})
// se pasa el parametro empresa para listar los registros del personal de la empresa que corresponde

rutas.post("/buscareliminados", buscar, async (req, res) => {
    // console.log(req.body)
    const { dato, empresa } = req.body
    const datos = { dato, empresa }
    try {
        const resultado = await vehiculo.buscarEliminado(datos)
        return res.send({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})

rutas.post("/re-configurar", reConfigurar, async (req, res) => {
    console.log(req.body)
    try {

        const { idvehiculo, idtipo, modificado, usuario } = req.body;
        const datos = {
            idvehiculo, idtipo, modificado, usuario
        }
        const resultado = await vehiculo.reConfigurar(datos)
        return res.json({ data: resultado, ok: true, msg: 'La configuracion del vehiculo se actualizo correctamente, vuelva a registrar asientos' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error, Elimine los registros dependientes' })
    }

})


export default rutas;
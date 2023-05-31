import { Router } from "express"
import { Usuario } from "../modelo/usuario.js"
import { eliminar, buscar, siguiente, validar, insertar,actualizar, recet } from '../validacion/usuario.js'



const rutas = Router()
const usuarios = new Usuario()


rutas.post("/all", async (req, res) => {
    console.log(req.body, 'controlller list data users')
    const { usuario, empresa} = req.body
    const datos ={usuario, empresa}
    try {
        const resultado = await usuarios.listar(datos)
        console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})

rutas.post("/reciclaje", async (req, res) => {
    console.log(req.body, 'controlador delete')
    const { empresa} = req.body
    const datos ={ empresa}
    try {
        const resultado = await usuarios.listarReciclaje(datos )
        console.log(resultado)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        return res.json({ ok: false, msg: 'Error en el Servidor' })
    }

})

rutas.post("/recet", recet, async (req, res) => {
    console.log(req.body, 'recetear contraseña')
    const { pass1, id, usuario, fecha } = req.body
    const datos = { pass1, id, usuario, fecha }
    try {
        await usuarios.recet(datos).then(j => {
            if (j) res.json({ msg: 'La contraseña se ha cambiado correctamente', ok: true })
        })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})


rutas.post("/ver", async (req, res) => {
    // console.log(req.body, 'ver usuario')
    try {
        const resultado = await usuarios.ver(req.body.id)
        // console.log(resultado)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})

rutas.post("/rol", async (req, res) => {
    try {
        const resultado = await usuarios.listarRol()
        return res.json(resultado)
    } catch (error) {
        return res.status(500).send(error)
    }
})

rutas.post("/buscar", buscar, async (req, res) => {
    // console.log(req.body)
    const { dato, usuario , empresa} = req.body
    const datos = { dato, usuario, empresa }
    try {
        const resultado = await usuarios.buscar(datos)
        return res.send({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})

rutas.post("/buscareliminados", buscar, async (req, res) => {
    // console.log(req.body)
    const {dato, empresa} = req.body
    const datos = {dato, empresa}
    try {
        const resultado = await usuarios.buscarEliminado(datos)
        return res.send({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})


rutas.post("/validar", validar, async (req, res) => {
    console.log(req.body, 'datos')
    try {
        const { id, idproyecto, idrol, modificado, usuario, sueldo, user } = req.body;
        const datos = {
            id, idproyecto, idrol, sueldo, modificado, usuario
        }
        const resultado = await usuarios.validar(datos)

        return res.json({ data: resultado, msg: 'Operacion Exitosa', ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error del servidor' })
    }

})


rutas.post("/eliminar", eliminar, async (req, res) => {
    console.log(req.body)
    try {

        const { id, fecha, usuario, empresa } = req.body;
        const datos = {
            id, modificado: fecha, usuario, empresa
        }
        const resultado = await usuarios.eliminar(datos)
        return res.json({ data: resultado, ok: true, msg: 'El usuario se ha eliminado exitosamente' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error, Elimine los registros dependientes' })
    }

})

rutas.post("/restaurar", eliminar, async (req, res) => {
    // console.log(req.body)
    try {
        const { id, fecha, usuario, empresa } = req.body;
        const datos = {
            id, modificado: fecha, usuario, empresa
        }
        const resultado = await usuarios.restaurar(datos)
        if (resultado.affectedRows === 0)
            return res.json({ msg: "No existe el registro", ok: false });
        return res.json({ ok: true, data: resultado, msg: 'El registro se ha restaurado' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el Servidor' })
    }
})


rutas.post("/next", siguiente, async (req, res) => {

    const { id, usuario, empresa } = req.body
    const datos = { id, usuario, empresa }
    try {
        const resultado = await usuarios.listarSiguiente(datos)
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})

rutas.post("/nextdelete", siguiente, async (req, res) => {
    console.log('nextdelete')

    const {id, empresa} = req.body
    const datos = {id, empresa}
    try {
        const resultado = await usuarios.listarSiguienteEliminados(datos )
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})


rutas.post("/anterior", siguiente, async (req, res) => {
    const { id, usuario, empresa} = req.body
    const datos = { id, usuario, empresa }
    try {
        const resultado = await usuarios.listarAnterior(datos)
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})
rutas.post("/anterioreliminados", siguiente, async (req, res) => {
    const {id, empresa} = req.body
    const datos = {id, empresa}
    try {
        const resultado = await usuarios.listarAnteriorEliminados(datos)
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})



rutas.post("/registrar", insertar, async (req, res) => {

    console.log('datos: ', req.body)
    try {

        const { empresa,idrol, username, xyz, ci, nombre, apellido1,
            apellido2, celular, direccion, creado, usuario } = req.body

        const datos = {
            idempresa:empresa,
            idrol,
            username,
            pass: xyz,
            ci,
            nombre,
            apellido1,
            apellido2,
            celular,
            direccion,
            creado,
            usuario
        }

        const resultado = await usuarios.insertar(datos)

        if (resultado.existe === 1)
            return res.json({ ok: false, msg: 'Este usuario ya esta registrado' })
        if (resultado.existe === 2)
            return res.json({ ok: false, msg: 'Este C.I. ya esta registrado' })
        else
            return res.json({ data: resultado, ok: true, msg: "La cuenta ha sido creado correctamente" });
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Intente nuevamente', ok: false })
    }

})


rutas.post("/actualizar", actualizar, async (req, res) => {

    console.log('datos: ', req.body)
    try {

        const {id, idrol,  ci, nombre, apellido1,
            apellido2, celular, direccion, modificado, usuario } = req.body

        const datos = {
            id,
            idrol,
            ci,
            nombre,
            apellido1,
            apellido2,
            celular,
            direccion,
            modificado,
            usuario
        }

        const resultado = await usuarios.actualizar(datos)

        if (resultado.existe === 1)
            return res.json({ ok: false, msg: 'Este C.I. ya esta registrado' })
        else
            return res.json({ data: resultado, ok: true, msg: "La cuenta se actualizó correctamente" });

    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Intente nuevamente', ok: false })
    }

})


export default rutas;
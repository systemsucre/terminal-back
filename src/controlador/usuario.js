import { Router } from "express"
import { Usuario } from "../modelo/usuario.js"
import { eliminar, buscar, siguiente, insertar,actualizar, recet } from '../validacion/usuario.js'



const rutas = Router()
const usuarios = new Usuario()


rutas.post("/all", async (req, res) => {
    const { usuario, oficina} = req.body
    const datos ={usuario, oficina}
    try {
        const resultado = await usuarios.listar(datos)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})


rutas.post("/recet", recet, async (req, res) => {
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
    try {
        const resultado = await usuarios.ver(req.body.id)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})

rutas.post("/rol", async (req, res) => {
    try {
        const resultado = await usuarios.listarRolSecretaria()
        return res.json(resultado)
    } catch (error) {
        return res.status(500).send(error)
    }
})

rutas.post("/buscar", buscar, async (req, res) => {
    const { dato, usuario , oficina} = req.body
    const datos = { dato, usuario, oficina }
    try {
        const resultado = await usuarios.buscar(datos)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})


rutas.post("/eliminar", eliminar, async (req, res) => {
    try {

        const { id, fecha, usuario, oficina } = req.body;
        const datos = {
            id, modificado: fecha, usuario, oficina
        }
        const resultado = await usuarios.eliminar(datos)
        return res.json({ data: resultado, ok: true, msg: 'El usuario se ha eliminado exitosamente' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error, Elimine los registros dependientes' })
    }

})


rutas.post("/next", siguiente, async (req, res) => {

    const { id, usuario, oficina } = req.body
    const datos = { id, usuario, oficina }
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



rutas.post("/anterior", siguiente, async (req, res) => {
    const { id, usuario, oficina} = req.body
    const datos = { id, usuario, oficina }
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


rutas.post("/registrar", insertar, async (req, res) => {

    console.log('datos: ', req.body)
    try {

        const { oficina,idrol, username, xyz, ci, nombre, apellido1,
            apellido2, celular, direccion, creado, usuario } = req.body

        const datos = {
            idoficina:oficina,
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

        const resultado = await usuarios.insertarSecretaria(datos)

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

        const resultado = await usuarios.actualizarSecretaria(datos)

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
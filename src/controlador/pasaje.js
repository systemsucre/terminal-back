import { Router } from "express"
import { Pasaje } from "../modelo/pasaje.js"
import { id, buscar, listarViajeVehiculo } from '../validacion/pasaje.js'



const rutas = Router()
const pasaje = new Pasaje()



rutas.post("/prepararDatosPasaje", listarViajeVehiculo, async (req, res) => {
    const { idvehiculo, idviaje } = req.body
    try {
        const resultado = await pasaje.prepararDatosPasaje(idvehiculo, idviaje)
        // console.log(resultado)

        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})


rutas.post("/extraerdatosactualizarpasaje", id, async (req, res) => {
    try {
        const resultado = await pasaje.extraerDatosDctualizarDasaje(req.body.id)   
        if (resultado.length > 0)
            return res.json({ data: resultado, ok: true })
        else return res.json({ ok: false, msg: 'No se encontro la información, verifique la lista de pasajes para este viaje' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'intente desde la ventana ver' })
    }
})



rutas.post("/verpasaje", async (req, res) => {
    // console.log(req.body, 'ver usuario')
    try {
        const resultado = await pasaje.ver(req.body.id)
        // console.log(resultado)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})






// se pasa el parametro empresa para listar los registros del personal de la empresa que corresponde

rutas.post("/buscar", buscar, async (req, res) => {
    // console.log(req.body)
    const { dato, idviaje } = req.body
    const datos = { dato, idviaje}
    try {
        const resultado = await pasaje.buscar(datos)
        return res.send({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})
// la funcion pasa el id de la empresa para listar vehiculos pertenecientes a esa empresa

rutas.post("/siguiente", id, async (req, res) => {

    const { id } = req.body
    const datos = { id }
    try {
        const resultado = await pasaje.listarSiguiente(datos)
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})


rutas.post("/anterior", id, async (req, res) => {
    const { id } = req.body
    const datos = { id }
    try {
        const resultado = await pasaje.listarAnterior(datos)
        if (resultado.length > 0)
            return res.json({ ok: true, data: resultado })
        else
            return res.json({ ok: false, msg: 'Ya no hay mas registros!' })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})


rutas.post("/listar", id, async (req, res) => {
    // console.log(req.body)
    const { id } = req.body
    const datos = { id}
    try {
        const resultado = await pasaje.listar(datos)
        // console.log(resultado)
        return res.json({ data: resultado, ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }

})




export default rutas;
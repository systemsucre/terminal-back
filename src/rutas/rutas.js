import express from "express";
import pool from '../modelo/bdConfig.js'
import { KEY } from '../config.js'

import jwt from 'jsonwebtoken'
// Admiministrador

import usuario from "../controlador/usuario.js";
import usuarioAdmin from "../controlador/usuarioadmin.js";
import vehiculo from "../controlador/vehiculo.js";
import asiento from "../controlador/asiento.js";
import ruta from "../controlador/rutas.js";
import viaje from "../controlador/viaje.js";
import pasaje from '../controlador/pasaje.js'






const rutas = express();

// +*********************************************************** login****************************************


// ruta de autentidicacion
rutas.get('/', async (req, res) => {
    console.log("datos de la solicitud: ", req.query)

    try {
        const sql = ` SELECT u.id, u.nombre, u.apellido1, u.apellido2, u.username, rol.numero, e.id as empresa, o.id as oficina
        from usuario u 
        inner join rol on u.idrol = rol.id 
        inner join oficina o on o.id = u.idoficina 
        inner join empresa e on e.id = o.idempresa  
        WHERE u.username = ${pool.escape(req.query.user)} and u.pass = ${pool.escape(req.query.pass)} and u.eliminado = 0`;

        // console.log(await pool.query(sql), 'resultados de la consulta inicial')
        const [result] = await pool.query(sql)
        console.log("datos de la consulta: ", result)

        if (result.length === 1) {
            var d = new Date();
            let fecha = d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0];
            const payload = {
                "usuario": result[0].username,
                "ap1": result[0].apellido1,
                "ap2": result[0].apellido2,
                "name": result[0].nombre,
                'fecha': fecha
            }
            const token = jwt.sign(payload, KEY, {
                expiresIn: "14d"
            })

            const idusuario = result[0].id
            const numero = result[0].numero
            const empresa = result[0].empresa
            const oficina = result[0].oficina
            const datos = {
                idusuario,
                empresa,
                oficina,
                rol: numero,
                fecha,
                token
            }

            const [sesion] = await pool.query(`INSERT INTO sesion SET ?`, datos)
            // console.log('dentro del bloque', sesion)

            if (sesion.insertId > 0) {
                console.log('dentro del bloquesss', req.query.user, req.query.pass)

                const sqlInfo = `SELECT UPPER(r.rol) as rol, r.numero as numRol,
                    u.username, concat(UPPER(left(u.nombre,1)),LOWER(SUBSTRING(u.nombre,2))) as nombre, e.nombre as nombreempresa, o.telefono, e.origen, o.direcion, o.lugar,
                    concat(UPPER(left(u.apellido1,1)),LOWER(SUBSTRING(u.apellido1,2))) as apellido, e.id as empresa, 
                    o.id as oficina
                    from usuario u 
                    inner join rol r on u.idrol = r.id
                    inner join oficina o on o.id = u.idoficina
                    inner join empresa e on e.id = o.idempresa
                    where u.username = ${pool.escape(req.query.user)} and u.pass = ${pool.escape(req.query.pass)} `;
                const [info] = await pool.query(sqlInfo)
                console.log("datos de la consulta: ", info[0])

                return res.json({
                    'token': token,
                    'username': info[0].username,
                    'nombre': info[0].nombre,
                    'apellido': info[0].apellido,
                    'rol': info[0].rol,
                    'numRol': info[0].numRol,
                    'oficina': info[0].lugar,
                    "minuto": info[0].empresa,
                    "empresa": info[0].nombreempresa,
                    "telefono": info[0].telefono,
                    "origen": info[0].origen,
                    "direccion": info[0].direcion,
                    ok: true,
                    msg: 'Acceso correcto'
                })
            }
            else {
                return res.json({ msg: 'Intente nuevamente ', ok: false })
            }
        }
        else {
            // console.log('El usuario no existe')
            return res.json({ msg: 'El usuario no existe !', ok: false })
        }
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'El servidor no responde !', ok: false })
    }
})


rutas.post('/logout', (req, res) => {
    const sql = `delete from sesion where token = ${pool.escape(req.body.token)} `
    pool.query(sql)
})







//VERIFICACION DE LA SESION QUE ESTA ALMACENADA EN LA BD
const verificacion = express();

verificacion.use((req, res, next) => {
    // console.log('verificacion')

    try {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {
            const bearetoken = bearerHeader.split(" ")[1];
            // console.log('pasa la primera condicional, se ha obtenido los encabezados', bearetoken )

            jwt.verify(bearetoken, KEY, async (errtoken, authData) => {
                if (errtoken) {
                    // console.log('error en la verificacion token alterado: ', bearetoken)
                    pool.query('delete from sesion where token = ?', [bearetoken])
                    return res.json({ ok: false, msg: 'Su token a expirado, cierre sesion y vuelva a iniciar sesion' })
                }

                // console.log('pasa la verificacion del token', bearetoken)
                const sql = `SELECT idusuario,rol, empresa, oficina from sesion 
                where token  = ${pool.escape(bearetoken)}`;
                const [result] = await pool.query(sql)
                if (result.length > 0) {
                    req.body.usuario = await result[0].idusuario
                    req.body.rol = await result[0].rol
                    req.body.empresa = await result[0].empresa
                    req.body.oficina = await result[0].oficina
                    next()
                }
                else {

                    return res.json({ ok: false, msg: 'El Servidor no puede identificar su autencidad en la base de datos, cierre sesion y vuelva a iniciar' })
                }
            })
        }
        else {
            return res.json({ ok: false, msg: 'El Servidor no puede interpretar su autenticidad' })
        }
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: 'Error en el servidor' })
    }
})

const admin_ = (req, res, next) => {
    if (parseInt(req.body.rol) === 1) {
        next()
    }
}

const secretaria = (req, res, next) => {
    if (parseInt(req.body.rol) === 2) {
        next()
        // console.log('pasa por aqui')
    }
}


rutas.use("/usuarioadmin", verificacion, admin_, usuarioAdmin)



rutas.use("/usuario", verificacion, secretaria, usuario)
rutas.use("/vehiculo", verificacion, secretaria, vehiculo)
rutas.use("/asiento", verificacion, secretaria, asiento)
rutas.use("/ruta", verificacion, secretaria, ruta)
rutas.use("/viaje", verificacion, secretaria, viaje)
rutas.use("/pasaje", verificacion, secretaria, pasaje)




export default rutas;
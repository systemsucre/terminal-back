import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import cors from 'cors'

import http from 'http'
import { Server as ServidorSoket } from 'socket.io'

// mis modulos
import rutas from "./rutas/rutas.js"
import { PORT } from "./config.js"

import { verificacion } from './socket/verificacion.js'
import { insertarViaje, actualizarViaje, eliminarViaje } from './socket/validarViaje.js'
import { Viaje } from './modelo/viaje.js'


const viaje = new Viaje()

//inicializar 
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set("puerto", PORT)
app.use(cors())


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });

































// modulos para socket.io

const server = http.createServer(app)
const io = new ServidorSoket(server, {
    cors: {
        origin: '*'
    }
})

// SOCKETS 
io.on('connection', (socket) => {

    socket.on('disconnect', () =>
        console.log(`Disconnected: ${socket.id}`));

    socket.on('join', (room) => {
        console.log(room)
        socket.join(room);
    });

    socket.on('guardar', async (data) => {
        try {
            const { token, idruta, idvehiculo, fecha, creado, room } = data
            console.log(token, idruta, idvehiculo, fecha, creado, 'tamaño de la data')

            if (token != 'undefined') {
                const estado = await verificacion(token, room)
                const validar = await insertarViaje({ idruta, idvehiculo, fecha, creado })
                if (estado[0] === true && validar) {


                    let usuario = estado[1]
                    let empresa = estado[3]

                    const datos = { idruta, idvehiculo, fecha, creado, usuario }
                    const resultado = await viaje.insertar(datos, empresa)

                    // console.log(empresa, 'room id de la impresa')

                    if (resultado?.existe === 1) {
                        socket.emit('error', 'El vehiculo ya fue programado en esta ruta en fecha seleccionado')
                    }
                    else { socket.broadcast.to(`${empresa}`).emit('listaViajes', resultado); socket.emit('exito', 'Registro exitoso') }


                }
            }
        } catch (error) {
            console.log(error)
            socket.emit('error', 'Error en el servidor')
        }
    })

    socket.on('actualizar', async (data) => {
        try {
            const { id, token, idruta, idvehiculo, fecha, modificado, room } = data

            if (token != 'undefined') {
                const estado = await verificacion(token, room)
                const validar = await actualizarViaje({ id, idruta, idvehiculo, fecha, modificado })
                // console.log(validar, estado)
                if (estado[0] === true && validar) {


                    let usuario = estado[1]
                    let empresa = estado[3]

                    const datos = { id, idruta, idvehiculo, fecha, modificado, usuario, empresa }
                    const resultado = await viaje.actualizar(datos)

                    if (resultado?.existe === 1) {
                        socket.emit('error', 'Este viaje ya fue cerrado')
                    }
                    else { socket.broadcast.to(`${empresa}`).emit('listaViajes', resultado); socket.emit('exito', 'Operación exitoso') }

                } else { socket.emit('error', 'Verifique los datos') }
            }
        } catch (error) {
            console.log(error)
            socket.emit('error', 'Error en el servidor')
        }
    })

    socket.on('eliminar', async (data) => {
        try {
            const { id, token, fecha, room } = data
            // console.log(id, token, idruta, idvehiculo, fecha, modificado, room, 'tamaño de la data')

            if (token != 'undefined') {
                const estado = await verificacion(token, room)
                const validar = await eliminarViaje({ id, fecha })
                if (estado[0] === true && validar) {

                    let usuario = estado[1]
                    let empresa = estado[3]
                    const datos = { id, modificado: fecha, usuario, empresa }
                    const resultado = await viaje.eliminar(datos)
                    socket.broadcast.to(room).emit('listaViajes', resultado)
                    socket.emit('exito', 'operación exitoso')

                } else { socket.emit('error', 'Reinicie la sesion') }
            }
        } catch (error) {
            console.log(error)
            socket.emit('error', 'Error en el servidor')
        }
    })

})




































app.use(express.static(path.join(__dirname, "../imagenes/recibos")));

app.disable('x-powered-by') // evita que el atacante sepa que 
//ejecutamos express js como servidor
app.use(rutas)



server.listen(app.get("puerto"), () => {
    console.log("servidor corriendo en: ", PORT)
});


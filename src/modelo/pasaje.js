
import pool from './bdConfig.js'

export class Pasaje {

    // METODOS

    prepararDatosPasaje = async (idvehiculo, idviaje) => {
        const sqlVehiculo = `select v.id, t.id as idtipo, t.numero,t.tipo,  v.idusuario, v.placa,
            v.modelo,v.capacidad,v.filas, v.columnas, concat(u.nombre,' ',u.apellido1,' ', u.apellido2) as encargado
            from vehiculo v 
            inner join tipo t on t.id = v.idtipo
            inner join usuario u on u.id = v.idusuario
            where v.id = ${pool.escape(idvehiculo)}`
        const [vehiculo] = await pool.query(sqlVehiculo)

        const sqlAsiento = `select  a.id as idasiento, a.numero as numeroAsiento,  
            au.id as idubicaicon, au.ubicacion, v.placa, t.tipo, t.numero, x,y,
            v.capacidad
            from vehiculo v 
            inner join tipo t on t.id = v.idtipo
            left join asiento a on v.id = a.idvehiculo
            left join asientoubicacion au on a.	idasientoubi = au.id
            where v.id = ${pool.escape(idvehiculo)} and a.eliminado = false`
        const [asiento] = await pool.query(sqlAsiento)


        const sqlpasajesTotal = `select a.x, a.y, p.estado
            from pasaje p
            inner join viaje v on v.id = p.idviaje
            inner join cliente c on c.id = p.idcliente
            inner join asiento a on a.id = p.idasiento
            where p.eliminado = false and v.id = ${pool.escape(idviaje)} order by p.id desc`
        const [pasajeTotal] = await pool.query(sqlpasajesTotal)
        const sqlpasajesParcial = `select p.id, concat(c.nombre,' ',c.apellido1,' ', c.apellido2) as cliente, a.numero,
            DATE_FORMAT(p.fecha, "%Y-%m-%d") AS fecha, DATE_FORMAT(p.hora, "%H:%m") AS hora, p.estado
            from pasaje p
            inner join viaje v on v.id = p.idviaje
            inner join cliente c on c.id = p.idcliente
            inner join asiento a on a.id = p.idasiento
            where p.eliminado = false and v.id = ${pool.escape(idviaje)} order by p.id desc limit 5`
        const [pasajeParcial] = await pool.query(sqlpasajesParcial)
        const sqlCount = `select count(p.id) as cantidad
            from pasaje p inner join viaje v on v.id = p.idviaje where p.eliminado = false and v.id = ${pool.escape(idviaje)}`
        const [count] = await pool.query(sqlCount)
        console.log(count)
        return [vehiculo, asiento, pasajeTotal, pasajeParcial, count]
    }


    extraerDatosDctualizarDasaje = async (dato) => {
        // console.log('los datos han llegado', dato)
        const sql =
            `select p.id,a.numero, c.ci, c.nombre, c.apellido1, c.apellido2, c.telefono,
            c.direccion
            from pasaje p
            inner join cliente c on c.id= p.idcliente
            inner join asiento a on a.id = p.idasiento
            where p.id = ${pool.escape(dato)}`;
        const [rows] = await pool.query(sql)
        return rows
    }

    // MUESTRA EL REGISTRO de los asientos del vehiculo
    ver = async (id) => {

        const sqlpasaje = `select p.id, DATE_FORMAT(p.fecha,"%Y-%m-%d") as fechaemision, DATE_FORMAT(p.hora, "%H:%m") as horaemision,
                            concat(c.nombre,' ',c.apellido1,' ', c.apellido2) as cliente, c.ci, c.telefono, c.direccion, 
                            v.id as idviaje, v.carril, DATE_FORMAT(v.fecha, "%Y-%m-%d") AS fecha, v.costo as costov, v.estado as estadoviaje,v.estado as estadoviaje,
                            a.id as idasiento, a.numero, p.estado,
                            r.id as idruta, r.dia , DATE_FORMAT(r.hora, "%H:%m") as hora , r.costo as costor, r.duracion, r.lugarorigen, r.lugardestino,
                            t.nombre as origen, te.nombre as destino, concat(u.nombre,' ',u.apellido1,' ', u.apellido2) as usuario, 
                            ve.id as idvehiculo
                            FROM pasaje p 
                            inner join cliente c on c.id = p.idcliente
                            inner join viaje v on v.id = p.idviaje
                            inner join asiento a on a.id = p.idasiento
                            inner join ruta r on r.id = v.idruta
                            inner join terminal t on t.id = r.origen
                            inner join terminal te on te.id = r.destino
                            inner join usuario u on u.id = p.usuario
                            inner join vehiculo ve on ve.id = v.idvehiculo
                            where p.id = ${pool.escape(id)}`
        const [pasaje] = await pool.query(sqlpasaje)
        // console.log(pasaje, 'pasaje')

        return pasaje
    }
















    // esta operacion esta permitido solo para el rol secretaria, la placa es un atributo único
    insertar = async (datos) => {
        const sqlexisRuta =
            `SELECT id from pasaje where
            idviaje = ${pool.escape(datos.idviaje)} and idasiento = ${pool.escape(datos.idasiento)}
            and eliminado = false`;
        const [rows] = await pool.query(sqlexisRuta)
        if (rows.length === 0) {
            const datos_cliente = {
                ci: datos.ci, nombre: datos.nombre, apellido1: datos.apellido1, apellido2: datos.apellido2, telefono: datos.telefono, direccion: datos.direccion,
                creado: datos.creado, usuario: datos.usuario
            }

            const [info_cliente] = await pool.query("INSERT INTO cliente SET  ?", datos_cliente)
            console.log(info_cliente.insertId, 'id cliente')
            if (info_cliente.insertId > 0) {
                const pasaje = { idviaje: datos.idviaje, idasiento: datos.idasiento, idcliente: info_cliente.insertId, fecha: datos.fecha, hora: datos.hora, estado: 1, usuario: datos.usuario }
                await pool.query("INSERT INTO pasaje SET  ?", pasaje)
                return await this.prepararDatosPasaje(datos.idvehiculo, datos.idviaje)
            }
        }
        else return { existe: 1 }
    }



    actualizar = async (datos) => {
        // console.log(datos, 'estructura de datos')
        const sqlexisRuta =
            `SELECT id from viaje where
                id = ${pool.escape(datos.idviaje)} and estado = 0 and eliminado = false`;
        const [rows] = await pool.query(sqlexisRuta)
        if (rows.length === 0) {
            const sqlexisRuta =
                `SELECT id from pasaje where
                idviaje = ${pool.escape(datos.idviaje)} and idasiento = ${pool.escape(datos.idasiento)} and id != ${pool.escape(datos.id)} and eliminado = false`;
            const [rows] = await pool.query(sqlexisRuta)
            if (rows.length === 0) {
                const sql = `UPDATE pasaje SET idasiento = ${pool.escape(datos.idasiento)} WHERE id = ${pool.escape(datos.id)} and eliminado = false and estado = 1`;
                await pool.query(sql);
                const sqlActualizarCliente = `UPDATE cliente SET
                nombre = ${pool.escape(datos.nombre)},
                apellido1 = ${pool.escape(datos.apellido1)},
                apellido2 = ${pool.escape(datos.apellido2)},
                ci = ${pool.escape(datos.ci)},
                telefono= ${pool.escape(datos.telefono)},
                direccion =${pool.escape(datos.direccion)},
                modificado =${pool.escape(datos.modificado)},
                usuario = ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.id)} and eliminado = false`;
                await pool.query(sqlActualizarCliente);
                return await this.prepararDatosPasaje(datos.idvehiculo, datos.idviaje)
            } else return { existe: 1 }
        } else return { existe: 2 }
    }


    confirmar = async (datos) => {
        // console.log(datos, 'estructura de datos')
        const sqlexisRuta =
            `SELECT id from viaje where
            id = ${pool.escape(datos.idviaje)} and estado = 0 and eliminado = false`;
        const [rows] = await pool.query(sqlexisRuta)
        if (rows.length === 0) {
            const sqlexisRuta =
                `SELECT id from pasaje where
                idviaje = ${pool.escape(datos.idviaje)} and idasiento = ${pool.escape(datos.idasiento)} and id != ${pool.escape(datos.id)} and eliminado = false`;
            const [rows] = await pool.query(sqlexisRuta)
            if (rows.length === 0) {
                const sql = `UPDATE pasaje SET idasiento = ${pool.escape(datos.idasiento)}, estado = 1 WHERE id = ${pool.escape(datos.id)} and eliminado = false and estado = 0`;
                await pool.query(sql);
                const sqlActualizarCliente = `UPDATE cliente SET
                nombre = ${pool.escape(datos.nombre)},
                apellido1 = ${pool.escape(datos.apellido1)},
                apellido2 = ${pool.escape(datos.apellido2)},
                ci = ${pool.escape(datos.ci)},
                telefono= ${pool.escape(datos.telefono)},
                direccion =${pool.escape(datos.direccion)},
                modificado =${pool.escape(datos.modificado)},
                usuario = ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.id)} and eliminado = false`;
                await pool.query(sqlActualizarCliente);
                return await this.prepararDatosPasaje(datos.idvehiculo, datos.idviaje)
            } else return { existe: 1 }
        } else return { existe: 2 }
    }


    // este vehiculo puede ser eliminado desde la secretaria
    eliminar = async (datos) => {
        console.log(datos)
        const sql = `select p.id
                        from pasaje p 
                        inner join viaje v on v.id = p.idviaje
                        where v.estado = 0 and p.id = ${pool.escape(datos.id)}
                        `;
        const [rows] = await pool.query(sql)
        if (rows.length === 0) {
            const sql = `update pasaje set eliminado = true, 
                modificado = ${pool.escape(datos.modificado)},
                usuario = ${pool.escape(datos.usuario)}
                WHERE id =  ${pool.escape(datos.id)}`;
            await pool.query(sql)
            return await this.prepararDatosPasaje(datos.idvehiculo, datos.idviaje)
        }
    }

    buscar = async (dato) => {
        const sqlpasajes = `select p.id, concat(c.nombre,' ',c.apellido1,' ', c.apellido2) as cliente, a.numero,
        DATE_FORMAT(p.fecha, "%Y-%m-%d") AS fecha, DATE_FORMAT(p.hora, "%H:%m") AS hora, p.estado
        from pasaje p
        inner join viaje v on v.id = p.idviaje
        inner join cliente c on c.id = p.idcliente
        inner join asiento a on a.id = p.idasiento
        where ( c.nombre like  "${dato.dato}%" or c.apellido1 like  "${dato.dato}%" or c.apellido2 like  "${dato.dato}%" 
        or a.numero like  "${dato.dato}%")
         and p.eliminado = false and v.id = ${pool.escape(dato.idviaje)} order by p.id desc
        `
        const [pasaje] = await pool.query(sqlpasajes)
        return pasaje
    }


    listar = async (dato) => {
        const sqlpasajesTotal = `select a.x, a.y
        from pasaje p
        inner join viaje v on v.id = p.idviaje
        inner join cliente c on c.id = p.idcliente
        inner join asiento a on a.id = p.idasiento
        where p.eliminado = false and v.id = ${pool.escape(dato.id)} order by p.id desc`
        const [pasajeTotal] = await pool.query(sqlpasajesTotal)
        const sqlpasajesParcial = `select p.id, concat(c.nombre,' ',c.apellido1,' ', c.apellido2) as cliente, a.numero,
        DATE_FORMAT(p.fecha, "%Y-%m-%d") AS fecha, DATE_FORMAT(p.hora, "%H:%m") AS hora, p.estado
        from pasaje p
        inner join viaje v on v.id = p.idviaje
        inner join cliente c on c.id = p.idcliente
        inner join asiento a on a.id = p.idasiento
        where p.eliminado = false and v.id = ${pool.escape(dato.id)} order by p.id desc limit 5`
        const [pasajeParcial] = await pool.query(sqlpasajesParcial)
        const sqlCount = `select count(id) as cantidad
        from pasaje p where eliminado = false`
        const [count] = await pool.query(sqlCount)
        return [pasajeTotal, pasajeParcial, count]
    }

    listarSiguiente = async (id) => {
        const sql =
            `select p.id, concat(c.nombre,' ',c.apellido1,' ', c.apellido2) as cliente, a.numero,
            DATE_FORMAT(p.fecha, "%Y-%m-%d") AS fecha, DATE_FORMAT(p.hora, "%H:%m") AS hora, p.estado
            from pasaje p
            inner join viaje v on v.id = p.idviaje
            inner join cliente c on c.id = p.idcliente
            inner join asiento a on a.id = p.idasiento
            where p.eliminado = false and p.id < ${pool.escape(id.id)} ORDER by p.id DESC limit 5`;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarAnterior = async (id) => {
        const sql =
            `select p.id, concat(c.nombre,' ',c.apellido1,' ', c.apellido2) as cliente, a.numero,
            DATE_FORMAT(p.fecha, "%Y-%m-%d") AS fecha, DATE_FORMAT(p.hora, "%H:%m") AS hora, p.estado
            from pasaje p
            inner join viaje v on v.id = p.idviaje
            inner join cliente c on c.id = p.idcliente
            inner join asiento a on a.id = p.idasiento
            where p.eliminado = false and p.id > ${pool.escape(id.id)} limit 5`;
        const [rows] = await pool.query(sql)
        rows.reverse()
        return rows
    }
}
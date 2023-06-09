
import pool from './bdConfig.js'

export class Viaje {

    // METODOS

    // este metodo lista solo los vehiculos de una empresa en especifo 
    listar = async (idempresa) => {
        const sql =
            `select v.id,
             DATE_FORMAT(v.fecha,"%Y-%m-%d") as fecha, t.nombre as origen , te.nombre as destino, r.dia, DATE_FORMAT(r.hora, "%H:%m") as hora, v.estado, ti.tipo as tipo
            from viaje v
            inner join vehiculo ve on ve.id = v.idvehiculo
            inner join tipo ti on ti.id = ve.idtipo
            inner join ruta r on r.id = v.idruta
            inner join terminal t on t.id = r.origen 
            inner join terminal te on te.id = r.destino
            where r.idempresa = ${pool.escape(idempresa)} and v.eliminado = false
            order by v.fecha asc LIMIT 8;`;
        const [rows] = await pool.query(sql)
        return rows
    }


    // los registros solo se pueden buscar desde el panel de la secretaria
    buscar = async (dato) => {
        // console.log('los datos han llegado', dato)
        const sql =
            `select v.id,  DATE_FORMAT(v.fecha,"%Y-%m-%d") as fecha, t.nombre as origen , te.nombre as destino, r.dia, DATE_FORMAT(r.hora, "%H:%m") as hora, v.estado, ti.tipo as tipo
            from viaje v
            inner join vehiculo ve on ve.id = v.idvehiculo
            inner join tipo ti on ti.id = ve.idtipo
            inner join ruta r on r.id = v.idruta
            inner join terminal t on t.id = r.origen 
            inner join terminal te on te.id = r.destino
            where r.dia like '${dato.dato}%' 
            and v.eliminado = false and r.idempresa = ${pool.escape(dato.empresa)}
            ORDER by v.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }


    listarSiguiente = async (id) => {
        const sql =
            `select v.id,  DATE_FORMAT(v.fecha,"%Y-%m-%d") as fecha, t.nombre as origen , te.nombre as destino, r.dia, DATE_FORMAT(r.hora, "%H:%m") as hora, v.estado, ti.tipo as tipo
            from viaje v
            inner join vehiculo ve on ve.id = v.idvehiculo
            inner join tipo ti on ti.id = ve.idtipo
            inner join ruta r on r.id = v.idruta
            inner join terminal t on t.id = r.origen 
            inner join terminal te on te.id = r.destino
            where r.idempresa = ${pool.escape(id.idempresa)} and v.eliminado = false and v.id < ${pool.escape(id.id)} ORDER by v.id DESC limit 8`;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarAnterior = async (id) => {
        const sql =
            `select v.id,  DATE_FORMAT(v.fecha,"%Y-%m-%d") as fecha, t.nombre as origen , te.nombre as destino, r.dia, DATE_FORMAT(r.hora, "%H:%m") as hora, v.estado, ti.tipo as tipo
            from viaje v
            inner join vehiculo ve on ve.id = v.idvehiculo
            inner join tipo ti on ti.id = ve.idtipo
            inner join ruta r on r.id = v.idruta
            inner join terminal t on t.id = r.origen 
            inner join terminal te on te.id = r.destino
            where r.idempresa = ${pool.escape(id.idempresa)} and v.eliminado = false and v.id > ${pool.escape(id.id)} limit 8`;
        const [rows] = await pool.query(sql)
        rows.reverse()
        return rows
    }


    // MUESTRA EL REGISTRO de los asientos del vehiculo
    ver = async (id) => {
        const sqlRuta = `select 
                        v.id, DATE_FORMAT(v.fecha,"%Y-%m-%d") as fecha , t.nombre as origen,  te.nombre as destino, v.estado,
                        r.id as idruta, r.lugarorigen, r.lugardestino, r.dia, DATE_FORMAT(r.hora, "%H:%m") AS hora, r.duracion, 
                        concat(u.nombre,' ',u.apellido1,' ', u.apellido2) as editor, DATE_FORMAT(v.creado,"%Y-%m-%d") as creado,  DATE_FORMAT(v.modificado,"%Y-%m-%d") as modificado,
                        ve.id as idvehiculo, ti.tipo as vehiculo, ve.placa,  concat(us.nombre,' ',us.apellido1,' ', us.apellido2) as encargado
                        from viaje v
                        inner join vehiculo ve on ve.id = v.idvehiculo 
                        inner join tipo ti on ti.id = ve.idtipo
                        inner join usuario us on us.id= ve.idusuario
                        inner join  ruta r on r.id = v.idruta
                        inner join terminal t on t.id = r.origen
                        inner join terminal te on te.id = r.destino
                        inner join usuario u on u.id = v.usuario
                        where v.id = ${pool.escape(id)}`
        const [ruta] = await pool.query(sqlRuta)

        return ruta
    }



    // este vehiculo puede ser eliminado desde la secretaria y el usuario
    eliminar = async (datos) => {
        console.log(datos)
        const sql = `update viaje set eliminado = true , 
        modificado = ${pool.escape(datos.modificado)},
        usuario = ${pool.escape(datos.usuario)}
        WHERE id =  ${pool.escape(datos.id)}`;
        await pool.query(sql)
        return await this.listar(datos.empresa)
    }


    // listar los diferentes tipo de vehiculos para permitir registrar o modificar los registros de vehiculos, ej: bus, buscama, miniban etc, 
    // tambien se obtienen las capacidades del vehiculo inferior y superior

    // lista los usuarios que pertenecen a esa empresa con rol numero = 3 (chofer)
    listarRutas = async (empresa) => {
        const sqlVehiculo =
            `SELECT distinct(v.id), concat(u.nombre,' ',u.apellido1,' ',u.apellido2,' -> ',t.tipo ) as nombre
             from ruta r 
             inner join empresa e on e.id = r.idempresa
             inner join usuario u on e.id = u.idempresa
             inner join vehiculo v on u.id = v.idusuario 
             inner join tipo t on t.id = v.idtipo
             where r.idempresa = ${pool.escape(empresa)} and r.eliminado = false`;
        const [listaVehiculo] = await pool.query(sqlVehiculo)
        const sqlRuta =
            `SELECT r.id, concat(r.dia, ' ', DATE_FORMAT(r.hora,"%H:%m"),'   ', t.nombre, '->', te.nombre) as nombre from ruta r
                inner join terminal t on t.id = r.origen
                inner join terminal te on te.id = r.destino 
                where r.idempresa = ${pool.escape(empresa)} and r.eliminado = false`;
        const [listaRuta] = await pool.query(sqlRuta)

        return [listaRuta, listaVehiculo]
    }


    // esta operacion esta permitido solo para el rol secretaria, la placa es un atributo único
    insertar = async (datos, empresa) => {
        const sqlexisRuta =
            `SELECT id from viaje where
                idvehiculo = ${pool.escape(datos.idvehiculo)} and fecha = ${pool.escape(datos.fecha)} and idruta = ${pool.escape(datos.idruta)}
                and eliminado = false`;
        const [rows] = await pool.query(sqlexisRuta)
        if (rows.length === 0) {
            await pool.query("INSERT INTO viaje SET  ?", datos)
            return await this.listar(empresa)
        }
        else return { existe: 1 }
    }


    // la actualizacion de este registro se realiza desde el usuario y la secretaria

    actualizar = async (datos) => {
        // console.log(datos, 'estructura de datos')
        const sqlexisRuta =
            `SELECT * from viaje where
                estado = 0 and id =${pool.escape(datos.id)}`;
        const [rows] = await pool.query(sqlexisRuta)
        //el vehiculo ya esta prgramado para esa fecha
        if (rows.length === 0) {
            const sql = `UPDATE viaje SET
                idruta = ${pool.escape(datos.idruta)},
                idvehiculo = ${pool.escape(datos.idvehiculo)},
                fecha = ${pool.escape(datos.fecha)},
                modificado = ${pool.escape(datos.modificado)},
                usuario= ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.id)} and eliminado = false`;
            await pool.query(sql);
            return await this.listar(datos.empresa)
        } else return { existe: 1 }
    }

}
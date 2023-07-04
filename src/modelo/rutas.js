
import pool from './bdConfig.js'

export class Ruta {

    // METODOS

    // este metodo lista solo los vehiculos de una empresa en especifo 
    listar = async (idempresa) => {
        const sql =
            `select r.id, t.nombre as origen , te.nombre as destino, r.duracion, r.dia, DATE_FORMAT(r.hora, "%H:%m") as hora
            from ruta r
            inner join terminal t on r.origen = t.id
            inner join terminal te on r.destino = te.id
            inner join empresa e on e.id= r.idempresa 
            where e.id = ${pool.escape(idempresa)} and r.eliminado = false
             order by r.id desc LIMIT 8;`;
        const [rows] = await pool.query(sql)
        return rows
    }


    // los registros solo se pueden buscar desde el panel de la secretaria
    buscar = async (dato) => {
        // console.log('los datos han llegado', dato)
        const sql =
            `select r.id, t.nombre as origen , te.nombre as destino, r.duracion, r.dia, DATE_FORMAT(r.hora, "%H:%m") as hora
            from ruta r
            inner join terminal t on r.origen = t.id
            inner join terminal te on r.destino = te.id
            inner join empresa e on e.id= r.idempresa 
            where 
            r.dia like '${dato.dato}%' 
            and r.eliminado = false and r.idempresa = ${pool.escape(dato.empresa)}
            ORDER by r.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }


    listarSiguiente = async (id) => {
        const sql =
            `select r.id, t.nombre as origen , te.nombre as destino, r.duracion, r.dia, DATE_FORMAT(r.hora, "%H:%m") as hora
            from ruta r
            inner join terminal t on r.origen = t.id
            inner join terminal te on r.destino = te.id
            inner join empresa e on e.id= r.idempresa 
            where r.idempresa = ${pool.escape(id.idempresa)} and r.eliminado = false and r.id < ${pool.escape(id.id)} ORDER by r.id DESC limit 8`;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarAnterior = async (id) => {
        const sql =
            `select r.id, t.nombre as origen , te.nombre as destino, r.duracion, r.dia, DATE_FORMAT(r.hora, "%H:%m") as hora
            from ruta r
            inner join terminal t on r.origen = t.id
            inner join terminal te on r.destino = te.id
            inner join empresa e on e.id= r.idempresa 
            where idempresa = ${pool.escape(id.idempresa)} and r.eliminado = false and r.id > ${pool.escape(id.id)} limit 8`;
        const [rows] = await pool.query(sql)
        rows.reverse()
        return rows
    }


    // MUESTRA EL REGISTRO de los asientos del vehiculo
    ver = async (id) => {
        const sqlRuta = `select r.id, t.id as idorigen, t.nombre as origen, te.id as iddestino, te.nombre as destino,
                        r.lugarorigen, r.lugardestino, r.dia, DATE_FORMAT(r.hora, "%H:%m") AS hora, r.duracion, r.costo, 
                        concat(u.nombre,' ',u.apellido1,' ', u.apellido2) as editor, DATE_FORMAT(r.creado,"%Y-%m-%d") as creado,  DATE_FORMAT(r.modificado,"%Y-%m-%d") as modificado
                        from ruta r 
                        inner join terminal t on t.id = r.origen
                        inner join terminal te on te.id = r.destino
                        inner join empresa e on e.id = r.idempresa
                        left join usuario u on u.id = r.usuario
                        where r.id = ${pool.escape(id)}`
        const [ruta] = await pool.query(sqlRuta)

        return ruta
    }



    // este vehiculo puede ser eliminado desde la secretaria y el usuario
    eliminar = async (datos) => {
        console.log('eliminar veh ', datos)
        const sql = `update ruta set eliminado = true , 
        modificado = ${pool.escape(datos.modificado)},
        usuario = ${pool.escape(datos.usuario)}
        WHERE id =  ${pool.escape(datos.id)}`;
        await pool.query(sql)
        return await this.listar(datos.empresa)
    }


    // listar los diferentes tipo de vehiculos para permitir registrar o modificar los registros de vehiculos, ej: bus, buscama, miniban etc, 
    // tambien se obtienen las capacidades del vehiculo inferior y superior

    // lista los usuarios que pertenecen a esa empresa con rol numero = 3 (chofer)
    listarLugares = async () => {
        const sqlTipo =
            `SELECT id, nombre from terminal`;
        const [listaTipo] = await pool.query(sqlTipo)

        return listaTipo
    }


    // esta operacion esta permitido solo para el rol secretaria, la placa es un atributo único
    insertar = async (datos) => {
        const sqlexisRuta =
            `SELECT * from ruta where
                origen = ${pool.escape(datos.origen)} and destino = ${pool.escape(datos.destino)} 
                and lugarorigen = ${pool.escape(datos.lugarorigen)} and lugardestino = ${pool.escape(datos.lugardestino)} and
                dia = ${pool.escape(datos.dia)} and hora = ${pool.escape(datos.hora)} and idempresa = ${pool.escape(datos.idempresa)} and eliminado = false`;
        const [rows] = await pool.query(sqlexisRuta)
        if (rows.length === 0) {
            await pool.query("INSERT INTO ruta SET  ?", datos)
            return await this.listar(datos.idempresa)
        }
        else return { existe: 1 }
    }


    // la actualizacion de este registro se realiza desde el usuario y la secretaria

    actualizar = async (datos) => {
        const sqlexisRuta =
            `SELECT id from ruta where
                origen = ${pool.escape(datos.origen)} and destino = ${pool.escape(datos.destino)} 
                and lugarorigen = ${pool.escape(datos.lugarorigen)} and lugardestino = ${pool.escape(datos.lugardestino)} and 
                dia = ${pool.escape(datos.dia)} and hora = ${pool.escape(datos.hora)} and 
                id != ${pool.escape(datos.id)} and idempresa = ${datos.idempresa}  and eliminado = false`;
        const [rows] = await pool.query(sqlexisRuta)
        console.log(rows)
        if (rows.length === 0) {
            const sql = `UPDATE ruta SET
                origen = ${pool.escape(datos.origen)},
                destino = ${pool.escape(datos.destino)},
                lugarorigen = ${pool.escape(datos.lugarorigen)},
                lugardestino = ${pool.escape(datos.lugardestino)},
                idempresa = ${pool.escape(datos.idempresa)},
                duracion = ${pool.escape(datos.duracion)},
                dia = ${pool.escape(datos.dia)},
                hora = ${pool.escape(datos.hora)},
                costo = ${pool.escape(datos.costo)},
                modificado = ${pool.escape(datos.modificado)},
                usuario= ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.id)} and eliminado = false`;
            await pool.query(sql);
            return await this.ver(datos.id)
        } else return { existe: 1 }
    }

}

import pool from './bdConfig.js'

export class Vehiculo {

    // METODOS

    // este metodo lista solo los vehiculos de una empresa en especifo 
    listar = async (datos) => {
        const sql =
            `select v.id, t.tipo, e.nombre as empresa, concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as encargado,
            t.capacidad, v.placa, v.modelo, v.eliminado
            from vehiculo v 
            inner join usuario u on v.idusuario = u.id
            inner join empresa e on u.idempresa = e.id
            inner join  tipo t on v.idtipo = t.id
            where v.eliminado = false and e.id= ${pool.escape(datos.empresa)} order by v.id desc LIMIT 8;`;
        const [rows] = await pool.query(sql)
        return rows
    }
    listarReciclaje = async (datos) => {
        const sql =
            `select v.id, t.tipo, e.nombre as empresa, concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as encargado,
            t.capacidad, v.placa, v.modelo
            from vehiculo v 
            inner join usuario u on v.idusuario = u.id
            inner join empresa e on u.idempresa = e.id
            inner join  tipo t on v.idtipo = t.id
            where v.eliminado = true and e.id= ${pool.escape(datos.empresa)} ORDER by v.id DESC LIMIT 8;`;
        const [rows] = await pool.query(sql)
        // console.log(rows, 'lista')
        return rows
    }


    // los registros solo se pueden buscar desde el panel de la secretaria
    buscar = async (dato) => {
        // console.log('los datos han llegado', dato)
        const sql =
            `select v.id, t.tipo, e.nombre as empresa, concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as encargado,
            t.capacidad, v.placa, v.modelo, v.eliminado
            from vehiculo v 
            inner join usuario u on v.idusuario = u.id
            inner join empresa e on u.idempresa = e.id
            inner join  tipo t on v.idtipo = t.id
            where (u.nombre like '${dato.dato}%' or
            v.placa like '${dato.dato}%' or
            u.nombre like '${dato.dato}%' or
            u.apellido1  like '${dato.dato}%' or
            u.apellido2  like '${dato.dato}%') 
            and v.eliminado = false and e.id = ${pool.escape(dato.empresa)}
            ORDER by v.id DESC limit 8`;
        const [rows] = await pool.query(sql)
        return rows
    }

    // los registros solo se pueden buscar desde el panel de la secretaria

    buscarEliminado = async (dato) => {
        // console.log('los datos han llegado', dato)    
        const sql =
            `select v.id, t.tipo, e.nombre as empresa, concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as encargado,
            t.capacidad, v.placa, v.modelo, v.eliminado
            from vehiculo v 
            inner join usuario u on v.idusuario = u.id
            inner join empresa e on u.idempresa = e.id
            inner join  tipo t on v.idtipo = t.id
            where (u.nombre like '${dato.dato}%' or
            v.placa like '${dato.dato}%' or
            u.nombre like '${dato.dato}%' or
            u.apellido1  like '${dato.dato}%' or
            u.apellido2  like '${dato.dato}%') and v.eliminado = true and e.id = ${pool.escape(dato.empresa)}
            ORDER by v.id DESC limit 8`;
        const [rows] = await pool.query(sql)
        return rows
    }


    listarSiguiente = async (id) => {
        const sql =
            `select v.id, t.tipo, e.nombre as empresa, concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as encargado,
            t.capacidad, v.placa, v.modelo, v.eliminado
            from vehiculo v 
            inner join usuario u on v.idusuario = u.id
            inner join empresa e on u.idempresa = e.id
            inner join  tipo t on v.idtipo = t.id
            where v.eliminado = false and e.id = ${pool.escape(id.empresa)}
            and v.id < ${pool.escape(id.id)} ORDER by v.id DESC limit 8`;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarSiguienteEliminados = async (id) => {
        const sql =
            `select v.id, t.tipo, e.nombre as empresa, concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as encargado,
            t.capacidad, v.placa, v.modelo, v.eliminado
            from vehiculo v 
            inner join usuario u on v.idusuario = u.id
            inner join empresa e on u.idempresa = e.id
            inner join  tipo t on v.idtipo = t.id
            where v.eliminado = true and e.id = ${pool.escape(id.empresa)}
            and v.id < ${pool.escape(id.id)} ORDER by v.id DESC  limit 8`;
        const [rows] = await pool.query(sql)
        return rows
    }



    listarAnterior = async (id) => {
        const sql =
            `select v.id, t.tipo, e.nombre as empresa, concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as encargado,
            t.capacidad, v.placa, v.modelo, v.eliminado
            from vehiculo v 
            inner join usuario u on v.idusuario = u.id
            inner join empresa e on u.idempresa = e.id
            inner join  tipo t on v.idtipo = t.id
            where v.eliminado = false and e.id = ${pool.escape(id.empresa)}
            and v.id > ${pool.escape(id.id)} limit 8`;
        const [rows] = await pool.query(sql)
        rows.reverse()
        return rows
    }

    listarAnteriorEliminados = async (id) => {
        const sql =
            `select v.id, t.tipo, e.nombre as empresa, concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as encargado,
            t.capacidad, v.placa, v.modelo, v.eliminado
            from vehiculo v 
            inner join usuario u on v.idusuario = u.id
            inner join empresa e on u.idempresa = e.id
            inner join  tipo t on v.idtipo = t.id
            where v.eliminado = true and e.id = ${pool.escape(id.empresa)}
            and v.id > ${pool.escape(id.id)} limit 8`;
        const [rows] = await pool.query(sql)
        rows.reverse()
        return rows
    }



    // MUESTRA EL REGISTRO de los asientos del vehiculo
    ver = async (id) => {
        const sqlVehiculo = `select v.id, t.id as idtipo, t.numero,t.tipo,  v.idusuario, v.placa,
            v.modelo,t.capacidad
            from vehiculo v 
            inner join tipo t on t.id = v.idtipo
            where v.id = ${pool.escape(id)}`

        const [vehiculo] = await pool.query(sqlVehiculo)
        const sqlAsiento = `select  a.id as idasiento, a.numero as numeroAsiento, 
            au.id as idubicaicon, au.ubicacion, v.placa, t.tipo, t.numero, 
            t.capacidad
            from vehiculo v 
            inner join tipo t on t.id = v.idtipo
            left join asiento a on v.id = a.idvehiculo
            left join asientoubicacion au on a.	idasientoubi = au.id
            where v.id = ${pool.escape(id)} and a.eliminado = false`
        const [asiento] = await pool.query(sqlAsiento)

        return [vehiculo, asiento]
    }



    // este vehiculo puede ser eliminado desde la secretaria y el usuario
    eliminar = async (datos) => {
        console.log('eliminar veh ', datos)
        const sql = `update vehiculo set eliminado = true , 
        modificado = ${pool.escape(datos.modificado)},
        usuario = ${pool.escape(datos.usuario)}
        WHERE id =  ${pool.escape(datos.id)}`;
        await pool.query(sql)
        return await this.listar(datos)
    }
    // el vehiculo puede ser retaurado desde la secretaria y el usuario
    restaurar = async (datos) => {
        const sql = `update vehiculo set eliminado = false, 
        modificado = ${pool.escape(datos.modificado)} , usuario = ${pool.escape(datos.usuario)}
        WHERE id =  ${pool.escape(datos.id)}`;
        await pool.query(sql)
        return await this.listar(datos)
    }



    // listar los diferentes tipo de vehiculos para permitir registrar o modificar los registros de vehiculos, ej: bus, buscama, miniban etc, 
    // tambien se obtienen las capacidades del vehiculo inferior y superior

    // lista los usuarios que pertenecen a esa empresa con rol numero = 3 (chofer)
    listarTipo = async (idempresa) => {
        const sqlPersonal =
            `SELECT u.id as id, concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as nombre  from usuario u
            inner join empresa e on e.id = u.idempresa
            inner join rol r on r.id = u.idrol
            where e.id = ${pool.escape(idempresa)} and r.numero = 3 and u.eliminado = false
              `;
        const [listaPersonal] = await pool.query(sqlPersonal)

        const sqlTipo =
            `SELECT id, tipo as nombre, capacidad from tipo`;
        const [listaTipo] = await pool.query(sqlTipo)

        return [listaPersonal, listaTipo]
    }


    // esta operacion esta permitido solo para el rol secretaria, la placa es un atributo único
    insertar = async (datos, empresa) => {
        const sqlexisteusername =
            `SELECT placa from vehiculo where
                placa = ${pool.escape(datos.placa)} and eliminado = false`;
        const [rows] = await pool.query(sqlexisteusername)
        if (rows.length === 0) {
            await pool.query("INSERT INTO vehiculo SET  ?", datos)
            const dato = { empresa }
            return await this.listar(dato)
        }
        else return { existe: 1 }
    }

























    // la actualizacion de este registro se realiza desde el usuario y la secretaria

    actualizar = async (datos) => {
        const sqlExists = `SELECT * FROM vehiculo WHERE 
            placa = ${pool.escape(datos.placa)} 
            and id !=${pool.escape(datos.id)} and eliminado = false `;
        const [result] = await pool.query(sqlExists)
        if (result.length === 0) {
            const sql = `UPDATE vehiculo SET
                idusuario = ${pool.escape(datos.idusuario)},
                placa = ${pool.escape(datos.placa)},
                modelo = ${pool.escape(datos.modelo)},
                modificado = ${pool.escape(datos.modificado)},
                usuario= ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.id)} and eliminado = false`;
            await pool.query(sql);
            return await this.ver(datos.id)
        } else return { existe: 1 }
    }


    // luego de reconfigirar vehiculo, debera volver a registrar los asientos
    reConfigurar = async (datos) => {

        const sql = `UPDATE vehiculo SET
                idtipo = ${pool.escape(datos.idtipo)},
                modificado = ${pool.escape(datos.modificado)},
                usuario= ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.idvehiculo)} and eliminado = false`;
        const [res] = await pool.query(sql);
        // console.log(res.affectedRows, 'numero de filas  del vehiculo afectados')
        if (res.affectedRows > 0) {
            const sql = `UPDATE asiento SET
                eliminado = true,
                modificado = ${pool.escape(datos.modificado)},
                usuario= ${pool.escape(datos.usuario)}
                WHERE idvehiculo = ${pool.escape(datos.idvehiculo)} and eliminado = false`;
                await pool.query(sql);
        }
        return await this.ver(datos.idvehiculo)
    }




}
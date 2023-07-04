
import pool from './bdConfig.js'

export class Vehiculo {

    // METODOS

    // este metodo lista solo los vehiculos de una empresa en especifo 
    listar = async (datos) => {
        const sql =
            `select v.id, t.tipo, o.lugar, concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as encargado,
            v.capacidad, v.placa, v.modelo, v.eliminado
            from vehiculo v 
            inner join usuario u on v.idusuario = u.id
            inner join oficina o on o.id = u.idoficina
            inner join empresa e on e.id = o.idempresa
            inner join  tipo t on v.idtipo = t.id
            where v.eliminado = false and e.id= ${pool.escape(datos.empresa)} order by v.id desc LIMIT 8;`;
        const [rows] = await pool.query(sql)
        return rows
    }


    buscar = async (dato) => {
        // console.log('los datos han llegado', dato)
        const sql =
            `select v.id, t.tipo,o.lugar,  concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as encargado,
            v.capacidad, v.placa, v.modelo, v.eliminado
            from vehiculo v 
            inner join usuario u on v.idusuario = u.id
            inner join oficina o on o.id = u.idoficina
            inner join empresa e on e.id = o.idempresa
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




    listarSiguiente = async (id) => {
        const sql =
            `select v.id, t.tipo,o.lugar, concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as encargado,
            v.capacidad, v.placa, v.modelo, v.eliminado
            from vehiculo v 
            inner join usuario u on v.idusuario = u.id
            inner join oficina o on o.id = u.idoficina
            inner join empresa e on e.id = o.idempresa
            inner join  tipo t on v.idtipo = t.id
            where v.eliminado = false and e.id = ${pool.escape(id.empresa)}
            and v.id < ${pool.escape(id.id)} ORDER by v.id DESC limit 8`;
        const [rows] = await pool.query(sql)
        return rows
    }




    listarAnterior = async (id) => {
        const sql =
            `select v.id, t.tipo, o.lugar,  concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as encargado,
            v.capacidad, v.placa, v.modelo, v.eliminado
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


    // MUESTRA EL REGISTRO de los asientos del vehiculo
    ver = async (id) => {
        const sqlVehiculo = `select v.id, t.id as idtipo, t.numero, t.tipo,  v.idusuario, v.placa,
            v.modelo,v.capacidad,v.filas, v.columnas
            from vehiculo v 
            inner join tipo t on t.id = v.idtipo
            where v.id = ${pool.escape(id)}`

        const [vehiculo] = await pool.query(sqlVehiculo)
        const sqlAsiento = `select  a.id as idasiento, a.numero as numeroAsiento,  
            au.id as idubicaicon, au.ubicacion, v.placa, t.tipo, t.numero, x,y,
            v.capacidad
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



    listarTipo = async (idempresa) => {
        const sqlPersonal =
            `SELECT u.id as id, concat(u.nombre,' ',u.apellido1,' ',u.apellido2) as nombre  from usuario u
            inner join oficina o on o.id = u.idoficina
            inner join empresa e on e.id = o.idempresa
            inner join rol r on r.id = u.idrol
            where e.id = ${pool.escape(idempresa)} and r.numero = 3 and u.eliminado = false
              `;
        const [listaPersonal] = await pool.query(sqlPersonal)

        const sqlTipo =
            `SELECT id, tipo as nombre from tipo`;
        const [listaTipo] = await pool.query(sqlTipo)

        return [listaPersonal, listaTipo]
    }


    // esta operacion esta permitido solo para el rol secretaria, la placa es un atributo único
    insertar = async (datos, empresa) => {
        const sqlexisteusername =
            `SELECT v.placa from vehiculo v
            inner join usuario u on o.id = v.idusuario
            inner join oficina o on o.id = u.idoficina
            inner join empresa e on e.id = o.idempresa
            where
                v.placa = ${pool.escape(datos.placa)} and e.id = ${pool.escape(empresa)} v.eliminado = false`;
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
        const sqlExists = `SELECT * FROM vehiculo v
            inner join usuario u on o.id = v.idusuario
            inner join oficina o on o.id = u.idoficina
            inner join empresa e on e.id = o.idempresa
            WHERE 
            v.placa = ${pool.escape(datos.placa)} and e.id = ${pool.escape(datos.empresa)}
            and v.id !=${pool.escape(datos.id)} and v.eliminado = false `;
        const [result] = await pool.query(sqlExists)
        if (result.length === 0) {
            const sql = `UPDATE vehiculo SET
                idusuario = ${pool.escape(datos.idusuario)},
                placa = ${pool.escape(datos.placa)},
                modelo = ${pool.escape(datos.modelo)},
                capacidad = ${pool.escape(datos.capacidad)},
                filas = ${pool.escape(datos.fil)},
                columnas = ${pool.escape(datos.col)},
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
                filas = ${pool.escape(datos.fil)},
                columnas = ${pool.escape(datos.col)},
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
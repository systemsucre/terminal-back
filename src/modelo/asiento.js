
import pool from './bdConfig.js'

export class Asiento {

    // METODOS

    // este metodo metodo lista todos los asientos del vehiculo, parametro idVehiculo
    listar = async (idvehiculo) => {
        const sql =
            `select  a.id as idasiento, a.numero as numeroAsiento, 
            au.id as idubicaicon, au.ubicacion, v.placa, t.tipo, t.numero, 
            t.capacidad
            from vehiculo v 
            inner join tipo t on t.id = v.idtipo
            left join asiento a on v.id = a.idvehiculo
            left join asientoubicacion au on a.	idasientoubi = au.id
            where v.id = ${pool.escape(idvehiculo)} and a.eliminado = false`;
        const [rows] = await pool.query(sql)
        return rows
    }


    // MUESTRA EL REGISTRO de los asientos del vehiculo
    ver = async (id) => {
        const sqlUser = `select a.id, a.numero, au.id as idubicaicon, au.ubicacion, v.placa, t.tipo, t.capacidad
            from vehiculo v 
            inner join tipo t on t.id = v.idtipo
            left join asiento a on v.id = a.idvehiculo
            left join asientoubicacion au on a.	idasientoubi = au.id
            where v.id = ${pool.escape(id)}`

        const [result] = await pool.query(sqlUser)
        console.log(result)
        return result
    }







    // listar los diferentes tipo de vehiculos para permitir registrar o modificar los registros de vehiculos, ej: bus, buscama, miniban etc, 
    // tambien se obtienen las capacidades del vehiculo inferior y superior

    // lista la ubicacion donde se registraran los asientos
    listarAsientoUbicacion = async (idempresa) => {
        const sqlPersonal =
            `SELECT id, ubicacion as nombre from asientoubicacion  `;
        const [listaPersonal] = await pool.query(sqlPersonal)

        return listaPersonal
    }



    // esta operacion esta permitido solo para el rol secretaria, el numero asiento dentro de un vehiculo es un valor único
    insertar = async (datos, capacidad) => {
        const sqlexisteusername =
            `SELECT numero from asiento 
                where idvehiculo = ${pool.escape(datos.idvehiculo)} and numero = ${pool.escape(datos.numero)} and eliminado = false`;
        const [rows] = await pool.query(sqlexisteusername)
        if (rows.length === 0) {
            const sqlcantidad =
                `SELECT count(a.id) as cantidad from asiento a
                inner join vehiculo v on a.idvehiculo = v.id 
                where v.id = ${pool.escape(datos.idvehiculo)} and a.eliminado = false`;
            const [cantidad] = await pool.query(sqlcantidad)
            console.log(cantidad[0].cantidad, capacidad, 'capacidad ')
            if (cantidad[0].cantidad <= capacidad) {
                await pool.query("INSERT INTO asiento SET  ?", datos)
                return await this.listar(datos.idvehiculo)
            } else return { existe: 2 }
        } else return { existe: 1 }
    }
    // este registro ser eliminado desde la secretaria y el usuario
    eliminar = async (datos) => {
        const sql = `update asiento set eliminado = true , 
        modificado = ${pool.escape(datos.modificado)},
        usuario = ${pool.escape(datos.usuario)}
        WHERE numero =  ${pool.escape(datos.numero)} and idvehiculo = ${pool.escape(datos.idvehiculo)}`;
        await pool.query(sql)
        return await this.listar(datos.idvehiculo)
    }
}
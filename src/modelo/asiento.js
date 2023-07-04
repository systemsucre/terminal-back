
import pool from './bdConfig.js'

export class Asiento {

    // METODOS

    // este metodo metodo lista todos los asientos del vehiculo, parametro idVehiculo
    listar = async (idvehiculo) => {
        const sql =
            `select  a.id as idasiento, a.numero as numeroAsiento, x,y,
             v.placa, t.tipo, t.numero,  
            v.capacidad
            from vehiculo v 
            inner join tipo t on t.id = v.idtipo
            left join asiento a on v.id = a.idvehiculo
            where v.id = ${pool.escape(idvehiculo)} and a.eliminado = false`;
        const [rows] = await pool.query(sql)
        return rows
    }


    // esta operacion esta permitido solo para el rol secretaria, el numero asiento dentro de un vehiculo es un valor único
    insertar = async (datos) => {
        const sqlexisteusername =
            `SELECT numero from asiento 
                where idvehiculo = ${pool.escape(datos.idvehiculo)} and numero = ${pool.escape(datos.numero)} and eliminado = false`;
        const [rows] = await pool.query(sqlexisteusername)
        if (rows.length === 0) {
            await pool.query("INSERT INTO asiento SET  ?", datos)
            return await this.listar(datos.idvehiculo)
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
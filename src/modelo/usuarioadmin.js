
import pool from './bdConfig.js'

export class UsuarioEmpresa {

    // METODOS

    listar = async (id) => {
        const sql =
            `SELECT u.id, u.username, u.ci, u.nombre,
            u.apellido1,
            u.apellido2,u.celular, u.direccion
            from usuario u inner join rol on rol.id = u.idrol
            inner join oficina o on o.id = u.idoficina
            where u.eliminado = false and rol.numero = 2  and o.idempresa = ${pool.escape(id.empresa)}
            ORDER by u.id DESC limit 8 ;`;
        const [rows] = await pool.query(sql)
        return rows
    }

    buscar = async (dato) => {
        // console.log('los datos han llegado', dato)
        const sql =
            `SELECT u.id, u.username, u.ci, u.nombre,
            u.apellido1,
            u.apellido2,u.celular, u.direccion
            inner join oficina o on o.id = u.idoficina
            from usuario u inner join rol on rol.id = u.idrol
            where (u.nombre like '${dato.dato}%' or
            u.ci like '${dato.dato}%' or
            u.apellido1  like '${dato.dato}%' or
            u.apellido2  like '${dato.dato}%') and u.eliminado = false and rol.numero = 2  and  o.idempresa = ${pool.escape(dato.empresa)}
            ORDER by id`;
        const [rows] = await pool.query(sql)
        return rows
    }



    listarSiguiente = async (id) => {
        const sql =
            `SELECT u.id, u.username, u.ci, u.nombre,
            u.apellido1,
            u.apellido2,u.celular, u.direccion
            from usuario u inner join rol on rol.id = u.idrol
            inner join oficina o on o.id = u.idoficina
            where u.eliminado = false and rol.numero = 2 and  o.idempresa = ${pool.escape(id.empresa)}
            and u.id < ${pool.escape(id.id)} ORDER by u.id DESC  limit 10`;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarAnterior = async (id) => {
        const sql =
            `SELECT u.id, u.username, u.ci, u.nombre,
            u.apellido1,
            u.apellido2,u.celular, u.direccion
            from usuario u inner join rol on rol.id = u.idrol
            inner join oficina o on o.id = u.idoficina
            where u.eliminado = false and rol.numero = 2 and o.idempresa = ${pool.escape(id.empresa)}
            and u.id > ${pool.escape(id.id)} limit 10`;
        const [rows] = await pool.query(sql)
        rows.reverse()
        return rows
    }

    recet = async (datos) => {
        const sqlExists = `delete from sesion where
            idusuario = ${pool.escape(datos.id)}`;
        await pool.query(sqlExists)

        const sql = `UPDATE usuario SET
                pass = ${pool.escape(datos.pass1)},
                usuario = ${pool.escape(datos.usuario)},
                modificado = ${pool.escape(datos.fecha)}
                WHERE id = ${pool.escape(datos.id)} and eliminado = false`;

        await pool.query(sql);
        return true
    }
    ver = async (id) => {
        let sqlUser = null
        // console.log(id, 'modelo dell negocio')

        sqlUser = `select u.id, u.nombre, u.apellido1, 
            u.apellido2,u.username, u.ci,u.creado, u.modificado, 
            concat(usuario.nombre,' ', usuario.apellido1,' ', usuario.apellido2) as creador, 
            u.direccion, u.celular, DATE_FORMAT(u.creado, "%Y-%m-%d" ) as fechacreacion,
            DATE_FORMAT(u.modificado, "%Y-%m-%d") as fechamodificado, o.id as idoficina,
            o.lugar as oficina,

            r.id as idRol, r.rol as rol 
            
            from usuario u
            left join rol r on r.id = u.idrol
            inner join oficina o on o.id = u.idoficina
            left join usuario on usuario.id =u.usuario
            
            where u.id = ${pool.escape(id)}`

        const [result] = await pool.query(sqlUser)
        return result
    }

    oficina = async (empresa) => {
        const sql =
            `SELECT id as id, lugar as nombre from oficina where idempresa =${pool.escape(empresa)} and eliminado = false`;
        const [rows] = await pool.query(sql)
        const sqlR =
        `SELECT id as id, rol as nombre from rol where numero = 2`;
    const [rowsR] = await pool.query(sqlR)

        return [rows, rowsR]
    }


    eliminar = async (datos) => {
        console.log('eliminar usuario ',datos )
        const sql = `update usuario set eliminado = true , modificado = ${pool.escape(datos.modificado)}, usuario = ${pool.escape(datos.usuario)}
        WHERE id =  ${pool.escape(datos.id)}`;
        await pool.query(sql)
        return await this.listar(datos)
    }





    insertarSecretaria = async (datos, empresa) => {
        const sqlexisteusername =
            `SELECT username from usuario where
                username = ${pool.escape(datos.username)}`;
        const [rows] = await pool.query(sqlexisteusername)

        if (rows.length === 0) {
            const sqlexisteCi =
                `SELECT ci from usuario where
                ci = ${pool.escape(datos.ci)}`;
            const [rowsCi] = await pool.query(sqlexisteCi)
            if (rowsCi.length === 0) {
                await pool.query("INSERT INTO usuario SET  ?", datos)
                return await this.listar({empresa})
            } else return { existe: 2 }
        }
        else return { existe: 1 }
    }
    
    actualizarSecretaria = async (datos) => {
        const sqlExists = `SELECT * FROM usuario WHERE 
            ci = ${pool.escape(datos.ci)} 
            and id !=${pool.escape(datos.id)}`;
        const [result] = await pool.query(sqlExists)
        if (result.length === 0) {

            const sql = `UPDATE usuario SET
                idoficina = ${pool.escape(datos.idoficina)},
                nombre = ${pool.escape(datos.nombre)},
                apellido1 = ${pool.escape(datos.apellido1)},
                apellido2 = ${pool.escape(datos.apellido2)},
                ci = ${pool.escape(datos.ci)},
                celular= ${pool.escape(datos.celular)},
                direccion =${pool.escape(datos.direccion)},
                modificado =${pool.escape(datos.fecha)},
                usuario = ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.id)} and eliminado = false`;
            await pool.query(sql);
            return await this.ver(datos.id)
        } else return { existe: 1 }
    }



    cambiarMiContraseña = async (datos) => {
        const sqlExists = `SELECT * FROM usuario WHERE 
            pass = ${pool.escape(datos.pass1)} 
            and id = ${pool.escape(datos.usuario)}`;
        const [result] = await pool.query(sqlExists)

        if (result.length > 0) {

            const sql = `UPDATE usuario SET
                pass = ${pool.escape(datos.pass2)}
                WHERE id = ${pool.escape(datos.usuario)}`;

            await pool.query(sql);
            return true

        } else return false
    }

    actualizarMiPerfil = async (datos) => {
        const sqlExists = `SELECT * FROM usuario WHERE 
            ci = ${pool.escape(datos.ci)} 
            and id !=${pool.escape(datos.usuario)}`;
        const [result] = await pool.query(sqlExists)
        if (result.length === 0) {

            const sql = `UPDATE usuario SET
                nombre = ${pool.escape(datos.nombre)},
                apellido1 = ${pool.escape(datos.apellido1)},
                apellido2 = ${pool.escape(datos.apellido2)},
                ci = ${pool.escape(datos.ci)},
                celular= ${pool.escape(datos.telefono)}
                WHERE id = ${pool.escape(datos.usuario)}`;
            await pool.query(sql);
            return await this.miPerfil(datos.usuario)
        } else return { existe: 1 }
    }

    miPerfil = async (id) => {
        const sql =
            `SELECT u.nombre, u.apellido1, u.apellido2, u.ci,  u.celular as telefono,
            u.username,r.rol as rol, u.pass, concat(p.nombre, p.apellido1, p.apellido2) as usuario,
            DATE_FORMAT(u.creado, "%Y-%m-%d") as creado, DATE_FORMAT(u.modificado, "%Y-%m-%d") as modificado
                     from usuario u
                     left join usuario p on p.id = u.usuario
                     left join rol r on u.idrol = r.id
                     where u.id = ${pool.escape(id)}
                     `;
        const [rows] = await pool.query(sql)
        return rows
    }

}
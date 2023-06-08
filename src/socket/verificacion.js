import pool from '../modelo/bdConfig.js'

export const verificacion = async (token, room) => {

    try {
        if (token !== 'undefined') {

            const sql = `SELECT idusuario,rol, empresa from sesion 
                where token  = ${pool.escape(token)} and empresa = ${pool.escape(room)}`;

            const [result] = await pool.query(sql)

            if (result.length > 0) {

                return [true, result[0].idusuario, result[0].rol, result[0].empresa]
            }
            else {
                const sql = `delete from sesion
                where token  = ${pool.escape(token)}`;
                await pool.query(sql)
                return [false]
            }
        }
        else return [false]
    } catch (error) {
        console.log(error)
        return [false]
    }
}

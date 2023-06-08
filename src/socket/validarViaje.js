const INPUT = {
    INPUT_BUSCAR: /^[()/a-zA-Z Ññ0-9_-]{1,400}$/,
    NIT: /^[()/a-zA-Z Ññ0-9_-]{6,20}$/,
    INPUT_USUARIO: /^[a-zA-ZÑñ]{4,16}$/, // Letras, numeros, guion y guion_bajo
    PASSWORD: /^.{4,12}$/, // 4 a 12 digitos.
    NOMBRE_PERSONA: /^[a-zA-ZÑñ ]{2,30}$/,
    // CI: /^\d{7,10}$/,
    CI: /^\d{5,10}((\s|[-])\d{1}[A-Z]{1})?$/,
    PLACA: /^\d{3,5}[-][A-Z]{3}?$/,
    DIRECCION: /^[a-zA-ZÑñ /0-9-@+]{2,30}$/,
    CLASIFICACION: /^.{4,200}$/,
    SEGURO: /^[a-zA-ZÑñ ]{2,50}$/,
    CODIGO: /^[-_a-zA-ZÑñ0-9 ]{2,20}$/,
    TELEFONO: /^\d{5,10}$/, // 7 a 10 numeros.
    CUENTA: /^\d{5,30}$/, // 7 a 10 numeros.
    ID: /^\d{1,10}$/, // id de redes, 1 a 4 digitos
    FECHA: /\d{4}[-]\d{2}[-]\d{2}/,
    MES: /\d{4}[-]\d{2}/,
    HORA: /\d{2}[:]\d{2}/,
    SEXO: /^[FMfm]{1}$/,
    SEXO3: /^[FMfmTt]{1}$/,
    NHC: /^\d{1,10}$/,
    EDAD: /^\d{1,3}$/, // id de redes, 1 a 4 digitos
    DIAGNOSTICO: /^.{8,200}$/,
    TEXT: /^.{1,200}$/,
    NUMEROS: /^-?\d+([.]\d+)?(?:[Ee][-+]?\d+)?$/,   // /^[0-9]+([.][0-9]+)?$/,  //NUMEROS ENTEROS MAS NUMEROS REALES, negativos, mas notacion cientifica (ej: 1.2e+05)   /^-?\d+([.]\d+)?(?:[Ee][-+]?\d+)?$/ 
    NUMEROS_PN: /^-?\d*(\.\d+)?$/,   // /^[0-9]+([.][0-9]+)?$/,  //NUMEROS ENTEROS MAS NUMEROS REALES, negativos, mas notacion cientifica (ej: 1.2e+05)   /^-?\d+([.]\d+)?(?:[Ee][-+]?\d+)?$/ 
    NUMEROS_P: /^[0-9]{1,20}$/,   // números enteros positivos 
    CORREO: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
    IMG: /.jpg|.jpeg|.png/i,
    DATETIME: /^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/
}

export const insertarViaje = async (data) => {

    if (INPUT.ID.test(data.idruta) && INPUT.ID.test(data.idvehiculo) && INPUT.FECHA.test(data.fecha) && INPUT.DATETIME.test(data.creado)) return true 
    else return false

}

export const actualizarViaje = async (data) => {

    if (INPUT.ID.test(data.id) && INPUT.ID.test(data.idruta) && INPUT.ID.test(data.idvehiculo) && INPUT.FECHA.test(data.fecha) && INPUT.DATETIME.test(data.modificado))  return true 
    else return false

}

export const eliminarViaje = async (data) => {
    if (INPUT.ID.test(data.id) && INPUT.DATETIME.test(data.fecha))  return true 
    else return false

}
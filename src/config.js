import {config} from 'dotenv'
config()

export const PORT = process.env.PORT || 3001

// export const DB_HOST = process.env.DB_HOST || 'mysql-systemsucre.alwaysdata.net';
// export const DB_USER = process.env.DB_USER || '312607_gust';
// export const DB_PASSWORD = process.env.DB_PASSWORD || '13616192Ch';
// export const DB_DATABASE = process.env.DB_DATABASE || 'systemsucre_bsch';
// export const DB_PORT = process.env.DB_PORT || 3306;
// export const KEY = process.env.KEY || 'KEY2023'
// export const CLAVEGMAIL = process.env.CLAVEGMAIL || 'frqhuvfcwdccomfh'

export const DB_HOST = process.env.DB_HOST ;
export const DB_USER = process.env.DB_USER ;
export const DB_PASSWORD = process.env.DB_PASSWORD ;
export const DB_DATABASE = process.env.DB_DATABASE ;
export const DB_PORT = process.env.DB_PORT;
export const KEY = process.env.KEY 
export const CLAVEGMAIL = process.env.CLAVEGMAIL




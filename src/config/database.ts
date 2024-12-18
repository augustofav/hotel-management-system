import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL, 
  waitForConnections: true,
  connectionLimit: 10,
})


pool.getConnection()
  .then(() => {
    console.log('Conectado à Base de Dados com sucesso!')
  })
  .catch((err) => {
    console.error('Erro ao conectar à Base de Dados:', err)
  })


export const db = {
  query: async (text: string, params?: any[]) => {
    const [rows] = await pool.execute(text, params)
    return rows
  },
  querys: async (text: string) => {
    const [rows] = await pool.query(text)
    return rows
  },
}

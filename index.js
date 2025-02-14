require("dotenv").config(); // Cargas la configuracion de variables de entorno

const { neon } = require("@neondatabase/serverless"); // Trae la instancia de Neon

const express = require('express')//Trae instancia de express
const app = express()//Configura Express
const port = 3000//Define puerto
const sql = neon(process.env.DATABASE_URL);// Se crea la coneccion con Neon


app.get('/', async (req, res) => {
    const result = await sql`SELECT version()`; //Se ejecuta la consulta SQL
    const { version } = result[0]; // Obtengo el resultado
  res.send('Hello World! :: ' + version)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/tabla', async (req, res) => {
    try {
      const result = await sql`SELECT * FROM mi_tare`; 

      res.json(result);
    } catch (error) {
      console.error('Error al obtener datos:', error);

      res.status(500).json({ error: 'Error en el servidor' });
    }
  })

const express = require('express')
const { MongoClient } = require('mongodb')

const dbUrl = 'mongodb+srv://admin:u63Z5pHOESVXRfJ2@cluster0.p65w4up.mongodb.net'
const dbName = 'OceanJornadaBackendFev2024'


async function main() {
  const client = new MongoClient(dbUrl)

  console.log('Conectando ao banco de dados...')
  await client.connect()
  console.log('Banco de dados conectado com sucesso!')

  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello, World!')
  })

  app.get('/oi', function (req, res) {
    res.send('Olá, mundo!')
  })

  // Lista de Personagens
  const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']
  //              0               1              2

  const db = client.db(dbName)
  const collection = db.collection('items')

  // Read All -> [GET] /item
  app.get('/item', function (req, res) {
    collection.find().toArray()

    // Envio todos os documentos como resposta HTTP
    res.send(items)
  })

  // Read By ID -> [GET] /item/:id
  app.get('/item/:id', function (req, res) {
    // Acesso o ID no parâmetro de rota
    const id = req.params.id

    // Acesso item na lista baseado no ID recebido
    const item = lista[id]

    // Envio o item obtido como resposta HTTP
    res.send(item)
  })

  // Sinalizamos que o corpo da requisição está em JSON
  app.use(express.json())

  // Create -> [POST] /item
  app.post('/item', function (req, res) {
    // Extraímos o corpo da requisição
    const body = req.body

    // Pegamos o nome (string) que foi enviado dentro do corpo
    const item = body.nome

    // Colocamos o nome dentro da lista de itens
    lista.push(item)

    // Enviamos uma resposta de sucesso
    res.send('Item adicionado com sucesso!')
  })

  app.listen(3000)
}

main()

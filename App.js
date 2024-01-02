const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const cors = require('cors')

app.use(cors());


// WELLCOME TO MLBB API
app.get('/', (req, res) => {
  const data = {
    message: 'Welcome to MLBB API!'
  }
  res.json(data)
})

// GET ALL HEROES
app.get('/mobile-legends/hero', async (req, res) => {

  try {
    const response = await axios.get('https://raw.githubusercontent.com/p3hndrx/MLBB-API/main/v1/hero-meta-final.json')
    const data = response.data
    res.json(data)
  } catch (error) {
    console.error('Error fetching JSON:', error.message);
    res.status(500).json({ error: 'Internal Server Error' })
  }
  
})

// BY UID
app.get('/mobile-legends/hero/:id', async (req, res) => {
   const { id } = req.params
   try {
    const response = await axios.get(`https://raw.githubusercontent.com/p3hndrx/MLBB-API/main/v1/hero-meta-final.json`)
    const data = response.data
    const heroes = data.data
    const hero = heroes.find(hero => hero.mlid === id)
    res.json(hero)

   } catch (error) {
    console.error('Error fetching JSON:', error.message);
    res.status(500).json({ error: 'Internal Server Error' })
   }
})

// BY ROLE
app.get('/mobile-legends/role/:role', async (req, res) => {
    const { role } = req.params

    try {
        const response = await axios.get('https://raw.githubusercontent.com/p3hndrx/MLBB-API/main/v1/hero-meta-final.json')
        const data = response.data
        const heroes = data.data
        const filteredHeroes = heroes.filter(hero => hero.class === role.charAt(0).toUpperCase() + role.slice(1))
        res.json(filteredHeroes)
    } catch (error) {
        console.error('Error fetching JSON:', error.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// BY LANING
app.get('/mobile-legends/laning/:laning', async (req, res) => {
    const { laning } = req.params

    try {
        const response = await axios.get('https://raw.githubusercontent.com/p3hndrx/MLBB-API/main/v1/hero-meta-final.json')
        const data = response.data
        const heroes = data.data
        const filteredHeroes = heroes.filter(hero => hero.laning.includes(laning))

        res.json(filteredHeroes)

    } catch (error) {
        console.error('Error fetching JSON:', error.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
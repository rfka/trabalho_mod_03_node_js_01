const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const rotasFavMovies = require('./routers/app.rotas.js');
app.use('/favMovies', rotasFavMovies);

app.get('/', (req, res) => {
    res.send('acesso base back-end App FavMovies!!');
});


const port = 3000;
app.listen(port, () => {
    console.log(`O servidor da aplicação está rodando em: http://localhost:${port}`);
});
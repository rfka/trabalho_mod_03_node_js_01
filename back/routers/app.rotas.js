const express = require('express');
const router = express.Router();


const atualizado = 'Filme Atualizado!!';
const excluido = 'Filme Excluído!!';

const Movies = [
  {
    nome: 'Minions',
    genero: 'Animação',
    nota: 10,
    urlImagem:
      'https://upload.wikimedia.org/wikipedia/pt/f/f1/Minions_2-_The_Rise_of_Gru_poster.jpeg',
    id: Date.now(),
  },
  {
    nome: 'Minions 2',
    genero: 'Animação',
    nota: 10,
    urlImagem:
      'https://upload.wikimedia.org/wikipedia/pt/f/f1/Minions_2-_The_Rise_of_Gru_poster.jpeg',
    id: Date.now(),
  },
  {
    nome: 'Minions 3',
    genero: 'Animação',
    nota: 10,
    urlImagem:
      'https://upload.wikimedia.org/wikipedia/pt/f/f1/Minions_2-_The_Rise_of_Gru_poster.jpeg',
    id: Date.now(),
  },
  {
    nome: 'Minions 4',
    genero: 'Animação',
    nota: 10,
    urlImagem:
      'https://upload.wikimedia.org/wikipedia/pt/f/f1/Minions_2-_The_Rise_of_Gru_poster.jpeg',
    id: Date.now(),
  },
];

const getMoviesValidos = () => Movies.filter(Boolean);

const getMovieIndexById = (id) =>
  getMoviesValidos().findIndex((movie) => movie.id == id);

router.get('/', (req, res) => {
  if (Movies.length == 0) {
    res.send('Nenhum filme cadastrado!!');
    return;
  }

  res.send(Movies);
});

router.get('/:id', (req, res) => {
  const idP = req.params.id;
  const index = Movies.findIndex((movie) => movie.id == idP);
  const movie = Movies[index];

  if (!movie) {
    console.log(404);
    res.status(404).send('Desculpe, não localizei nenhum filme!!');
    return;
  }

  res.send(movie);
});

router.post('/add', (req, res) => {
  const movie = req.body;
  movie.id = Date.now();

  if (
    !movie || !movie.nome || !movie.genero || !movie.nota || !movie.urlImagem) {
    console.log(400);
    res.status(400).send('Má Solicitação, rsrsrs!!!');
  } else {
    Movies.push(movie);
  }
  console.log(201);
  res.status(201).send(movie);
});

router.put('/:id', (req, res) => {
  const novoMovie = req.body;
  const id = req.params.id;
  let movieExistente = Movies.find((movie) => movie.id == id);

  movieExistente.nome = novoMovie.nome;
  movieExistente.genero = novoMovie.genero;
  movieExistente.nota = novoMovie.nota;
  movieExistente.urlImagem = novoMovie.urlImagem;

  if (!Object.keys(novoMovie).length) {
    console.log(400);
    res.status(400).send('Má Solicitação, rsrsrs!!!');
    return;
  }

  if (
    !novoMovie || !novoMovie.nome || !novoMovie.genero || !novoMovie.nota || !novoMovie.urlImagem) {
    console.log(400);
    res.status(400).send('Má Solicitação, rsrsrs!!!');
    return;
  }

  res.send(atualizado);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex < 0) {
    res.status(404).send('Desculpe, não localizei nenhum filme!!');
    return;
  }

  Movies.splice(movieIndex, 1);

  res.send(excluido);
});

module.exports = router;
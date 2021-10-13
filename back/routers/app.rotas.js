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
    id: 1,
  },
  {
    nome: 'Uma Aventura Lego',
    genero: 'Animação',
    nota: 10,
    urlImagem:
      'https://upload.wikimedia.org/wikipedia/pt/4/40/The_Lego_Movie.jpg',
    id: 2,
  },
  {
    nome: 'Meu Primeiro Amor',
    genero: 'Drama',
    nota: 10,
    urlImagem:
      'https://upload.wikimedia.org/wikipedia/pt/2/2a/My_Girl_%28filme%29.jpg',
    id: 3,
  },
  {
    nome: 'Bastardos Inglórios',
    genero: 'Ação/Drama',
    nota: 10,
    urlImagem:
      'https://upload.wikimedia.org/wikipedia/pt/c/c2/Inglourious_basterds_ver9.jpg',
    id: 4,
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
  Movies.push(movie);
  res.status(201).send({message: 'Filme Cadastrado com Sucesso!',
  data: movie});
})

router.put('/:id', (req, res) => {
  const movieEdit = req.body;
  const id = req.params.id;
  let movieExistente = Movies.find((movie) => movie.id == id);

  movieExistente.nome = movieEdit.nome;
  movieExistente.genero = movieEdit.genero;
  movieExistente.nota = movieEdit.nota;
  movieExistente.urlImagem = movieEdit.urlImagem;

  res.send({message:`Filme Atualizado com sucesso!!`});
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const movieIndex = Movies.findIndex((movie) => movie.id == id);

  Movies.splice(movieIndex, 1);

  res.send({message: 'Filme excluido com sucesso!!'});
});

module.exports = router;
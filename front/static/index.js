const urlBD = 'http://localhost:3000/favMovies';

const listarMovies = document.getElementById('lista');

let editando = false;
let idEditando = null;

const getMovies = async () => {
    const response = await fetch(urlBD);

    const data = await response.json();
    console.log(data);

    data.map((movie) => {
        listarMovies.insertAdjacentHTML('beforeend', `
        <div class="">
        <div class="card">
        <img src="${movie.urlImagem}" class="card-img-top" alt="${movie.nome}">
        <div class="card-body">
            <span class="card-title" style="font-size:30px">${movie.nome}</span>
        </div>
        <div class="card-body1">
            <div>
                <span><b>${movie.nome}</b></span><br>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                Assistido
            </label>
            </div>
            <div class="nota">
                <span style="font-size:25px; color: gray">${movie.nota}</span><br>
            </div>
        </div>
        </div>
    </div>
        `)
    })

}

getMovies();

const submitForm = async (e) => {
    e.preventDefault(); 

    let nome = document.getElementById('txt-nome');
    let imagem = document.getElementById('txt-imagem');
    let genero = document.getElementById('txt-genero');
    let nota = document.getElementById('txt-nota');

    const movie = {
        nome: nome.value,
        imagem: imagem.value,
        genero: genero.value,
        nota: nota.value,
    }

    if(!editavel) {
        const request = new Request(`${urlBD}/add` , {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: new Headers({ 'Content-Type': 'application/json'})
        })

        const response = await fetch(request);
        const resultado = await response.json();
        

        if(resultado) {
            getMovies();
        }

    } else {
        const request = new Request(`${urlBD}/${idEditando}` , {
            method: 'PUT',
            body: JSON.stringify(movie),
            headers: new Headers({ 'Content-Type': 'application/json'})
        })

        const response = await fetch(request);
        const resultado = await response.json();

        if(resultado) {
            getMovies();
        }

    }

    nome.value = '';
    imagem.value = '';
    genero.value = '';
    nota.value = '';

    lista.innerHTML = '';
}

const getMoviesById = async (id) => {
    const response = await fetch(`${urlBD}/${id}`);
    return movie = response.json();
}

const putMovie = async (id) => {
    editando = true;
    idEditando = id;

    const movie = await getMovieById(id);

    let nomeNovo = document.getElementById(txt-nome);
    let imagemNovo = document.getElementById(txt-nmagem);
    let generoNovo = document.getElementById(txt-nenero);
    let notaNovo = document.getElementById(txt-nota);

    nomeNovo.value = movie.nome;
    imagemNovo.value = movie.imagem;
    generoNovo.value = movie.genero;
    notaNovo.value = movie.nota;

}

const delMovie = async (id) => {
    const request = new Request(`${urlBD}/${id}` , {
        method: 'DELETE',
    })

    const response = await fetch(request);
    const data = await response.json();

    console.log(data.message);

    lista.innerHTML = '';
    getMovies();

}
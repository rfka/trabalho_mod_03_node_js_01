const urlBD = 'http://localhost:3000/favMovies';

const listarMovies = document.getElementById('lista');

let editando = false;
let idEditando = 0;

const getMovies = async () => {
    const response = await fetch(urlBD);

    const data = await response.json();

    data.map((movie) => {
        listarMovies.insertAdjacentHTML('beforeend', `
        <div class="">
        <div class="card">
        <img src="${movie.urlImagem}" class="card-img-top" alt="${movie.nome}">
        <div class="card-titles">
            <div class="card-body">
                <span class="card-title" style="font-size:30px">${movie.nome}</span>
            </div>
            <div class="card-body1">
                <div>
                    <span><b></b></span><br>
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    Assistido
                </label>
                </div>
                <div class="nota">
                    <span style="font-size:25px; color: gray">${movie.nota}</span><br>
                </div>
                <div>
                    <button type="button" onclick="putMovie(${movie.id})">Editar</button>
                    <button type="button" onclick="delMovie(${movie.id})">Excluir</button>
                </div>
            </div>
            </div>
        </div>
    </div>
        `)
    })

}

getMovies();

const submitForm = async (envio) => {
    envio.preventDefault(); 

    let nome = document.getElementById('nome');
    let imagem = document.getElementById('imagem');
    let genero = document.getElementById('genero');
    let nota = document.getElementById('nota');

    const movie = {
        nome: nome.value,
        imagem: imagem.value,
        genero: genero.value,
        nota: nota.value,
    }

    if(!editando) {
        const request = new Request(`${urlBD}/add`, {
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
        console.log(resultado);


        if(resultado) {
            getMovies();
        }
    }

    nome.value = '';
    imagem.value = '';
    genero.value = '';
    nota.value = '';

    lista.innerHTML = '';
};

const getMoviesById = async (id) => {
    const response = await fetch(`${urlBD}/${id}`);
    return movie = response.json();
    
};

const putMovie = async (id) => {

    editando = true;
    idEditando = id;

    const movie = await getMoviesById(id);

    let nomeNovo1 = document.getElementById('nome');
    let imagemNovo1 = document.getElementById('imagem');
    let generoNovo1 = document.getElementById('genero');
    let notaNovo1 = document.getElementById('nota');

    nomeNovo1.value = movie.nome;
    imagemNovo1.value = movie.imagem;
    generoNovo1.value = movie.genero;
    notaNovo1.value = movie.nota;

};

const delMovie = async (id) => {
    const request = new Request(`${urlBD}/${id}` , {
        method: 'DELETE',
    })

    const response = await fetch(request);
    const data = await response.json();
    console.log(data);


    console.log(data.message);

    lista.innerHTML = '';
    getMovies();

};
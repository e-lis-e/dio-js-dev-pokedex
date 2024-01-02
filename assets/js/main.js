const pokemonList = document.getElementById('pokemonList');
const loadButton = document.getElementById('loadButton');

const maxRec = 151
const limite = 8;
let offset = 0;

function convertToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadItens(offset, limite){
    pokeApi.getPokemons(offset, limite).then((pokemons = [])=> {
        const newHtml = pokemons.map(convertToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadItens(offset, limite)

loadButton.addEventListener('click', () => {
    offset += limite;
    const NextPage = offset + limite;

    if (NextPage >= maxRec) {
        const newLimite = maxRec - offset;
        loadItens(offset,newLimite);

        loadButton.parentElement.removeChild(loadButton);
    } else {
        loadItens(offset, limite);
    }
})
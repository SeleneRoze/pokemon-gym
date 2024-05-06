
const BASE_URL = 'https://pokeapi.co/api/v2/';



const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}


document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        localStorage.setItem('currentPokeId', pokemon.id);
        console.log(pokemon.name);
        createCard(pokemon);
    })

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    console.log(pokemon.name);
    createCard(pokemon);
})



document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = Math.max(1, currentPokeId -1);
        localStorage.setItem('currentPokeId', newId);
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon.name);
        
    })

document.getElementById('next-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = currentPokeId + 1;
        localStorage.setItem('currentPokeId', newId);
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon.name);
    })


   
    const createCard = (pokemon) => {
        const cardContainer = document.getElementById('card-container');
        const card = document.createElement('div');
        const img = document.createElement('img');
        const name = document.createElement('p');
        const id = document.createElement('p');

        img.src = pokemon.sprites.front_default;
        img.alt = `Image of ${pokemon.name}`;
        name.textContent = `Name: ${pokemon.name}`;
        id.textContent = `ID: ${pokemon.id}`;
    

        card.classList.add('pokemon-card');
        img.classList.add('pokemon-image');
        name.classList.add('pokemon-name');
        id.classList.add('pokemon-id');
    
 
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(id);
    
        cardContainer.innerHTML = '';
    
     
        cardContainer.appendChild(card);
    }
    


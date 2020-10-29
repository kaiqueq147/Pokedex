const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for (let i = 1; i <= 252; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }
    Promise.all(pokemonPromises)
        .then(pokemons => {

            const liPokemons = pokemons.reduce((acumulador, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)


                acumulador += `
            <li class="card ${types[0]}">
            <img class="card-image"  alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <div class="types  ${types[1] ? '': 'center'}">
                    
                    <p class="card-subtitle ${types[0]}-name">${types[0]}</p>
                    
                    <p class="card-subtitle ${types[1]}-name">${types[1] ? types[1]: ''}</p>
                    
                </div>
                <div class="attributes">
                    <div class="attribute-item-attack">
                    <h2 class="stat-title">${pokemon.stats[1].stat.name}</h2>
                        <p class="stat-description">${pokemon.stats[1].base_stat}</p>      
                    </div>
                    <div class="attribute-item-hp">
                        <h2 class="stat-title">${pokemon.stats[0].stat.name}</h2>
                        <p class="stat-description">${pokemon.stats[0].base_stat}</p>      
                    </div>
               </attributes> 
            </li>
            `
                return acumulador


            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = liPokemons
        })

}
fetchPokemon()
import { useState } from 'react';

export default function Pokemon() {
  const [pokemonName, setPokemonName] = useState("ditto")

  async function fetchData()  {
    const div = document.getElementById("div");
    const pokemonName = document.getElementById('pokemonName').value;
    const pokemonSprite = document.getElementById('pokemonSprite');
    setPokemonName(pokemonName)

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then((data) => {
      const h1 = document.createElement("h1")
      div.appendChild(h1)

      console.log(data)

      pokemonSprite.src = data.sprites.front_default;
    })
    .catch((error) => { console.error (error); })
  }

  return(
    <div id="div">
      <input type="text" placeholder="Pokemon's Name : " id="pokemonName" className='h-[100px] w-[100px] ' />
      <button onClick={fetchData} >Search</button>  
      <img src='' alt='' id='pokemonSprite' />
    </div>
  )
}
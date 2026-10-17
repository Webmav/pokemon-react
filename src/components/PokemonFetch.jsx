import { useState, useEffect } from 'react';

export default function PokemonFetch() {
    const [inputName, setInputName] = useState("")
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonType, setPokemonType] = useState("");
    const [pokemonAttacks, setPokemonAttacks] = useState("");

    function EnterClicked(event) {
        if(event.key == "Enter") {
            fetchData();
        }
    }

    useEffect(() => {
        fetchData()
    },[])

    async function fetchData()  {
        const div = document.getElementById("div");
        const inputName = document.getElementById('inputName').value;
        const frontDefault = document.getElementById('frontDefault');
        const outputPokemonName = document.getElementById('pokemonName');
        const outputPokemonType = document.getElementById('pokemonType');
        const outputPokemonAttacks = document.getElementById('pokemonAttacks');
        const frontFemale = document.getElementById('frontFemale');
        const frontShiny = document.getElementById('frontShiny');
        const backDefault = document.getElementById('backDefault');
        const backShiny = document.getElementById('backShiny');
        
        setInputName(inputName)

        let url = `https://pokeapi.co/api/v2/pokemon/${inputName}`;

        {(inputName == "") ? url = `https://pokeapi.co/api/v2/pokemon/rayquaza-mega` : url }

        const response = await fetch(url)
        .then(response => response.json())
        .then((data) => {

            console.log(data)

            frontDefault.src = data.sprites.front_default;
            frontFemale.src = data.sprites.front_female;
            frontShiny.src = data.sprites.front_shiny;
            backDefault.src = data.sprites.back_default;
            backShiny.src = data.sprites.back_shiny;

            { (frontFemale.src == "http://localhost:5173/null") ? frontFemale.style.display = "none" : frontFemale.style.display = "block";}
            { (frontShiny.src == "http://localhost:5173/null") ? frontShiny.style.display = "none" : frontShiny.style.display = "block";}
            { (backDefault.src == "http://localhost:5173/null") ? backDefault.style.display = "none" : backDefault.style.display = "block";}
            { (backShiny.src == "http://localhost:5173/null") ? backShiny.style.display = "none" : backShiny.style.display = "block";}

            setPokemonName(data.name)
            setPokemonType(data.types[0].type.name)
            setPokemonAttacks(data.moves[0].move.name)
                      
            outputPokemonName.textContent = "Name : " + data.name;
            outputPokemonType.textContent = "Type : " + data.types[0].type.name;
            outputPokemonAttacks.textContent = "Attacks : " + data.moves[0].move.name;
        })
        .catch((error) => { console.error (error); })
    }

    return(
        <div className='my-[50px]'>
            <div id="div" className='flex justify-center align-center flex-cols-2 '>
                <input 
                    type="text" 
                    placeholder="Pokemon's Name : " 
                    id="inputName" 
                    className='min-h-[10px] min-w-[100px] mr-5 px-2.5 py-1 border border-black rounded' 
                    onKeyDown={EnterClicked}
                />
                <button onClick={fetchData} className='border border-black rounded px-2 py-1' >Search</button>  
            </div>
            
            <div className="flex gap-[100px] justify-self-center mt-[50px] items-center">
                <div className='w-[200px] h-[200px] border border-black'>
                    <img
                        src="/"
                        alt=''
                        id='frontDefault'
                        className='w-[100%] h-[100%] p-[10px]'
                    />
                </div>
                
                <div className='h-[250px] w-[500px] grid content-between'>
                    <div className='border border-black min-h-[50px] max-w-[500px] px-[10px] flex items-center '>
                        <p id='pokemonName'> </p>
                    </div>
                    <div className='border border-black min-h-[50px] max-w-[500px] px-[10px] flex items-center '>
                        <p id='pokemonType' > </p>
                    </div>
                    <div className='border border-black min-h-[50px] max-w-[500px] px-[10px] flex items-center '>
                        <p id='pokemonAttacks' ></p>
                    </div>
                </div>
            </div>
            <div className="flex min-h-[100px] min-w-[100px] justify-self-center gap-[50px] mt-[50px] ">
                <img 
                    id='backDefault' 
                    src="/" 
                    alt="" 
                    className='border border-black h-[100px] w-[100px] p-[5px]'
                />
                
                <img 
                    id='frontShiny' 
                    src="/" 
                    alt="" 
                    className='border border-black h-[100px] w-[100px] p-[5px]'
                />

                <img 
                    id='backShiny' 
                    src="/" 
                    alt="" 
                    className='border border-black h-[100px] w-[100px] p-[5px]'
                />
                
                <img 
                    id='frontFemale' 
                    src="/" 
                    alt="" 
                    className='border border-black h-[100px] w-[100px] p-[5px]'
                />
            </div>
        </div>
    )
}
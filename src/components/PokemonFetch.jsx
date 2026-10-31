import { useState, useEffect } from 'react';

export default function PokemonFetch() {
    const [inputName, setInputName] = useState("")
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonType, setPokemonType] = useState("");
    const [pokemonAttacks, setPokemonAttacks] = useState("");

//To perform function on clicking enter
    function EnterClicked(event) {
        if(event.key == "Enter") {
            fetchData();
        }
    }

//For initial screening of a pokemon
    useEffect(() => {
        fetchData()
    },[])

//Function to fetch data
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

//Function for downloading images
    async function downloadImg() {
        try { 
            const imgUrl = document.getElementById("frontDefault").src;

            const res = await fetch(imgUrl);
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `${pokemonName}.png`
            link.click();

            URL.revokeObjectURL(blob)
        } catch(error) {
            console.error("Could not download image : ", error)

            try { 
                const shinyImgUrl = document.getElementById("frontShiny").src;
                
                const res = await fetch(shinyImgUrl);
                const blob = await res.blob();
                const blobUrl = URL.createObjectURL(blob);
    
                const link = document.createElement("a")
                link.href = blobUrl;
                link.download = `${pokemonName}-shiny.png`
                link.click();
    
                URL.revokeObjectURL(blob)
            } catch(error) {
                console.error("Could not download shiny image : ", error)
                return
            }
        }

    }

    return(
        <div className='my-[50px]'>
            <div id="div" className='flex justify-center items-center'>
                <input 
                    type="text" 
                    placeholder="Pokemon's Name : " 
                    id="inputName" 
                    className='min-h-[5px] md:min-h-[10px] min-w-[75px] md:min-w-[100px] mr-[10px] mr-[25px] my-[10px] px-3 py-1 border border-black rounded text-center' 
                    onKeyDown={EnterClicked}
                />
                <button onClick={fetchData} className='border border-black rounded px-2 py-1 hover:bg-blue-600' >Search</button>  
            </div>
            
            <div className="flex max-md:flex-col gap-[50px] md:gap-[100px] max-md:justify-center justify-self-center mt-[50px] items-center">
                <div className='w-[200px] h-[200px]'>
                    <img
                        src="/"
                        alt=''
                        id='frontDefault'
                        className='w-[100%] h-[100%] p-[10px]'
                    />
                </div>
                
                <div className='h-[200px] md:h-[250px] md:w-[500px] grid content-between'>
                    <div className='border border-gray-400 min-h-[50px] w-full px-[10px] flex items-center rounded'>
                        <p id='pokemonName'> </p>
                    </div>
                    <div className='border border-gray-400 min-h-[50px] w-full px-[10px] flex items-center rounded'>
                        <p id='pokemonType' > </p>
                    </div>
                    <div className='border border-gray-400 min-h-[50px] w-full px-[10px] flex items-center rounded'>
                        <p id='pokemonAttacks' ></p>
                    </div>
                </div>
            </div>

            <div className="flex max-md:flex-wrap min-h-[100px] min-w-[100px] justify-self-center max-md:justify-center gap-[50px] mt-[50px] ">
                <img 
                    id='backDefault' 
                    src="/" 
                    alt="" 
                    className='h-[100px] w-[100px] p-[5px]'
                />
                
                <img 
                    id='frontShiny' 
                    src="/" 
                    alt="" 
                    className='h-[100px] w-[100px] p-[5px]'
                />

                <img 
                    id='backShiny' 
                    src="/" 
                    alt="" 
                    className='h-[100px] w-[100px] p-[5px]'
                />
                
                <img 
                    id='frontFemale' 
                    src="/" 
                    alt="" 
                    className='h-[100px] w-[100px] p-[5px]'
                />
            </div>

            <div className='flex justify-center mt-[30px]'>
                <button
                    className="border border-gray-400 rounded px-3 py-1 hover:bg-blue-700"
                    onClick={downloadImg}
                >
                    Download image
                </button>
            </div>
        </div>
    )
}
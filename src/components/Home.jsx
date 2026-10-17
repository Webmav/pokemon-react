import { useState } from 'react';

import PokemonFetch from './PokemonFetch';

export default function Home() {
    return(
        <div className='flex flex-col justify-between items-center min-h-[625px]'>
            <PokemonFetch />
        </div>
    )
}
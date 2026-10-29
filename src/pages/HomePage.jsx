import PokemonFetch from '../components/PokemonFetch';

export default function HomePage() {
    return(
        <div className="bg-blue-200 flex flex-col justify-between items-center min-h-[625px]">
            <PokemonFetch />
        </div>
    )
}
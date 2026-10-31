import PokemonFetch from '../components/PokemonFetch';

export default function HomePage() {
    return(
        <div className="bg-blue-200 flex flex-col justify-center items-center min-h-[725px]">
            <PokemonFetch />
        </div>
    )
}
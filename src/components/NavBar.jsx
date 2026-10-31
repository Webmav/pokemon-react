import { NavLink } from 'react-router-dom';

export default function NavBar() {
    function Clicked( ) {
        alert("Downloading...");
    }

    return(
        <nav className="flex bg-blue-400 gap-[15px] justify-between px-[25px] md:px-[75px] py-[25px]">
            <h1 className="bold text-[20px]">Logo</h1>

            <ul id='menu-list' className="flex list-style-none mt-[2.5px] max-md:hidden">
                <NavLink to='/'>
                    <li>Home</li>
                </NavLink>
                <NavLink to='/pokemons'>
                    <li>Pokemons</li>
                </NavLink>
                <NavLink to='/images'>
                    <li>Images</li>
                </NavLink>
            </ul>

            <button className='border rounded px-3 py-1 hover:bg-blue-70 max-md:hidden'>Button</button>
        </nav>
    )
}
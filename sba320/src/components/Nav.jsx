import { Link } from 'react-router-dom';


export default function Nav() {
    return (
        <nav className='nav'>
            <Link to='/Cuisine'>Culinary Corner</Link>
            <Link to="/Home"> Home</Link>
        </nav>
    )
}
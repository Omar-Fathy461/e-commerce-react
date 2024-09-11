import { NavLink, Link } from 'react-router-dom';
import '../../assets/sass/menu.scss'
const Menu = () => {
    return (
        <div className='menu'>
            <div className="container">
                <div className='menu-pages'>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/contact" >Contact</NavLink>
                    <NavLink to="/sign" >Sign Up</NavLink>
                    <NavLink to="/categories" >Products</NavLink>
                </div>
                <div className='signOption'>
                    <h2>My Account</h2>
                    <Link className='login-btn' to="/login">Login</Link>
                    <Link className='register-btn' to="/sign">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Menu;
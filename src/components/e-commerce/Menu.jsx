import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import '../../assets/sass/menu.scss'
const Menu = ({ setIsMenuOpen }) => {
    return (
        <div
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return
                }
                setIsMenuOpen(false)
            }}
            className='menubar'
        >
            <div className='menu animate__animated animate__slideInLeft' >
                <div className="container">
                    <FontAwesomeIcon icon={faX}
                        className='closeIcon'
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className='menu-pages'>
                        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/about" onClick={() => setIsMenuOpen(false)} >About</NavLink>
                        <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} >Contact</NavLink>
                        <NavLink to="/sign" onClick={() => setIsMenuOpen(false)} >Sign Up</NavLink>
                        <NavLink to="/categories" onClick={() => setIsMenuOpen(false)} >Products</NavLink>
                    </div>
                    <div className='signOption'>
                        <h2>My Account</h2>
                        <Link className='login-btn' to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                        <Link className='register-btn' to="/sign" onClick={() => setIsMenuOpen(false)}>Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;
import ShoppingCartProducts from '../components/e-commerce/ShoppingCartProducts'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import '../assets/sass/cart.scss'

const Cart = () => {

    return (
        <>
            <div className="cart-heading text-center">
                <h2>Shopping Cart</h2>
                <p><Link to="/">Home</Link> <FontAwesomeIcon icon={faAngleRight} />  Your Shopping Cart</p>
            </div>
            <ShoppingCartProducts />
        </>
    )
}

export default Cart
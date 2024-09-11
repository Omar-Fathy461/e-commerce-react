import { Link } from 'react-router-dom'
import logoBrand from '../../assets/images/6220a9c7912013c51947f9b9.png'
import logoBrand1 from '../../assets/images/Logo-google-pay-vector-PNG.png'
import '../../assets/sass/cheachOut.scss'

const CheachOut = () => {
    return (
        <div className='container'>
            <div className="checkout">
                <div className="express">
                    <p >Express checkout</p>
                    <div className='options'>
                        <div className="shop-pay col-lg-4">
                            <Link className="shopPay-link">Buy with <img src={logoBrand} alt="" /></Link>
                        </div>
                        <div className="shop-pay col-lg-4">
                            <Link className="shopPay-link google-pay">Buy with <img src={logoBrand1} className='google-pay' alt="" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheachOut
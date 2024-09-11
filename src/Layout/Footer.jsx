import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faPinterestP, faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import './footer.scss'

const Footer = () => {
    return (
        <div className="footer">
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="footer-head col-lg-6 col-sm-12">
                            <h2>Stay Connected</h2>
                            <div className="email-input col-lg-6 col-sm-12">
                                <input type="text" placeholder='Enter your email' />
                                <FontAwesomeIcon icon={faArrowRight} />
                            </div>
                            <p>Get 10% off your first purchase as
                                thanks for staying in touch.</p>
                        </div>
                        <div className="footer-links d-flex flex-wrap col-lg-6 col-sm-12">
                            <div className="contactUs col-lg-4">
                                <h5><Link >Contact Us</Link></h5>
                                <Link> About Us</Link>
                                <Link> Careers</Link>
                                <Link>Delivery Inforamtion</Link>
                                <Link>Privacy Policy</Link>
                                <Link>Terms & Condition</Link>
                            </div>
                            <div className="getHelp col-lg-4">
                                <h5><Link>Help Center</Link></h5>
                                <Link>Return Policy</Link>
                                <Link> Shipping Info</Link>
                                <Link>Contact Us</Link>
                            </div>
                            <div className="follow col-lg-4">
                                <h5><Link>Follow Us</Link></h5>
                                <span className='media'>
                                    <Link><FontAwesomeIcon icon={faPinterestP} /></Link>
                                    <Link><FontAwesomeIcon icon={faFacebook} /></Link>
                                    <Link><FontAwesomeIcon icon={faInstagram} /></Link>
                                    <Link><FontAwesomeIcon icon={faXTwitter} /></Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer
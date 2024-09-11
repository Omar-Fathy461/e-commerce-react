import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faPinterestP, faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom"
import { Form, Button } from 'react-bootstrap';
import '../assets/sass/contact.scss'
const Contact = () => {
    return (
        <div className="contact-section">
            <div className="contact-heading text-center">
                <h2>Contact Us</h2>
                <p><Link to="/">Home</Link> <FontAwesomeIcon icon={faAngleRight} />  Contact Us </p>
            </div>
            <div className="container">
                <div className="content d-flex">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <h4>We would love to hear from you.</h4>
                        <p>If you’ve got great products your making or looking to work with us then drop us a line.</p>
                        <Form className="d-flex flex-wrap">
                            <Form.Group className="col-lg-6">
                                <Form.Control type="email" placeholder="email" />
                            </Form.Group>
                            <Form.Group className="col-lg-6 pass-input">
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="col-lg-12" >
                                <Form.Control as="textarea" placeholder="Message" />
                            </Form.Group>
                            <Button className="col-4 forgetPassword" type="submit">
                                Submit Now
                            </Button>
                        </Form>
                    </div>
                    <div className="info col-lg-3 col-md-12 col-sm-12">
                        <div>
                            <h5>Address</h5>
                            <p>7895 Piermont Dr NE Albuquerque, NM 198866, See Our Stores</p>
                        </div>
                        <div>
                            <h5>Information</h5>
                            <p>+391 (0)35 2568 4593</p>
                            <p>hello@domain.com</p>
                        </div>
                        <div>
                            <h5>Social Media</h5>
                            <span className='media'>
                                <Link><FontAwesomeIcon icon={faPinterestP} /></Link>
                                <Link><FontAwesomeIcon icon={faFacebook} /></Link>
                                <Link><FontAwesomeIcon icon={faInstagram} /></Link>
                                <Link><FontAwesomeIcon icon={faXTwitter} /></Link>
                            </span>
                        </div>
                        <div>
                            <h4>We are Open</h4>
                            <p>Our store has re-opened for shopping, exchanges</p>
                            <p>Every day 11am to 7pm</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import logInSchema from "../Validations/logInSchema"
import { useDispatch } from "react-redux"
import { login } from "../store/slices/sign/authSlice"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom"
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

import '../assets/sass/login.scss'

const LogIn = () => {
    const [isForget, setIsForget] = useState(false)
    const [heading, setHeading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur", resolver: zodResolver(logInSchema), })
    // const onSubmitData = (data) => console.log(data)

    const handleClick = () => {
        setIsForget(!isForget)
        handleText()
    }
    const handleText = () => {
        setHeading(!heading)
    }

    const dispatch = useDispatch();
    // const { loading, error } = useSelector((state) => state.authSlice)

    const onSubmitData = async (data) => {
        dispatch(login(data))
    }



    return (
        <div className="login">
            <div className="login-head text-center">
                <h2>Login</h2>
                <p><Link to="/">Home</Link> <FontAwesomeIcon icon={faAngleRight} />  Account </p>
            </div>
            <div className="container">
                <div className="content">
                    <Form onSubmit={handleSubmit(onSubmitData)} className="col-lg-6">
                        {
                            heading ?
                                (
                                    <h3>Reset your password</h3>
                                ) :
                                (
                                    <h3>Log In</h3>
                                )
                        }

                        {
                            isForget ?
                                (
                                    <div className="resetPassword">
                                        <p>We will send you an email to reset your password.</p>
                                        <Form.Group >
                                            <Form.Control type="password" name='password'  {...register("password")} placeholder=" Password" isInvalid={errors.password?.message ? true : false} />
                                            <Form.Control.Feedback type="invalid" >{errors.password?.message}</Form.Control.Feedback>
                                            <span className="d-flex align-items-center">
                                                <Button className="col-4 forgetPassword" type="submit">
                                                    Submit
                                                </Button>
                                                <Link className="forgetPassword" onClick={handleClick}>Cancel</Link>
                                            </span>
                                        </Form.Group>
                                    </div>
                                ) :
                                (
                                    <>
                                        <Form.Group className="group" >
                                            <Form.Control type="email" name='email' {...register("email")} placeholder=" Email" isInvalid={errors.email?.message ? true : false} />
                                            <Form.Control.Feedback type="invalid" >{errors.email?.message}</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="group">
                                            <Form.Control type="password" name='password'  {...register("passowrd")} placeholder=" Password" isInvalid={errors.passowrd?.message ? true : false} />
                                            <Form.Control.Feedback type="invalid" >{errors.passowrd?.message}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Link className="forgetPass" onClick={handleClick}>Forgot your password?</Link>
                                        <Button className="col-4 forgetPassword" type="submit">
                                            Sign Up
                                        </Button>

                                    </>
                                )
                        }
                    </Form>
                    <ToastContainer />
                    <div className="new_customer col-lg-6">
                        <h3>New Customer</h3>
                        <p>Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>
                        <Link to="/sign" className="button">Register</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LogIn
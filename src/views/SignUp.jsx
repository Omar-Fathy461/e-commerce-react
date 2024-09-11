import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import signUpSchema from "../Validations/signUpSchema"
import { useDispatch } from "react-redux"
import { registerUser } from "../store/slices/sign/authSlice"
import { Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import '../assets/sass/signUp.scss'
import { Form, Button } from 'react-bootstrap';



const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur", resolver: zodResolver(signUpSchema), })
    // const onSubmitData = (data) => console.log(data)

    const dispatch = useDispatch();

    const onSubmitData = async (data) => {
        dispatch(registerUser(data))
    }


    return (
        <div className="sign">
            <div className="content pt-5">
                <div className="sign-head text-center">
                    <h2>Register</h2>
                    <p><Link to="/">Home</Link> <FontAwesomeIcon icon={faAngleRight} /> Create Account </p>
                </div>
                <Form onSubmit={handleSubmit(onSubmitData)}>
                    <Form.Group className="col-lg-4 col-md-6 col-sm-12">
                        <Form.Control type="text" placeholder="First Name" {...register("firstName")} isInvalid={errors.firstName?.message ? true : false} />
                        <Form.Control.Feedback type="invalid" >{errors.firstName?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="col-lg-4 col-md-6 col-sm-12">
                        <Form.Control type="text" name='lastName'  {...register("lastName")} placeholder="Last Name" isInvalid={errors.lastName?.message ? true : false} />
                        <Form.Control.Feedback type="invalid" >{errors.lastName?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="col-lg-4 col-md-6 col-sm-12">
                        <Form.Control type="email" name='email' {...register("email")} placeholder=" Email" isInvalid={errors.email?.message ? true : false} />
                        <Form.Control.Feedback type="invalid" >{errors.email?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="col-lg-4 col-md-6 col-sm-12">
                        <Form.Control type="password" name='password'  {...register("passowrd")} placeholder=" Password" isInvalid={errors.passowrd?.message ? true : false} />
                        <Form.Control.Feedback type="invalid" >{errors.passowrd?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="col-lg-4 col-md-6 col-sm-12">
                        <Form.Control type="password" name='confirmPassword'  {...register("confirmPassword")} placeholder=" Confirm Password" isInvalid={errors.confirmPassword?.message ? true : false} />
                        <Form.Control.Feedback type="invalid" >{errors.confirmPassword?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <p className="col-lg-4 col-md-6 col-sm-12">Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>
                    <Button className="col-lg-4 col-md-6 col-sm-12" type="submit">
                        Register
                    </Button>
                    <Link to="/login" className="col-lg-4 col-md-6 col-sm-12 login-btn">Log In</Link>
                </Form >
                <ToastContainer />
            </div >
        </div >

    )
}

export default SignUp
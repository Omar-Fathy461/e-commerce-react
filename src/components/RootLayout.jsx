import { Outlet } from "react-router-dom"
import Header from "../Layout/Header"
import Footer from "../Layout/Footer"
import ScrollToTop from "./e-commerce/ScrollToTop"

const RootLayout = () => {
    return (
        <div>
            <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout
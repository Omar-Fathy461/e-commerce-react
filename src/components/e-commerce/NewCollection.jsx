import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import '../../assets/sass/newCollection.scss'

const NewCollection = () => {
    return (
        <div className="newCollection">
            <div className="newCollection-img col-lg-6 col-sm-12"><img src="https://fashion.minimog.co/cdn/shop/files/img-1-min_7800a0ed-3e95-4e9c-9589-a5d9661caf3b.jpg?v=1708661080&width=940" alt="" /></div>
            <div className="newCollection-title  col-lg-6 col-sm-12">
                <Link to="categories/products/men_fashion">
                    <div>
                        <h6>New Collection</h6>
                        <h2>The Renew Transit Fanny Pack</h2>
                    </div>
                    <div >
                        <p>Shop New Collection <FontAwesomeIcon icon={faArrowRight} /></p>

                    </div>
                </Link>
            </div>
        </div>
    )
}

export default NewCollection
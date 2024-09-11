
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import '../../assets/sass/headProductsList.scss'

const HeadProductsList = (prop) => {

    return (
        <div className="container" >
            <div className="headProductsList">
                <p><Link to="/">Home</Link> <FontAwesomeIcon icon={faAngleRight} /> {prop.title} </p>
                <h2>{prop.title}</h2>
            </div>
        </div>
    )
}

export default HeadProductsList
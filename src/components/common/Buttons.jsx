import '../../assets/sass/buttons.scss'
const Buttons = (prop) => {
    return (
        <button className={prop.style} to={prop.path}>{prop.title}</button>
    )
}

export default Buttons
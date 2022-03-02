const Button = ({ num }) => {
    return (
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={num} className={`${!num && "active"}`} aria-current="true" aria-label={`Slide ${num + 1}`}></button>
    )
}

export default Button
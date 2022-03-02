import Button from './button'

const Indicators = () => {
    return (
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <Button num={0} />
            <Button num={1} />
            <Button num={2} />
            <Button num={3} />
        </div>
    )
}

export default Indicators
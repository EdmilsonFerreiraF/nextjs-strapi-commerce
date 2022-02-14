import CarouselIndicators from "./carouselIndicators"
import CarouselPrevButton from "./carouselPrevButton"
import CarouselNextButton from "./carouselNextButton"
import CarouselActiveitem from "./carouselActiveitem"
import CarouselItem from "./carouselItem"

const Carousel = ({ product }) => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-interval="false">
      <CarouselIndicators />
      <div className="carousel-inner">
        <CarouselActiveitem product={product} />
        <CarouselItem product={product} />
        <CarouselPrevButton />
        <CarouselNextButton />
      </div>
    </div>
  )
}

export default Carousel
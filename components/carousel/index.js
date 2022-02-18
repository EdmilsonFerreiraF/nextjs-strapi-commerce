import Indicators from "./indicators"
import PrevButton from "./controls/previous"
import NextButton from "./controls/next"
import Activeitem from "./activeItem"
import Item from "./item"

const Carousel = ({ product }) => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-interval="false">
      <Indicators />
      <div className="carousel-inner">
        <Activeitem product={product} />
        <Item product={product} />
        <PrevButton />
        <NextButton />
      </div>
    </div>
  )
}

export default Carousel
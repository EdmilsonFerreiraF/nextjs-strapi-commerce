import { getStrapiMedia } from "../../lib/media"

const CarouselItem = ({ product }) => {
    return (
        <>
        {product.attributes.image.data.slice(1).map(image => (
            <div className="carousel-item">
              <img key={image.attributes.id} src={getStrapiMedia({ data: image })} className="d-block" style={{ height: "450px" }} alt="..." />
            </div>
          ))}
        </>
    )
}

export default CarouselItem
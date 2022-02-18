import { getStrapiMedia } from "../../../lib/media"

const Item = ({ product }) => {
  return (
    <>
      {product.attributes.image.data.slice(1).map(image => (
        <div className="carousel-item">
          <img key={image.attributes.id} src={getStrapiMedia({ data: image })} className="d-block" alt="..." />
        </div>
      ))}
    </>
  )
}

export default Item
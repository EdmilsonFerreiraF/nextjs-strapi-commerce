import { getStrapiMedia } from "../../../lib/media"

const ActiveItem = ({ product }) => {
  return (
    <div className="carousel-item active">
      <img key={product.attributes.id} src={getStrapiMedia({ data: product.attributes.image.data[0] })} className="d-block" style={{ height: "450px" }} alt="..." />
    </div>

  )
}

export default ActiveItem
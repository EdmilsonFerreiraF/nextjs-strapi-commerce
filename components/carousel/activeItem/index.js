import { getStrapiMedia } from "../../../lib/media"
import NextImage from "../../image"

const ActiveItem = ({ product }) => {
  return (
    <div className="carousel-item active">
      <NextImage image={getStrapiMedia({ data: product.attributes.image.data[0] })} className="d-block" style={{ height: "450px" }} alt="..." />
    </div>

  )
}

export default ActiveItem
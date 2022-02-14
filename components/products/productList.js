import ProductCard from "./productCard"

const ProductList = ({ products }) => {
    return (
        <>
            {products.map((product, i) => {
                return (
                    <ProductCard
                        product={product}
                        key={`product__left__${product.attributes.slug}`}
                    />
                )
            })}
        </>
    )
}

export default ProductList
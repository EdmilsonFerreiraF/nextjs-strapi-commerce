import Item from "../../carousel/item";

const List = ({ cart }) => {
    return (
        <>
            {cart?.items
                ? cart.items.map((item) => {
                    if (item.quantity > 0) {
                        return (
                            <Item item={item} />
                        );
                    }
                })
                : null}
        </>
    )
}

export default List
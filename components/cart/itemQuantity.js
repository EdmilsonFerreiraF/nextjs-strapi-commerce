const ItemQuatity = ({ item }) => {
    return (
        <span style={{ marginLeft: 5 }} id="item-quantity">
            {item.quantity}x
        </span>
    )
}

export default ItemQuatity
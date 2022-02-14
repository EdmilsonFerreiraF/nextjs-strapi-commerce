import AddItem from "./addItem";
import RemoveItem from "./removeItem";
import ItemQuatity from "./itemQuantity";

const ItemList = ({ cart }) => {
    return (
        <>
            {cart?.items
                ? cart.items.map((item) => {
                    if (item.quantity > 0) {
                        return (
                            <div
                                className="items-one"
                                style={{ marginBottom: 15 }}
                                key={item.id}
                            >
                                <div>
                                    <span id="item-price">&nbsp; ${item.price}</span>
                                    <span id="item-name">&nbsp; {item.name}</span>
                                </div>
                                <div>
                                    <AddItem />
                                    <RemoveItem />
                                    <ItemQuatity item={item} />
                                </div>
                            </div>
                        );
                    }
                })
                : null}
        </>
    )
}

export default ItemList
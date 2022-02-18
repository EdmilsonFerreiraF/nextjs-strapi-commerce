import AddItem from "../add";
import RemoveItem from "../remove";
import ItemQuatity from "./quantity";

const Item = ({ item }) => {
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
    )
}

export default Item
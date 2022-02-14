import { Button } from "reactstrap";

const AddItem = () => {
    return (
        <Button
            style={{
                height: 25,
                padding: 0,
                width: 15,
                marginRight: 5,
                marginLeft: 10,
            }}
            onClick={() => globalContext.addItem(item)}
            color="link"
        >
            +
        </Button>
    )
}

export default AddItem
import { Button } from "reactstrap";
import GlobalContext from "../../context/GlobalContext";


const Add = () => {
  const globalContext = useContext(GlobalContext);

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

export default Add
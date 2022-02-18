import { Button } from "reactstrap";

const Remove = () => {
  return (
    <Button
      style={{
        height: 25,
        padding: 0,
        width: 15,
        marginRight: 10,
      }}
      onClick={() => globalContext.removeItem(item)}
      color="link"
    >
      -
    </Button>
  )
}

export default Remove
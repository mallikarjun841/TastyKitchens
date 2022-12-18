import CardContext from '../../Context/Contextdata'

const Cartlist = props => {
  const {items} = props
  const {imageUrl, id, name, cost, count} = items
  return (
    <CardContext.Consumer>
      {value => {
        const {
          CartItem,
          removeelementfromcart,
          increasecount,
          decreasecount,
          remov,
        } = value

        const removeelementcart = () => {
          removeelementfromcart(id)
        }

        const onDecrement = () => {
          decreasecount(id)
        }
        const onIncrement = () => {
          increasecount(id)
        }
        const totalprice = () => {}

        return (
          <li id={id} key={id} className="cartlist">
            <div className="dish">
              <img className="cartimg" src={imageUrl} alt="img" />
              <h1 className="ordertotal">{name}</h1>
            </div>
            <div className="counter">
              <button className="measure" type="button" onClick={onDecrement}>
                -
              </button>
              <p>{count}</p>
              <button className="measure" type="button" onClick={onIncrement}>
                +
              </button>
            </div>
            <p>{cost * count}</p>
            <button onClick={removeelementcart} type="button">
              x
            </button>
          </li>
        )
      }}
    </CardContext.Consumer>
  )
}

export default Cartlist

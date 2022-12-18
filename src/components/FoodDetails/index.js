import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../Context/Contextdata'
import Counter from '../Counter'
import './index.css'

class FoodDetails extends Component {
  state = {count: 1}

  onDecrement = () => {
    const {count} = this.state
    if (count >= 2) {
      this.setState(object => ({count: object.count - 1}))
    } else {
      this.setState(object => ({count: 1}))
    }
  }

  onIncrement = () => {
    this.setState(object => ({count: object.count + 1}))
  }

  render() {
    const {count} = this.state
    const {item, ids, onmakeadd} = this.props
    const {id, cuisine, name, imageUrl, cost, rating} = item

    return (
      <CartContext.Consumer>
        {value => {
          const {CartItem, addcartitemlist} = value

          const additem = () => {
            addcartitemlist({...item, count})
          }

          //    console.log('visibleitem')
          // const visibleitem = CartItem.some(object => object.id === id)
          // console.log(visibleitem)

          return (
            <li className="hotellists">
              <img
                src={imageUrl}
                alt="restaurant"
                className="hotelimg foodimg"
              />
              <div className="details">
                <h1 className="m1">{name}</h1>
                <p className="m1 starrating">
                  <BiRupee className="rupee" />
                  {cost}
                </p>
                <p className="m1 starrating">
                  <AiFillStar className="star" />
                  {rating}
                </p>
                <div className="counter">
                  <button
                    className="measure"
                    type="button"
                    onClick={this.onDecrement}
                  >
                    -
                  </button>
                  <p>{count}</p>
                  <button
                    className="measure"
                    type="button"
                    onClick={this.onIncrement}
                  >
                    +
                  </button>
                </div>
                <button onClick={additem} className="addbutton" type="button">
                  Add
                </button>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default FoodDetails

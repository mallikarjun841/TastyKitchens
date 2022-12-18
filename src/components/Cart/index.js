import {Component} from 'react'
import {Link} from 'react-router-dom'
import CartContext from '../../Context/Contextdata'
import Header from '../Header'
import Footer from '../Footer'
import Cartlist from '../Cartlist'
import Counter from '../Counter'
import NoOrder from '../Noroder'
import './index.css'

class Cart extends Component {
  state = {}

  componentDidMount() {}

  orderlistitem = () => (
    <CartContext.Consumer>
      {value => {
        const {CartItem} = value
        let totalbill = 0
        CartItem.forEach(object => {
          totalbill = totalbill + object.cost * object.count
        })

        if (CartItem.length === 0) {
          return <NoOrder />
        }
        return (
          <div className="part">
            <Header />
            <div className="supercontainer">
              <div className="cartlist">
                <p>item</p>
                <p>Quantity</p>
                <p>Price</p>
              </div>
              <ul className="cartundorder">
                {CartItem.map(object => (
                  <Cartlist key={object.id} items={object} />
                ))}
                <hr />
                <div className="billcontainer">
                  <h1 className="ordertotal">Order Total:</h1>
                  <div>
                    <p>{totalbill}</p>
                    <Link to="/payment">
                      <button type="button">Place Order</button>
                    </Link>
                  </div>
                </div>
              </ul>
            </div>
            <Footer />
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return <div className="homecontainer">{this.orderlistitem()}</div>
  }
}

export default Cart

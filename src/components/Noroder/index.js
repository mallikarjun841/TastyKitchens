import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NoOrder = () => (
  <div className="noordercontainer">
    <Header />
    <div className="paymentcontainer">
      <img
        src="https://res.cloudinary.com/dzligmi9w/image/upload/v1669860432/cooking_1cookingimg_nheiei.png"
        alt="empty cart"
      />
      <h1>No Order Yet!</h1>
      <p className="tagpara">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button">Order Now</button>
      </Link>
    </div>
  </div>
)

export default NoOrder

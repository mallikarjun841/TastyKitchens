import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Payment = () => (
  <>
    <Header />
    <div className="paymentcontainer">
      <img
        src="https://res.cloudinary.com/dzligmi9w/image/upload/v1669858931/Vector_tllcnd.png"
        alt="img"
      />
      <h1>Payment Successful</h1>
      <p className="tagpara">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button">Go To Home Page</button>
      </Link>
    </div>
  </>
)

export default Payment

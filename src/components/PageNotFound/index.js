import {Link, withRouter} from 'react-router-dom'
import './index.css'

const NotFound = props => (
  <div className="paymentcontainer">
    <img
      src="https://res.cloudinary.com/dzligmi9w/image/upload/v1669859965/erroring_1errorimg_icftul.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p className="tagpara">
      we are sorry, the page you requested could not be found
      <br /> Please go back to the homepage
    </p>
    <Link to="/">
      <button type="button">Home Page</button>
    </Link>
  </div>
)

export default NotFound

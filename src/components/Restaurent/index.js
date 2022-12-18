import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const Restaurentdetails = props => {
  const {item} = props
  const {id, cuisine, name, imageUrl, userRating} = item

  const {rating, totalReviews} = userRating
  return (
    <Link testid="restaurant-item" className="links" to={`/restaurant/${id}`}>
      <li className="hotellist">
        <img alt="restaurant" src={imageUrl} className="hotelimg" />
        <div>
          <h1 className="m1">{name}</h1>
          <p className="m1">{cuisine}</p>
          <p className="m1 starrating">
            <AiFillStar className="star" />
            {rating}({totalReviews}rating)
          </p>
        </div>
      </li>
    </Link>
  )
}
export default Restaurentdetails

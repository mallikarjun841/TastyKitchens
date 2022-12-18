import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  MdSort,
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
} from 'react-icons/md'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'
import Restaurentdetails from '../Restaurent'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    lenghtrest: '',
    coursellist: [],
    restaurantslist: [],
    offerstatus: true,
    option: '',
    activepage: 1,
    liststatus: true,
  }

  componentDidMount() {
    this.getcoursel()
    this.getrestaurentdetails()
  }

  getcoursel = async () => {
    this.setState({offerstatus: true})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const responsedata = await response.json()

    const updateddata = responsedata.offers.map(object => ({
      id: object.id,
      imageUrl: object.image_url,
    }))
    if (response.ok === true) {
      this.setState({coursellist: updateddata, offerstatus: false})
    }
  }

  getlistloader = () => (
    <div className="loader">
      <Loader
        type="ThreeDots"
        width="40px"
        color="
#F7931E"
      />
    </div>
  )

  getloader = () => (
    <div className="loader">
      <Loader
        type="ThreeDots"
        width="40px"
        color="
#F7931E"
      />
    </div>
  )

  getrestaurentdetails = async () => {
    this.setState({liststatus: true})
    const {option, activepage} = this.state
    const token = Cookies.get('jwt_token')
    console.log('limit')
    console.log(activepage)
    const limit = 9
    const offset = (activepage - 1) * limit
    console.log(offset)
    const url1 = 'https://apis.ccbp.in/restaurants-list'
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${option}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resposne = await fetch(url, options)
    const responsedata = await resposne.json()
    const responseurl1 = await fetch(url1, options)
    const data1 = await responseurl1.json()

    const updateddata = responsedata.restaurants.map(object => ({
      id: object.id,
      imageUrl: object.image_url,
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      groupByTime: object.group_by_time,
      HasOnlineDelivery: object.has_online_delivery,
      HasTableBooking: object.has_table_booking,
      isDeliveringNow: object.is_delivering_now,
      location: object.location,
      menuType: object.menu_type,
      name: object.name,
      userRating: {
        rating: object.user_rating.rating,
        ratingColor: object.user_rating.rating_color,
        ratingText: object.user_rating.rating_text,
        totalReviews: object.user_rating.total_reviews,
      },
    }))

    if (resposne.ok === true) {
      this.setState({restaurantslist: updateddata, liststatus: false})
    } else {
      console.log('no rest list')
    }
  }

  slidercall = () => {
    const {coursellist, restaurantslist} = this.state

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <ul>
        <Slider {...settings}>
          {coursellist.map(object => (
            <li key={object.id}>
              <img alt="offer" src={object.imageUrl} className="itemcoursel" />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  optionchange = event => {
    this.setState({option: event.target.value}, this.getrestaurentdetails)
  }

  getsuccess = () => {
    const {
      coursellist,
      liststatus,
      offerstatus,
      activepage,
      option,
      restaurantslist,
    } = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <div>
        <div className="courselcontainer">
          {offerstatus === true ? this.getloader() : this.slidercall()}
        </div>
        {liststatus === true ? (
          this.getlistloader()
        ) : (
          <div>
            <div className="restaurantscontainer">
              <div className="popularcontainer">
                <h1 className="popularname">Popular Restaurants</h1>
                <div className="selectcontainer">
                  <p className="populartag">
                    Select your favourite restaurant special dish and make your
                    day happy...
                  </p>
                  <div className="sortcontainer">
                    <MdSort className="sorts" />
                    <p className="sort">Sort By</p>
                    <select value={option} onChange={this.optionchange}>
                      {sortByOptions.map(object => (
                        <option key={object.id} value={object.value}>
                          {object.displayText}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="allrestaurant">
                <ul className="restaurantunorder">
                  {restaurantslist.map(object => (
                    <Restaurentdetails key={object.id} item={object} />
                  ))}
                </ul>
              </div>
            </div>
            <div className="paginationcontainer">
              <button
                onClick={this.backwardpage}
                className="navbutton"
                type="button"
              >
                <MdOutlineNavigateBefore />
              </button>
              <p>
                <span>{activepage}</span>
                of 4
              </p>
              <button
                onClick={this.forwardpage}
                className="navbutton"
                type="button"
              >
                <MdOutlineNavigateNext />
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  forwardpage = () => {
    const {activepage} = this.state
    if (activepage < 4) {
      this.setState(
        object => ({activepage: object.activepage + 1}),
        this.getrestaurentdetails,
      )
    }
  }

  backwardpage = () => {
    const {activepage} = this.state
    if (activepage > 1) {
      this.setState(
        object => ({activepage: object.activepage - 1}),
        this.getrestaurentdetails,
      )
    }
  }

  makecallprogress = () => {
    const {coursellist, restaurantslist} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    const {status} = this.state
    return <>{this.getsuccess()}</>
  }

  render() {
    const {coursellist, restaurantslist} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div className="homecontainer">
        <Header />
        {this.makecallprogress()}
        <Footer />
      </div>
    )
  }
}

export default Home

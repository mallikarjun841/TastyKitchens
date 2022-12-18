import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import CartContext from '../../Context/Contextdata'
import FoodDetails from '../FoodDetails'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const statuscall = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  Success: 'SUCCESS',
}

class ParticularRestaurant extends Component {
  state = {
    restaurantdetails: {},
    ids: '',
    food: [],
    status: statuscall.initial,
    listelement: [],
  }

  componentDidMount() {
    this.getmoredetails()
  }

  getmoredetails = async () => {
    this.setState({status: statuscall.inprogress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const responsedata = await response.json()
    console.log('cu')
    console.log(responsedata)

    const updateddata = {
      id: responsedata.id,
      imageUrl: responsedata.image_url,
      costForTwo: responsedata.cost_for_two,
      cuisine: responsedata.cuisine,
      opensAt: responsedata.opens_at,
      reviewCount: responsedata.reviews_count,
      location: responsedata.location,
      name: responsedata.name,
      ratings: responsedata.rating,
    }
    const foodlist = responsedata.food_items.map(object => ({
      id: object.id,
      name: object.name,
      imageUrl: object.image_url,
      rating: object.rating,
      foodType: object.food_type,
      cost: object.cost,
    }))

    if (response.ok === true) {
      this.setState({
        restaurantdetails: updateddata,
        status: statuscall.Success,
        food: foodlist,
      })
    } else {
      console.log('rest details fail')
    }
  }

  getloader = () => (
    <div className="loader">
      <Loader
        type="TailSpin"
        width="40px"
        color="
#F7931E"
      />
    </div>
  )

  onmakeadd = (id, item) => {
    const {listelement} = this.state
    localStorage.setItem('listelement', JSON.stringify(listelement))
    const getitem = localStorage.getItem('listelement')
    const parseitem = JSON.parse(getitem)

    if (parseitem === null) {
      console.log('1')
      localStorage.setItem('listelement', JSON.stringify(listelement))
      console.log('1')
      this.setState(
        object => ({listelement: [...object.listelement, item], ids: id}),
        this.getmoredetails,
      )
    } else {
      console.log('2')
      const storagedata = localStorage.getItem('listelement')
      const parsestorge = JSON.parse(storagedata)
      console.log(parseitem)
      console.log(listelement)
      this.setState(
        {listelement: [...parsestorge, item], ids: id},
        this.getmoredetails,
      )
    }
  }

  makecallprogress = () => {
    const {listelement} = this.state

    const {status} = this.state
    switch (status) {
      case statuscall.Success:
        return this.doitcall()
      case statuscall.inprogress:
        return this.getloader()
      default:
        return null
    }
  }

  displaydetails = restaurantdetails => {
    const {
      id,
      name,
      ratings,
      reviewCount,
      location,
      cuisine,
      imageUrl,
      costForTwo,
    } = restaurantdetails

    return (
      <div className="allrestaurants">
        <img src={imageUrl} alt="restaurant" className="restlogo" />
        <div>
          <h1 className="p1 hotelname">{name}</h1>
          <p className="p1 place">{cuisine}</p>
          <p className="p1 place">{location}</p>
          <div className="ratingcontainer">
            <div className="d1">
              <p className="p1">{ratings}</p>
              <p className="p1 bottom">{reviewCount} Rating</p>
            </div>
            <hr className="line" />
            <div className="d2">
              <p className="p1">Rs.{costForTwo}</p>
              <p className="p1 bottom">Cost for two</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  displayitems = () => {
    const {food, ids} = this.state

    return (
      <div className="allrestaurant">
        <ul className="restaurantunorder">
          {food.map(object => (
            <FoodDetails
              key={object.id}
              onmakeadd={this.onmakeadd}
              ids={ids}
              item={object}
            />
          ))}
        </ul>
      </div>
    )
  }

  doitcall = () => {
    const {restaurantdetails} = this.state

    return (
      <div>
        {this.displaydetails(restaurantdetails)}
        {this.displayitems()}
        <Footer />
      </div>
    )
  }

  render() {
    const {restaurantdetails} = this.state
    return (
      <>
        <Header />
        {this.makecallprogress()}
      </>
    )
  }
}

export default ParticularRestaurant

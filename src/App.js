import {Component} from 'react'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import CartContext from './Context/Contextdata'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import Header from './components/Header'
import Payment from './components/Payment'
import NotFound from './components/PageNotFound'
import NoOrder from './components/Noroder'
import ParticularRestaurant from './components/ParticularRestaurant'
import SecureRoute from './components/ProtectedRoute/index'
import './App.css'

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

const getdata = () => {
  const listitem = localStorage.getItem('cartData')
  const parsedata = JSON.parse(listitem)
  if (parsedata == null) {
    return []
  }
  return parsedata
}

class App extends Component {
  state = {cartlist: getdata()}

  addcartitemlist = product => {
    const {cartlist} = this.state
    const exitselement = cartlist.some(object => object.id === product.id)
    if (exitselement) {
      this.setState(object => ({
        cartlist: object.cartlist.map(objects => {
          if (objects.id === product.id) {
            return objects
          }
          return objects
        }),
      }))
    } else {
      this.setState(object => ({cartlist: [...object.cartlist, product]}))
    }
  }

  increasecount = id => {
    const {cartlist} = this.state
    const listdata = cartlist.map(object => {
      if (object.id === id) {
        return {...object, count: object.count + 1}
      }
      return object
    })

    this.setState({cartlist: listdata})
  }

  removeelement = id => {
    console.log('mi')
    console.log(id)
    const {cartlist} = this.state
    const remainelement = cartlist.filter(object => object.id !== id)
    console.log('ji')
    console.log(remainelement)
    this.setState({cartlist: remainelement})
    console.log('cake')
  }

  removeelementfromcart = id => {
    console.log('remove')
    console.log(id)
    this.removeelement(id)
  }

  decreasecount = id => {
    console.log('decrease')
    const {cartlist} = this.state
    const somelist = []
    const listdata = cartlist.forEach(object => {
      if (object.id === id) {
        if (object.count >= 2) {
          somelist.push({...object, count: object.count - 1})
        }
      } else {
        somelist.push(object)
      }
    })
    this.setState({cartlist: somelist})
  }

  render() {
    const {cartlist} = this.state
    console.log(cartlist)
    localStorage.setItem('cartData', JSON.stringify(cartlist))
    return (
      <CartContext.Provider
        value={{
          CartItem: cartlist,
          addcartitemlist: this.addcartitemlist,
          increasecount: this.increasecount,
          decreasecount: this.decreasecount,
          removeelementfromcart: this.removeelementfromcart,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <SecureRoute exact path="/" component={Home} />
          <SecureRoute exact path="/cart" component={Cart} />
          <SecureRoute
            exact
            path="/restaurant/:id"
            component={ParticularRestaurant}
          />
          <SecureRoute exact path="/payment" component={Payment} />

          <Route path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', error: ''}

  calltoken = jwttoken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwttoken, {expires: 10})
    history.replace('/')
  }

  makesubmitform = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const requestdata = await fetch(url, options)
    const response = await requestdata.json()
    console.log(response)
    if (requestdata.ok === true) {
      this.calltoken(response.jwt_token)
    } else {
      this.setState({error: response.error_msg})
    }
  }

  usernamechange = event => {
    this.setState({username: event.target.value})
  }

  passwordchange = event => {
    this.setState({password: event.target.value})
  }

  logincontent = error => (
    <>
      <div className="logincardcontainer">
        <div className="card">
          <img
            src="https://res.cloudinary.com/dtfn2tcjz/image/upload/v1644388324/logo_wgefao.png"
            alt="website logo"
          />
          <h1 className="logoname">Tasty Kitchens</h1>
          <h1 className="logintext">Login</h1>

          <form onSubmit={this.makesubmitform} className="cardcontainer">
            <label htmlFor="username">Username</label>
            <input
              onChange={this.usernamechange}
              className="input"
              id="username"
              type="text"
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={this.passwordchange}
              className="input"
              id="password"
              type="password"
            />
            <button className="loginbutton" type="submit">
              Login
            </button>
            <p className="error">{error}</p>
          </form>
        </div>
      </div>
      <div className="loginimagecontainer">
        <img
          className="loginimage"
          src="https://res.cloudinary.com/dzligmi9w/image/upload/v1669797259/tastyfood/Rectangle_1456loginimg_ut78ag.png"
          alt="website login"
        />
        <img
          className="smallloginimg"
          src="https://res.cloudinary.com/dtfn2tcjz/image/upload/v1644388206/bg-image_xeknqk.png"
          alt="website img"
        />
      </div>
    </>
  )

  render() {
    const {error} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return <div className="loginmaincontainer">{this.logincontent(error)}</div>
  }
}

export default Login

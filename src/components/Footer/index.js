import {Component} from 'react'
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <footer className="footercontainer">
      <div className="footerlogocontainer">
        <img
          className="footlogoimg"
          src="https://res.cloudinary.com/dzligmi9w/image/upload/v1669861369/Frame_275whitelogo_ehfj7y.png"
          alt="website-footer-logo"
        />
        <h1 className="footerheading">Tasty kitchens</h1>
      </div>
      <p className="description">
        The only thing we are serious about is food. Contact us on
      </p>
      <div>
        <FaPinterestSquare
          testid="pintrest-social-icon"
          className="smallicon"
        />
        <FaInstagram testid="instagram-social-icon" className="smallicon" />
        <FaTwitter testid="twitter-social-icon" className="smallicon" />
        <FaFacebookSquare testid="facebook-social-icon" className="smallicon" />
      </div>
    </footer>
  )
}

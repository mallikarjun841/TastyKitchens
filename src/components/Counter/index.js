import {Component} from 'react'
import './index.css'

class Counter extends Component {
  onDecrement = () => {
    const {count} = this.state
    if (count >= 2) {
      this.setState(object => ({count: object.count - 1}))
    } else {
      this.setState(object => ({count: 1}))
    }
  }

  onIncrement = () => {
    this.setState(object => ({count: object.count + 1}))
  }

  render() {
    const {count} = this.props

    return (
      <div className="counter">
        <button className="measure" type="button" onClick={this.onDecrement}>
          -
        </button>
        <div>{count}</div>
        <button className="measure" type="button" onClick={this.onIncrement}>
          +
        </button>
      </div>
    )
  }
}

export default Counter

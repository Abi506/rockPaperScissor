import {Component} from 'react'

import Popup from 'reactjs-popup'

import {RiCloseLine} from 'react-icons/ri'

import './index.css'

class GameContainer extends Component {
  state = {
    selectedImage: '',
    score: 0,
    userChoice: '',
    pcChoice: '',
    result: '',
    played: false,
  }

  userSelected = id => {
    this.setState({selectedImage: id})
    const {details} = this.props
    this.randomGenerator(id)
    const userChoice = details.filter(each => each.id === id)

    const userSelectedImage = userChoice[0].imageUrl
    this.setState({userChoice: userSelectedImage, played: true})
  }

  randomGenerator = userSelected => {
    const choices = ['ROCK', 'SCISSORS', 'PAPER']
    const randomIndex = Math.floor(Math.random() * choices.length)
    const randomChoice = choices[randomIndex]

    const {details} = this.props
    const pcChoice = details.filter(each => each.id === randomChoice)

    const pcSelectedImage = pcChoice[0].imageUrl
    this.setState({pcChoice: pcSelectedImage})
    this.renderResult(randomChoice, userSelected)
  }

  renderResult = (pcSelected, userSelected) => {
    console.log('userSelected:', userSelected)
    console.log('pcSelected:', pcSelected)
    let result = null

    switch (true) {
      case userSelected === pcSelected:
        result = 'IT IS DRAW'
        this.setState({result})
        break
      case (userSelected === 'ROCK' && pcSelected === 'SCISSORS') ||
        (userSelected === 'SCISSORS' && pcSelected === 'PAPER') ||
        (userSelected === 'PAPER' && pcSelected === 'ROCk'):
        result = 'YOU WON'
        this.setState(prevState => ({
          score: prevState.score + 1,
          result,
          played: false,
        }))
        console.log('user wins')
        break
      default:
        result = 'YOU LOSE'
        this.setState(prevState => ({
          score: prevState.score - 1,
          result,
          played: false,
        }))
        console.log('pc wins')
    }
  }

  playGain = () => {
    this.setState({played: false})
  }

  render() {
    const contentStyle = {
      width: '600px',
      backgroundColor: ' white',
      textAlign: 'center',
      padding: '10px',
    }

    const {details} = this.props
    const {
      selectedImage,
      score,
      userChoice,
      pcChoice,
      played,
      result,
    } = this.state

    return (
      <div className="game-main-container">
        <div className="header-container">
          <ul className="game-name-container">
            <li>ROCK</li>
            <li>PAPER</li>
            <li>SCISSOR</li>
          </ul>
          <div className="score-container">
            <p className="score-style">Score</p>
            <h1 className="score-style">{score}</h1>
          </div>
        </div>
        <div className="body-container">
          {played === false && (
            <ul className="image-holder">
              {details.map(each => (
                <li
                  className="each-list"
                  key={each.id}
                  onClick={() => {
                    this.userSelected(each.id)
                  }}
                >
                  <img
                    src={each.imageUrl}
                    alt={each.id}
                    className="each-image"
                  />
                </li>
              ))}
            </ul>
          )}
          {played === true && (
            <div>
              <ul className="image-holder">
                <li>
                  <img
                    src={userChoice}
                    alt="your choice"
                    className="each-image"
                  />
                </li>
                <li>
                  <img
                    src={pcChoice}
                    alt="opponent choice"
                    className="each-image"
                  />
                </li>
              </ul>
              <div className="rematch-button-container">
                <h1 className="result">{result}</h1>
                <button
                  type="button"
                  className="button-styles"
                  onClick={this.playGain}
                >
                  PLAY AGAIN
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default GameContainer

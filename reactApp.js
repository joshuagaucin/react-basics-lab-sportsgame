function Team(props){

  let shotPercentageDiv
  
  if (props.stats.shots) {
    const shotPercentage = Math.round((props.stats.score / props.stats.shots)*100)
    shotPercentageDiv = (
    <div>
      <strong>Shooting %: {shotPercentage}</strong>
      </div>
    )
  }
  
  
  return (
      <div className="Team">
        <h2>{props.name}</h2>
      
      <div className="identity">
        <img src={props.logo} alt={props.name} />
      </div>
      
      <div>
        <strong>Shots:</strong> {props.stats.shots}
      </div>

      <div>
        <strong>Score:</strong> {props.stats.score}
      </div>
      {shotPercentageDiv}
      <button onClick={props.shotHandler}>Shoot!</button>
     </div> 
      
    )
  }
function ScoreBoard(props) {
  return (
    <div className="ScoreBoard">
      <div className="teamStats">
        <h3>VISITORS</h3>
        <h3>{props.visitingTeamStats.score}</h3>
      </div>

      <h3>SCOREBOARD</h3>

      <div className="teamStats">
        <h3>HOME</h3>
        <h3>{props.homeTeamStats.score}</h3>
      </div>
    </div>
  )
}
class Game extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      resetCount: 0,
      homeTeamStats: {
        shots: 0,
        score: 0
      },
      visitingTeamStats: {
        shots: 0,
        score: 0
      }
    }
    this.scoreSound = new Audio('./assets/audio/Swish.mp3')

    this.shotSound = new Audio('./assets/audio/Bounce.mp3')
  }
  shotHandler = (team) => {
    
    const teamStatsKey = `${team}TeamStats`
    let score = this.state[teamStatsKey].score
    this.shotSound.play()
    
    if (Math.random() > 0.5) {
      score += 1
     
     setTimeout(() =>{
      this.scoreSound.play()
    }, 100)
  }

    this.setState((state, props) => ({
      [teamStatsKey] : {
        shots: state[teamStatsKey].shots + 1,
        score
      }
      
    }))
  }

  resetGame = () => {
    this.setState((state, props) => ({
      resetCount: state.resetCount + 1,
      homeTeamStats: {
        shots: 0,
        score: 0
      },
      visitingTeamStats: {
        shots: 0,
        score: 0
      }
    }))
  }
  render(){


  return(
  <div className="Game">
  <ScoreBoard
  visitingTeamStats={this.state.visitingTeamStats}
  homeTeamStats={this.state.homeTeamStats}
  />
  <h1>Welcome to {this.props.venue}</h1>
  <div className="stats">
    <Team
     name={this.props.visitingTeam.name}
     logo={this.props.visitingTeam.logoSrc}
     stats={this.state.visitingTeamStats}
     shotHandler={() => this.shotHandler('visiting')}
    />
        
    <div className="versus">
      <h1>VS</h1>
          <div>
            <strong>Resets:</strong> {this.state.resetCount}
            <button onClick={this.resetGame}>Reset Game</button>
          </div>
    </div>
        <Team
          name={this.props.homeTeam.name}
          logo={this.props.homeTeam.logoSrc}
          stats={this.state.homeTeamStats}
          shotHandler={() => this.shotHandler('home')}
        />
    
  </div>
  </div>
  )
}
}

// Deafault App component that all other compents are rendered through
function App(props){
const ducks = {
  name: 'ducks',
  logoSrc: 'http://whitestonefarm.com.au/wp-content/uploads/2012/05/ducks.jpg'

}
  const geese = {
    name: 'geese',
    logoSrc: 'https://3.bp.blogspot.com/_FykyR7jMB8U/TMZTgfH5ZBI/AAAAAAAABpo/poKgT7d-lbo/s1600/IMG_5815_cr.jpg'

  }
  const foxes = {
    name: 'foxes',
    logoSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QrKFShk6Effu9hU_SSWjbwHaEK%26pid%3DApi&f=1'

  }
  const wolves={
    name: 'wolves',
    logoSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.HOvzvG_55zjCDPMWOhPk4AHaF7%26pid%3DApi&f=1'
  }
  return (
    <div className="App">
      <Game 
      venue="Union 525 Gem" 
      homeTeam={ducks}
      visitingTeam={geese}/>
      <Game 
      venue="Sheridan Arena" 
      homeTeam={wolves}
      visitingTeam={foxes}
      />
    </div>
  )
}

//Render the application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

import logo from './logo.svg';
import React ,{Component} from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Rooms from './Rooms'
import './App.css';
import styled, { css } from 'styled-components'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username:null, 
        value:"null", 
        date: new Date()
    };
}

handleGetJson(){
  console.log("inside handleGetJson11111111");
  fetch('/api/db_check/date', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    })
    .then((response) => response.json())
    .then((messages) => {console.log("messages");});
}

componentDidMount() {
  fetch('/api/group')
      .then(res=>res.json())
      .then(data=>this.setState({username:data.username, value:"abc test"}));
  
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );

  console.log("inside handleGetJson222222222");
  fetch('/api/db_check/date', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    })
    .then((response) => response.json())
    .then((messages) => {console.log(messages);});
}


componentWillUnmount() {
  clearInterval(this.timerID);
}

tick() {
  this.setState({
    date: new Date()
  });
}

handleClick() {
  console.log('this is:', this);
}

render() {
    
  const {username} = this.state;
    return (
      <BrowserRouter>
        <div style={{padding:20, border:'5px solid gray'}}>
          <Link to="/">Home</Link><br/>
          <Link to="/photo">Photo</Link><br/>
          <Link to="rooms">Rooms</Link><br/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/photo" component={Photo}/>
            <Route path="/rooms" component={Rooms}/>
          </Switch>
          <Container>
            <Button>Normal Button</Button>
            <Button primary>Primary Button</Button>
            <Button blue>Primary Button</Button>
          </Container>
        </div>
        <div className="App">
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br/>
          <p>
            {username ? `${this.state.date.toLocaleTimeString()} Hello ${username}` : `Hello World ${this.state.date.toLocaleTimeString()}`}
          </p>

          <h2>{username} It is {this.state.date.toLocaleTimeString()}.</h2>

          <Button onClick={() => this.handleClick()}>
            {this.state.value}
          </Button>
          <LongButton as="a" href="/">Long button with a link</LongButton>

          </header>

          <button onClick={() => this.handleClick()}>
            {this.state.value}
          </button>
          
        

        </div>
      </BrowserRouter>
    )
  }
}

function Home({match}){
  return  <h2>This is home.</h2>
}
function Photo({match}) {
  return <h2>Here is for the photo</h2>
}


const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: ${props => props.blue ? 'palevioletred' : 'black'};
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;


const Container = styled.div`
  background-color: lightgray;
  width: 100%;
`;

const LongButton = styled(Button)`
width: 500px;
`;


export default App;


/*
import logo from './logo.svg';
import './App.css';



function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello! <br/>Edit <code>src/App.js</code> and save to reload.
          <br/>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
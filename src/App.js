import React, { Component } from 'react';
import './App.css';

var libraries = [];


class App extends Component {
    
    constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.fetchLibraries = this.fetchLibraries.bind(this);
    this.state = {
        city: '',
    };
  }

  handleChange(event) {
    this.setState({city: event.target.value});
  }

  render() {
    return (
    <div>
    <input type="text" value={this.state.value} onChange={this.handleChange}/>
    <button onClick={this.fetchLibraries}>Hae kirjastot</button>
      <div>
        <LibraryTable data={libraries}/>
      </div>
    </div>
    );
  }
    
fetchLibraries() {
  console.log('fetching...');
  fetch('https://api.kirjastot.fi/v3/organisation?city.name=' + this.state.city)
    .then(result => result.json())
    .then(result => {
      
      libraries = [];
      
      for(var i = 0; i < result.total; i++){
        
          libraries.push({name: result.items[i].name.fi, www: result.items[i].homepage.fi});
          
      }
      
      this.setState({asd : "asd"});
      
                 
      }
  );
}
}

// Component for student table
class LibraryTable extends Component {
  render() {    
   var rows = this.props.data.map(item =>
        <Library item={item}/>
    );

    return (
      <table>
        <thead>
          <tr>
            <th>Nimi</th>
            <th>WWW</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

// Component for one table row
class Library extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.www}</td>
      </tr>);
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';


class App extends Component {
    
    constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.fetchLibraries = this.fetchLibraries.bind(this);
    this.state = {
        city: '',
        name: '',
        www: '',
        libraries: [],
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
        <LibraryTable data={this.state.libraries}/>
      </div>
    </div>
    );
  }
    
fetchLibraries() {
  console.log('fetching...');
  fetch('https://api.kirjastot.fi/v3/organisation?city.name=LAHTI')
    .then(result => result.json())
    .then(result => {
      
      for(var i = 0; i < result.length; i++){
          
          this.setState({name: result.items[i].name.fi});
          this.setState({www: result.items[i].web_library});
          
          var newArray = this.state.libraries.slice();
          newArray.push('name: ' + this.state.name + ", www: " + this.state.www);
          this.setState({libraries:newArray})
          
      }
                  
      }
  );

  console.log(this.state.libraries);
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
        <td>{this.props.item[0].name.fi}</td>
        <td>{this.props.item[0].www.fi}</td>
      </tr>);
  }
}

export default App;

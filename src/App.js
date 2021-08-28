import React from 'react';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 'home'
    }
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Body page={this.state.page} />
        </Router>
        <Footer/>
      </div>
    );
  };
};

export default App;

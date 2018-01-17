import React, { Component } from 'react';
import Media from './view/Media';
import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';

const fakeData = {
  author: 'yangkui',
  body: '你就是傻逼',
  timestamp: Date.now() - 10000000
};

class App extends Component {
  render() {
    return <Media {...fakeData}>
      <Media {...fakeData} />
    </Media>
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';

import '../CSS/index.css';

class World extends React.Component {
    render() {
        return <h1> World </h1>
    }
}

ReactDOM.render(<World />, document.getElementById('hello'));
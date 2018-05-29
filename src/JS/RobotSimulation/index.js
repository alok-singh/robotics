import React from 'react';
import ReactDOM from 'react-dom';

import Table from './Components/table';
import '../../CSS/RobotSimulation/table.less';
import Constants from './constants';


ReactDOM.render(<Table grids={Constants.grids} />, document.getElementById('root'));
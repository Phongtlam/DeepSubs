import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Chessboard from './Chessboard';
import { startNewGame } from '../redux/actions/index';

const App = props => (
  <div>
    <Chessboard />
  </div>
);

App.defaultProps = {
  startNewGame: propTypes.func,
};

App.propTypes = {
  startNewGame: propTypes.func,
};

export default connect(null, { startNewGame })(App);

import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Spinner from './Spinner';
import ProfilePage from './ProfilePage';
import '../styles/home.scss';

import { getProfileAsync } from '../redux/actions/index';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    this.props.getProfileAsync();
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    let condRender = (
      <div>
        <NavBar />
        <ProfilePage />
      </div>
    );
    if (this.state.isLoading) {
      condRender = <Spinner />;
    }
    return (
      <div className="home">
        {condRender}
      </div>
    );
  }
}

export default connect(null, { getProfileAsync })(Home);

Home.propTypes = {
  getProfileAsync: propTypes.func,
};

Home.defaultProps = {
  getProfileAsync: propTypes.func,
};

import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Spinner from './Spinner';
import ProfilePage from './ProfilePage';

import { getProfileAsync } from '../redux/actions/index';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentWillMount() {
    if (this.props.profileData.username === '') {
      this.setState({ isLoading: true });
      this.props.getProfileAsync();
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 1000);
    }
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

const mapStateToProps = ({ profile, board }) => {
  const { profileData } = profile;
  return { profileData };
};

export default connect(mapStateToProps, { getProfileAsync })(Home);

Home.propTypes = {
  profileData: propTypes.object,
  getProfileAsync: propTypes.func,
};

Home.defaultProps = {
  profileData: {},
  getProfileAsync: propTypes.func,
};

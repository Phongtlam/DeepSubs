import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Spinner from './Spinner';
import ProfilePage from './ProfilePage';
import '../styles/home.scss';

import { getProfileAsync, needProfileAsync } from '../redux/actions/index';

class Home extends React.Component {

  componentWillMount() {
    if (this.props.needProfile) {
      this.props.getProfileAsync();
      setTimeout(() => {
        this.props.needProfileAsync();
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
    if (this.props.needProfile) {
      condRender = <Spinner />;
    }
    return (
      <div className="home">
        {condRender}
      </div>
    );
  }
}

const mapStateToProps = ({ profile }) => {
  const { needProfile } = profile;
  return { needProfile };
};

export default connect(mapStateToProps, { getProfileAsync, needProfileAsync })(Home);

Home.propTypes = {
  getProfileAsync: propTypes.func,
  needProfileAsync: propTypes.func,
  needProfile: propTypes.bool,
};

Home.defaultProps = {
  getProfileAsync: propTypes.func,
  needProfileAsync: propTypes.func,
  needProfile: true,
};

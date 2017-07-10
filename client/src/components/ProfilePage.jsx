import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import propTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SocketIo from '../socket_io_client/index';
import '../styles/profilepage.scss';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this._createGame = this._createGame.bind(this);
    this._joinGame = this._joinGame.bind(this);
    this._handleOnChange = this._handleOnChange.bind(this);
  }

  _handleOnChange(e) {
    e.preventDefault();
    this.setState({ input: e.target.value });
  }

  _createGame() {
    const roomId = shortid.generate();
    SocketIo.emit('new-user', this.props.profileData.username, roomId);
  }

  _joinGame() {
    SocketIo.emit('new-user', this.props.profileData.username, this.state.input);
  }

  render() {
    const profile = this.props.profileData;
    let userImg = <div className="image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdeCBydLKH1OtzaPNFRiqTlwaAEjHruFxxVzsshdqFlQe0_7R8" alt="profile" /><br /></div>;
    if (profile.img_url) {
      userImg = <div className="image"><img src={profile.img_url} alt="profile" /><br /></div>;
    }
    return (
      <div>
        <div className="page-header text-center">
          <h1><span className="fa fa-anchor" /> Welcome {profile.username} !</h1>
          <ButtonToolbar className="navigation">
            <LinkContainer to="/game">
              <Button
                onClick={this._createGame}
                bsStyle="primary"
              >Make a new game
              </Button>
            </LinkContainer>
            <Button
              bsStyle="warning"
              href="/logout"
            ><span className="fa fa-sign-out" /> Logout</Button>
          </ButtonToolbar>
        </div>
        <div className="col-lg-1 col-centered">
          <div className="form-group">
            <div className="inputid">
              <input
                onChange={this._handleOnChange}
                type="text"
                value={this.state.input}
                className="form-control"
                placeholder="Put your friend's ID code here"
              />
            </div>
          </div>
          <LinkContainer to="/game">
            <Button
              bsStyle="primary"
              onClick={this._joinGame}
            ><span className="fa fa-handshake-o" /> Join game ID
            </Button>
          </LinkContainer>

          <div className="well profile">
            <h3><span className="fa fa-user" /> Your Profile</h3>
            {userImg}
            <strong>name</strong>: {profile.first_name} {profile.last_name}<br />
            <strong>total games</strong>: {profile.total_games}<br />
            <strong>win/loss</strong>: {profile.win} / {profile.loss}<br />
            <strong>email</strong>: {profile.email}
          </div>
        </div>
        <div className="footer">
          Copyright &copy; PhongLam 2017
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ profile }) => {
  const { profileData } = profile;
  return { profileData };
};

export default connect(mapStateToProps)(ProfilePage);

ProfilePage.propTypes = {
  profileData: propTypes.object,
};

ProfilePage.defaultProps = {
  profileData: {},
};

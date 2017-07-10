import { GET_PROFILE, NEED_PROFILE } from '../actions/type';

const INITIAL_STATE = {
  profileData: {
    id: null,
    username: '',
    first_name: '',
    last_name: '',
    auth_id: '',
    img_url: '',
    auth_provider: '',
    total_games: '',
    win: '',
    loss: '',
    email: '',
  },
};

// const INITIAL_STATE = {}

const profile = (state = INITIAL_STATE, { type, data }) => {
  switch (type) {
    case GET_PROFILE: {
      const newState = { ...state };
      newState.profileData.id = data.id;
      newState.profileData.username = data.username;
      newState.profileData.first_name = data.first_name;
      newState.profileData.last_name = data.last_name;
      newState.profileData.auth_id = data.auth_id;
      newState.profileData.img_url = data.img_url;
      newState.profileData.auth_provider = data.auth_provider;
      newState.profileData.total_games = data.total_games;
      newState.profileData.win = data.win;
      newState.profileData.loss = data.loss;
      newState.profileData.email = data.email;
      return {
        ...state,
        newState,
      };
    }
    default:
      return state;
  }
};

export default profile;

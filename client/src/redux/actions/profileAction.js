import { GET_PROFILE, NEED_PROFILE } from './type';

export const getProfile = data => ({
  type: GET_PROFILE,
  data,
});

export const needProfile = () => ({
  type: NEED_PROFILE,
});

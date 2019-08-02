import { user } from '../actionTypes';

export function setUser(profile) {
  return {
    type: user.SET_USER,
    user: profile,
  };
}
export function deleteUser(profile) {
  return {
    type: user.DELETE_USER,
    user: profile,
  };
}

// export const authorizeCheck = () => {
//   return async (dispatch) => {
//     try {
//       const user = await axios({token:cookie})
//       dispatch(setUser(user))
//     } catch (error) {

//     }
//   }
// }

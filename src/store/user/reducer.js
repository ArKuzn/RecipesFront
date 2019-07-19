import { user } from '../actionTypes';

const initialState = {
  user: {
    id: 0,
    avatar: '',
    about: '',
    favorites: [],
    login: '',
    name: '',
  },
};

const setUser = (state, action) => {
  debugger
  const newUser = action.user;
  const oldUser = state.user;
  const test = { ...oldUser, ...newUser };
  return {
    ...state,
    // user: newUser,
    user: test,

  };
};
const deleteUser = (state, action) => {
  debugger
  const newUser = initialState;
  return {
    ...state,
    // user: newUser,
    user: newUser,
  };
};
// const setUser = async (state, action) => {
//   debugger
//   const newUser = action.user;
//   const oldUser = state.user;
//   let user = action.user;
//   // const user = await Object.keys(oldUser).map((key, value) => {
//   // user = Object.keys(user).map((key, value) => {
//   //   if (value !== newUser[key]) {
//   //     return newUser[key];
//   //   }
//   //   return oldUser[key];
//   // });




//   // const { todoId } = action;
//   // const newTodos = state.todos.map(todo => {
//   //   if (todo.id !== todoId) { return todo; }

//   //   return {
//   //     ...todo,
//   //     done: !todo.done,
//   //   }
//   // })
//   debugger
//   return {
//     ...state,
//     // user: newUser,
//     user,
//   };
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case user.SET_USER:
      return setUser(state, action);
    case user.DELETE_USER:
      return deleteUser(state, action);
    default:
      return state;
  }
};

export default reducer;

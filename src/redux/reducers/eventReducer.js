// Used to store pref returned from the server
const eventReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_EVENT':
        return action.payload;
      default:
        return state;
    }
  };
  
  // pref will be on the redux state at:
  // state.pref
  export default eventReducer;
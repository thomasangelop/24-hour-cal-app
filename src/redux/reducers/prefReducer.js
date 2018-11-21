// Used to store pref returned from the server
const prefReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PREF':
        return action.payload;
      default:
        return state;
    }
  };
  
  // pref will be on the redux state at:
  // state.pref
  export default prefReducer;
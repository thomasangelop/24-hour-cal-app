// Used to store pref returned from the server
const editEventReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_EDIT_EVENT':
        return action.payload;
      default:
        return state;
    }
  };
  
  // pref will be on the redux state at:
  // state.pref
  export default editEventReducer;
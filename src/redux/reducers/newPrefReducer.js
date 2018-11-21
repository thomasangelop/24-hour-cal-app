// Used to store pref returned from the server
const newPrefReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_NEW_PREF':
        console.log('newPrefReducer running');
        
        return action.payload;
      default:
        return state;
    }
  };
  
  // pref will be on the redux state at:
  // state.pref
  export default newPrefReducer;
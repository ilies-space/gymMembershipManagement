const initialState = {
  allMembers: [],
};

const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addNewMember':
      console.log('addNewMember');
      state.allMembers = state.allMembers
        ? [...state.allMembers, action.newMemeber]
        : action.newMemeber;
      return {
        allMembers: state.allMembers,
      };

    default:
      return state;
  }
};

export default DataReducer;

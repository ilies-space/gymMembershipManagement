const initialState = {
  allMembers: [
    {
      id: 'AA01',
      name: 'ilies',
    },
    {
      id: 'AA02',
      name: 'mohamed',
    },
  ],

  test: ' test ',
};

const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addNewMember':
      console.log('addNewMember');
      state.allMembers = [...state.allMembers, action.newMemeber];
      return {
        allMembers: state.allMembers,
      };

    default:
      return state;
  }
};

export default DataReducer;

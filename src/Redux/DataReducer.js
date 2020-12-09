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
      //   state.allMembers = action.refundList;

      return {
        allMembers: state.allMembers,
      };

    default:
      return state;
  }
};

export default DataReducer;

const statusReducer = (state = false, action) => {
  switch(action.type) {
    case 'UPDATE_STATUS':
      return action.payload.status
    default:
      return state
  }
}

export default statusReducer
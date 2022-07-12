const userReducer = (state = '', action) => {
  switch(action.type) {
    case 'STORE_USER':
      return action.payload.user
    default:
      return state
  }
}

export default userReducer

const userIDReducer = (state = '', action) => {
  switch(action.type) {
    case 'STORE_USER_ID':
      return action.payload.id
    default:
      return state
  }
}

export default userIDReducer
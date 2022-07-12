export const storeUser = user => {
	return {
		type: 'STORE_USER',
		payload: {
			user,
		},
	}
}

export const updateStatus = status => {
	return {
		type: 'UPDATE_STATUS',
		payload: { status },
	}
}

export const storeUserID = id => {
	return {
		type: 'STORE_USER_ID',
		payload: { id },
	}
}

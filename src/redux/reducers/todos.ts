import {ADD_TODO} from '../actionTypes'

export default (state = [], action:any):any => {
	switch (action.type){
		case ADD_TODO:
			//这里不能用 state.push(action.payload)、再返回 state
			//原因，老师讲的很模糊
			return [state,...action.payload]
		default:
			return state
	}
}
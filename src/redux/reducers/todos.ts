import {ADD_TODO,INIT_TODOS,UPDATE_TODO,EDIT_TODO} from '../actionTypes'

export default (state:any[] = [], action:any):any => {
	// state:any[] 初始化时不能是 undefined，所以加了 = []
	switch (action.type){
		case ADD_TODO:
			// 这里不能用 state.push(action.payload)、再返回 state
			// 原因，老师讲的很模糊
			return [state,...action.payload];
		case INIT_TODOS:
			return [...action.payload];
		case UPDATE_TODO:
			return state.map(t=>{
				if(t.id === action.payload.id){
					return action.payload
				}else{
					return t
				}
			})
		case EDIT_TODO:
			return state.map(t=>{
			if(t.id === action.payload){
				return Object.assign({},t,{editing: true})
			}else{
				return Object.assign({},t,{editing: false})
			}
		})
		default:
			return state
	}
}
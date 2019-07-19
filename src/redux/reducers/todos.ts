import {ADD_TODO,INIT_TODOS,UPDATE_TODO,EDIT_TODO} from '../actionTypes'

export default (state:any[] = [], action:any):any => {
	// state:any[] 初始化时不能是 undefined，所以加了 = []
	switch (action.type){
		case ADD_TODO:
			// 这里不能用 state.push(action.payload)、再返回 state（未提前声明是数组？？？）
			// 这里不能用 return state.push(action.payload)
			// 原因，老师讲的很模糊
			console.log([state,action.payload])
			return [state,...action.payload];
			// return 的内容看起来很奇怪，return [...state,action.payload] 好像更合适？？？
		case INIT_TODOS:
			return [...action.payload];
			// 把对象用扩展运算符拷到数组里，不报错吗
			// 答：actions/todos.ts 里，INIT_TODOS 时，payload 是数组，数组里有一个对象
		case UPDATE_TODO:
			return state.map(t=>{
				if(t.id === action.payload.id){
					return action.payload
					// action.payload 即是要更改的todo的具体内容
				}else{
					return t
				}
			})
		case EDIT_TODO:
			return state.map(t=>{
				if(t.id === action.payload){
					// actions/todos.ts 里，EDIT_TODO 时，payload 是number（估计是要edit的todo的id ）
					return Object.assign({},t,{editing: true})
					// editing: true 下一步操作在哪
					// editing: true 之后，会影响TodoItem.tsx的渲染
				}else{
					return Object.assign({},t,{editing: false})
				}
			})
		default:
			return state
	}
}
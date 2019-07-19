import * as React from 'react';
import { connect } from 'react-redux';
// import {addTodo} from "../redux/actions";
import {initTodos,updateTodo} from "../redux/actions/todos";
import TodoInput from 'src/components/TodoInput'
import TodoItem from  'src/components/TodoItem'
import axios from 'src/config/axios'
import './Todos.scss'

/* interface ITodosState {
	todos: any[];
}

class Todos extends React.Component<any,ITodosState> { */
// 由于state中本没有 todos，todos是getTodos中用axios.get获取的，所以不必写state的类型

class Todos extends React.Component<any> {
	constructor(props){
		super(props)
	}

	get unDeletedTodos(){
		return this.props.todos.filter(t => !t.deleted)
		// this.props.todos 从何而来
		// 应该是 mapStateToProps 将state.todos转化为this.props.todos
	}

	get unCompletedTodos(){
		return this.unDeletedTodos.filter(t => !t.completed)
	}

	get completedTodos(){
		return this.unDeletedTodos.filter(t => t.completed)
	}

/* 	addTodo = async (params:any)=>{
		const {todos} = this.state
		try{
			const response = await axios.post('todos',params)
			this.setState({todos: [response.data.resource,...todos]})
		}catch (e) {
			throw new Error(e)
		}
	} */

	componentDidMount(){
		this.getTodos()
	}

	getTodos = async () => {
		try{
			const response = await axios.get('todos')
			// 这是一个接口？？？
			const todos = response.data.resources.map(t=>Object.assign({},t,{editing: false}))
			this.props.initTodos(todos)
			// initTodos 是actions/todos.ts里面一个函数，但是 this.props 是什么
			// 猜想是mapDispatchToProps将 initTodos 变成 this.props 内的一个属性
			// 因为 Todos.tsx 在调用时并未传入任何prop

			// 注意，由于mapDispatchToProps，this.props.initTodos 利用了 actions/todos.ts/initTodos，返回一个action对象
			// 又因为 mapDispatchToProps，所以自动dispatch这个action对象
			// 然后 reducers/todos.ts 会处理这个action 对象，处理完毕之后的返回值即是state
		}catch (e) {
			throw new Error(e)
		}
	}

/* 	toEditing = (id:number) => {
		const {todos} = this.state
		const newTodos = todos.map(t=>{
			if (id === t.id){
				return Object.assign({},t,{editing: true})
			} else {
				return Object.assign({},t,{editing: false})
			}
		})
		this.setState({todos: newTodos})
	}   toEditing事件在TodoItem.tsx中处理*/

	public render() {
		return (
			<div className="Todos" id="Todos">
				{/* <TodoInput addTodo={(params)=>this.addTodo(params)}/> addTodo事件在子组件中进行了，所以这里不用加事件了*/}
				<TodoInput/>
				
				<div className="todoLists">
					{
						this.unCompletedTodos.map(t=>
							<TodoItem key={t.id} {...t}/>)
					}
					{
						this.completedTodos.map(t=>
							<TodoItem key={t.id} {...t}/>)
					}
				</div>
			</div>
		);
		// key？？？
		// 这里，t（即一条todo）是作为参数传进 TodoItem 组件的，但为什么写成...t？？？
	}
}

const mapStateToProps = (state, ownProps) => ({
	todos: state.todos,
	// 这个 todos 来自于 reducers/index.ts，即来自于 reducers/todos.ts
	// state.todos来自于store
	...ownProps
})


const mapDispatchToProps = {
	initTodos,
	updateTodo
	// initTodos,updateTodo 是actions/todos.ts中定义的action，写在这里就相当于使用dispatch绑定了这些action
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos);
/* export default Todos; */
// connect、mapStateToProps、mapDispatchToProps 的写法来自于 redux 文档
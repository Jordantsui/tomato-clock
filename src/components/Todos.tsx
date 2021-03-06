import * as React from 'react';
import { connect } from 'react-redux';
// import {addTodo} from "../redux/actions";
import {initTodos,updateTodo} from "../../redux/actions";
import TodoInput from 'src/components/TodoInput'
import TodoItem from  'src/components/TodoItem'
import axios from 'src/config/axios'
import './Todos.scss'

/* interface ITodosState {
	todos: any[];
}

class Todos extends React.Component<any,ITodosState> { */
class Todos extends React.Component<any> {
	constructor(props){
		super(props)

	}

	get unDeletedTodos(){
		return this.props.todos.filter(t => !t.deleted)
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
			const todos = response.data.resources.map(t=>Object.assign({},t,{editing: false}))
			this.props.initTodos(todos)
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
	} */

	public render() {
		return (
			<div className="Todos" id="Todos">
				{/* <TodoInput addTodo={(params)=>this.addTodo(params)}/> */}
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
	}
}

const mapStateToProps = (state, ownProps) => ({
	todos: state.todos,
	// 注意这个 todos 是什么
	...ownProps
})


const mapDispatchToProps = {
	initTodos,
	updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos);
/* export default Todos; */
// connect、mapStateToProps、mapDispatchToProps 的写法来自于 redux 文档
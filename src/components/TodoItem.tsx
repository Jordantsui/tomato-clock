import * as React from 'react';
import { Checkbox,Icon } from 'antd';
import { connect } from 'react-redux';
import {editTodo, updateTodo} from '../redux/actions/todos';
import classNames from 'classnames';
import './TodoItem.scss';
import axios from "../config/axios";

interface ITodoItemProps {
	id: number;
	description: string;
    completed: boolean;
    editing: boolean;
/*     update: (id: number, params: any)=> void;
	toEditing: (id: number) => void; */
	editTodo: (id:number)=>any;
	updateTodo: (payload:any)=> any;
}

interface ITodoItemState {
	editText: string;
}

class TodoItem extends React.Component<ITodoItemProps,ITodoItemState> {
	constructor(props){
		super(props)
		// props 来自于Todos.tsx，是一条todo
		this.state = {
			editText: this.props.description
		}
		// 这个是 TodoItem 自己的state，与store中的state无关
	}

/* 	update = (params:any) => {
		this.props.update(this.props.id,params)
	} */
	updateTodo = async (params:any) => {
		try {
			const response = await axios.put(`todos/${this.props.id}`,params)
			// 对于updateTodo这个操作而言，params是个对象，后台接受这个put操作，修改了数据库中的todos，再返回来
			// this.props 是指Todos.tsx传进来的那个todo
			this.props.updateTodo(response.data.resource)
			// 我们根据后台返回的信息更新页面上的 todos
		}catch (e) {
			throw new Error(e)
		}
	}

/* 	toEditing = () => {
		this.props.toEditing(this.props.id) */
	editTodo = () => {
		this.props.editTodo(this.props.id)
		// this.props.editTodo 仅仅将 editing 变为 false，不做操作
	}

	onKeyUp = (e)=>{
		if(e.keyCode === 13 && this.state.editText !== ''){
			// this.update({description: this.state.editText})
			this.updateTodo({description: this.state.editText})
		}
	}// 需要写成箭头函数

	public render() {
		// 为什么是public？？？
		const Editing = (
			<div className="editing">
				<input type="text" value={this.state.editText}
				       onChange={e => this.setState({editText: e.target.value})}
				       onKeyUp={this.onKeyUp}
				/>
				<div className="iconWrapper">
					<Icon type="enter" />
					<Icon type="delete" theme="filled"
					      onClick={e => this.updateTodo({deleted: true})}/>
				</div>
			</div>
		)
		// 自己的state也可以用setState
		const Text = <span className="text" onDoubleClick={this.editTodo}>{this.props.description}</span>
		const todoItemClass = classNames({
			TodoItem: true,
			editing: this.props.editing,
			completed: this.props.completed
        })
		// 注意 classnames 的使用
		// TodoItem: true？？？
		return (
			<div className={todoItemClass} id="TodoItem">
				<Checkbox checked={this.props.completed}
				          onChange={e=> this.updateTodo({completed: e.target.checked})}
				/>
				{this.props.editing?Editing:Text}
			</div>
		);
	}
}

// export default TodoItem;
const mapStateToProps = (state, ownProps) => ({
	...ownProps
})
// 注意，这里与Todos.tsx不同，TodoItem.tsx并未用到store中的state

const mapDispatchToProps = {
	editTodo,
	updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoItem); 
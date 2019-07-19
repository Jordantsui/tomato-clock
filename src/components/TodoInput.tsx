import * as React from 'react';
import { connect } from 'react-redux';
import {addTodo} from "../redux/actions/todos";
import axios from 'src/config/axios';
import {Input,Icon} from 'antd';

interface ITodoInputState {
	description: string;
}

interface ITodoInputProps {
	addTodo: (payload:any) => any;
}
// props 是什么
// 注意，mapStateToProps 和 mapDispatchToProps 产生的props都要写出格式要求
// 或者，像 Todos.tsx 中那样处理，全部写成any

class TodoInput extends React.Component<ITodoInputProps,ITodoInputState> {
	constructor(props){
		super(props)
		this.state = {
			description: ''
		}
	}

	onKeyUp = (e) => {
		if(e.keyCode === 13 && this.state.description !== ''){
			this.postTodo()
		}
		// 13表示回车键
	}

	postTodo = async ()=>{
		try {
			const response = await axios.post('todos',{description: this.state.description})
			this.props.addTodo(response.data.resource)
		}catch (e) {
			throw new Error(e)
		}
		this.setState({description: ''})
	}

	public render() {
		const { description } = this.state;
		const suffix = description ? <Icon type="enter" onClick={this.postTodo}/> : <span/>;
		return (
      <div className="TodoInput" id="TodoInput">
	      <Input
		      placeholder="添加新任务"
		      suffix={suffix}
		      value={description}
		      onChange={(e) => this.setState({description: e.target.value})}
		      onKeyUp={this.onKeyUp}
	      />
      </div>
		);
		// Input 按钮中，suffix 是后缀图标
	}
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps
})

const mapDispatchToProps = {
	addTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoInput);
// export default TodoInput;
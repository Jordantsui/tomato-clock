import * as React from 'react';
import TomatoAction from './TomatoAction'
import {connect} from 'react-redux';
import './Tomatoes.scss'
import {addTomato, initTomatoes, updateTomato} from "../../redux/actions/tomatoes";
import axios from "../../config/axios";

interface ITomatoesProps {
	addTomato: (payload: any) => any;
	updateTomato: (payload: any) => any;
	initTomatoes: (payload: any[]) => any;
	tomatoes: any[];
}

class Tomatoes extends React.Component<ITomatoesProps> {
	constructor(props){
		super(props)
	}
	// Tomatoes.tsx 中不需要 this.state，所以也无须类型声明

	componentDidMount(){
		this.getTomatoes()
		// 页面加载完之后才获取数据？？？
	}

	get unfinishedTomato(){
		return this.props.tomatoes.filter(t => !t.description && !t.ended_at)[0]
		// 为什么只要一个？？？
	}

	getTomatoes = async ()=>{
		try {
			const response = await axios.get('tomatoes')
			this.props.initTomatoes(response.data.resources)
		}catch (e) {
			throw new Error(e)
		}
	}

	startTomato = async ()=>{
		try{
			const response = await axios.post('tomatoes',{duration: 1500000})
			// 一个tomato持续时间为25min
			this.props.addTomato(response.data.resource)
			// 这时，由于是刚开始、还未结束的番茄时间，所以resource中 "ended_at" 和"description" 是null
			// 在番茄时间结束之后，这个tomato会被updateTomato
		}catch (e) {
			throw new Error(e)
		}
	}

	public render() {
		return (
			<div className="Tomatoes" id="Tomatoes">
				<TomatoAction startTomato={this.startTomato} unfinishedTomato={this.unfinishedTomato} updateTomato={this.props.updateTomato}/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	tomatoes: state.tomatoes,
	...ownProps
})

const mapDispatchToProps = {
	addTomato,
	updateTomato,
	initTomatoes
}

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes);
// 开始番茄闹钟的按钮

import * as React from 'react';
import {Button,Input,Icon} from "antd"
import axios from 'src/config/axios'
// import CountDown from './CountDown'
import CountDown from './CountDownHook'

interface ITomatoActionProps {
	startTomato: () => void;
	updateTomato: (payload: any) => void;
	unfinishedTomato: any;
}

/* class TomatoAction extends React.Component {

	startTomato = async ()=>{
		try{
			const response = await axios.post('tomatoes',{duration: 1500000})
			console.log(response.data)
		}catch (e) {
			throw new Error(e)
		} */
interface ITomatoActionState {
	description: string;
}
		
class TomatoAction extends React.Component<ITomatoActionProps,ITomatoActionState> {
	constructor(props){
		super(props)
		this.state = {
			description: ''
		}
	}

	onKeyUp = (e) => {
		if(e.keyCode === 13 && this.state.description !== ''){
			this.addDescription()
			// 番茄闹钟结束、输入完描述之后，应该 addDescription
		}
	}

	onFinish = () => {
		this.render()
	}
	// 倒计时结束，则重新渲染（因为倒计时不在state中）

	addDescription = async ()=>{
		try {
			const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,{
				description: this.state.description,
				ended_at: new Date()
			})
			this.props.updateTomato(response.data.resource)
			// updateTomato 最终更改了store中的tomatoes，而不是页面上按钮下面显示的东西
			this.setState({description: ''})
		}catch (e) {
			throw new Error(e)
		}
	}

	public render() {
		let html = <div/>
		if(this.props.unfinishedTomato === undefined){
			html = <Button className="startTomatoButton" onClick={()=>{this.props.startTomato()}}>开始番茄</Button>
		}else{
			const startedAt = Date.parse(this.props.unfinishedTomato.started_at)
			const duration = this.props.unfinishedTomato.duration
			const timeNow = new Date().getTime()
			if(timeNow - startedAt > duration){
				html = <div>
					<Input value={this.state.description}
					       placeholder="请输入你刚刚完成的任务"
					       onChange={e=> this.setState({description: e.target.value})}
					       onKeyUp={e => this.onKeyUp(e)}
					/>
					<Icon type="close-circle" />
				</div>
			}else if(timeNow - startedAt < duration){
				const timer = duration - timeNow + startedAt
				// 传给 CountDown.tsx ，作为倒计时的时间
				html = <CountDown timer={timer} onFinish={this.onFinish}/> // 倒计时
			}
		}
		return (
			<div className="TomatoAction" id="TomatoAction">
				{/* <Button className="startTomatoButton" onClick={()=>{this.props.startTomato()}}>开始番茄</Button> */}
				{html}
			</div>
		);
	}
}

export default TomatoAction;
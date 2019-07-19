// 开始番茄闹钟的按钮

import * as React from 'react';
import {Button,Input,Modal,Icon} from "antd"
import axios from 'src/config/axios'
import CountDown from './CountDown'
import './TomatoAction.scss'
// import CountDown from './CountDownHook'

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

const confirm = Modal.confirm;
		
class TomatoAction extends React.Component<ITomatoActionProps,ITomatoActionState> {
	constructor(props){
		super(props)
		this.state = {
			description: ''
		}
	}

	onKeyUp = (e) => {
		if(e.keyCode === 13 && this.state.description !== ''){
			this.updateTomato({
				description: this.state.description,
				ended_at: new Date()
			})
			this.setState({description: ''})
			// 番茄闹钟结束、输入完描述之后，应该 addDescription
		}
	}

	onFinish = () => {
		// this.render()
		this.forceUpdate()
		// render()没有起作用，是因为重新渲染时props和this.state数据并未改变，所以重新渲染时这部分未更新
		// 此时可用forceUpdate强制更新？？？
	}

	showConfirm = () =>{
		confirm({
			title: '您目前正在一个番茄工作时间中，要放弃这个番茄吗？',
			onOk: ()=>{
				this.abortTomato()
			},
			onCancel() {
				console.log('取消');
			},
			cancelText: '取消',
			okText: '确定',
		});
	}
	// 点击取消按钮后，询问弹窗

	// 倒计时结束，则重新渲染（因为倒计时不在state中）

	abortTomato = ()=>{
		this.updateTomato({aborted: true})
		document.title = '饥人谷番茄APP';
	}

	updateTomato = async (params:any)=>{
		try {
			const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,params)
			this.props.updateTomato(response.data.resource)
			// updateTomato 最终更改了store中的tomatoes，而不是页面上按钮下面显示的东西
		}catch (e) {
			throw new Error(e)
		}
	}

	public render() {
		let html = <div className="inputWrapper"/>
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
					<Icon type="close-circle" className="abort"
					      onClick={this.showConfirm}
					/>
				</div>
			}else if(timeNow - startedAt < duration){
				const timer = duration - timeNow + startedAt
				// 传给 CountDown.tsx ，作为倒计时的时间
				html = (
					<div className="countDownWrapper">
						<CountDown timer={timer} duration={duration}
						           onFinish={this.onFinish}/>
						<Icon type="close-circle" className="abort"
						      onClick={this.showConfirm}/>
					</div>
				)
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
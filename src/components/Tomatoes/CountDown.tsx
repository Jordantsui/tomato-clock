import * as React from 'react';
import './CountDown.scss';

interface ICountDownProps {
	timer: number;
	duration: number;
	onFinish: () => void;
}
// timer 和 onFinish 都是 TomatoAction.tsx传进来的

interface ICountDownState {
	countDown: number;
}

let timerId:NodeJS.Timeout
// timerId是这个类型的

class CountDown extends React.Component<ICountDownProps,ICountDownState> {
	constructor(props){
		super(props)
		this.state = {
			countDown: this.props.timer
		}
	}

	componentDidMount(){
		timerId = setInterval(()=>{
			// document.title = `${this.countDown} - 饥人谷番茄APP`;
			const time = this.state.countDown
			this.setState({countDown: time - 1000})
			document.title = `${this.countDown} - 饥人谷番茄APP`;
			// 将document.title放在这里解决了title与TomatoAction时间差一秒的问题
			if(time < 1000){
			// 若条件为time < 1，当time为1时，time-1000=-999，则页面会显示出-999，有隐患
				document.title = '饥人谷番茄APP';
				this.props.onFinish()
				clearInterval(timerId)
			}
		},1000)
	}

	get countDown(){
		const min = Math.floor(this.state.countDown/1000/60)
		const second = Math.floor(this.state.countDown/1000%60)
		return `${min<10?`0${min}`:min}:${second<10?`0${second}`:second}`
		// 引号？？？
	}

	componentWillUnmount(){
		clearInterval(timerId)
	}

	public render() {
/* 		const min = Math.floor(this.state.countDown/1000/60)
		// 时间戳是毫秒
		const second = Math.floor(this.state.countDown/1000%60)
		const time = `${min}:${second<10?`0${second}`:second}` */
		const percent = 1 - this.state.countDown/this.props.duration
		return (
/* 			<div className="CountDown">
				{time} */
			<div className="CountDown" id="CountDown">
				<span className="restTime">{this.countDown}</span>
				<div className="progress" style={{width: `${percent*100}%`}}/>
			</div>
		);
	}
}

export default CountDown;
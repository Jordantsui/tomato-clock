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
			const time = this.state.countDown
			this.setState({countDown: time - 1000})
			if(time < 0){
				this.props.onFinish()
				clearInterval(timerId)
			}
		},1000)
	}

	get countDown(){
		const min = Math.floor(this.state.countDown/1000/60)
		const second = Math.floor(this.state.countDown/1000%60)
		return `${min<10?`0${min}`:min}:${second<10?`0${second}`:second}`
	}

	componentWillUnmount(){
		clearInterval(timerId)
	}

	public render() {
		const min = Math.floor(this.state.countDown/1000/60)
		// 时间戳是毫秒
		const second = Math.floor(this.state.countDown/1000%60)
		const time = `${min}:${second<10?`0${second}`:second}`
		return (
			<div className="CountDown">
				{time}
			</div>
		);
	}
}

export default CountDown;
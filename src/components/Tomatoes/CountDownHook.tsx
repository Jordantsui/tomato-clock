import React,{useState,useEffect, FunctionComponent} from 'react';

interface ICountDownHookProps {
	timer: number;
	onFinish: () => void;
}
let timerId:NodeJS.Timeout

const CountDownHook:FunctionComponent<ICountDownHookProps> = (props)=>{
	const [countDown,setCountDown] = useState(props.timer)

	const min = Math.floor(countDown/1000/60)
	const second = Math.floor(countDown/1000%60)
	const time = `${min}:${second<10?`0${second}`:second}`
	// 引号？？？

	useEffect(() => {
		document.title = `${time} - 饥人谷番茄APP`;
		timerId = setInterval(()=>{
			setCountDown(countDown - 1000)
			// 每次setCountDown之后，会重新渲染组件，并将最新的countDown再传给setCountDown
			// 在渲染组件的过程中，time会被重新计算，useEffect也会触发
			if(countDown < 0){
				props.onFinish()
				document.title = `饥人谷番茄APP`;
				clearInterval(timerId)
			}
		},1000)
		return function cleanup() {
			clearInterval(timerId)
		};
	});
	// 注意，如果使用hooks，每次setCountDown，实际上都会将组件重新渲染
	// 在重新渲染过程中，useEffect也会触发，这时会生成新的setInterval，因此时间上可能会有误差
	// 因此，hooks不太适用于这个场景

	return (
		<div className="CountDown">
			{time}
		</div>
	);
}

export default CountDownHook; 
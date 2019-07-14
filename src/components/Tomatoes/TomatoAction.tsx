import * as React from 'react';
import {Button} from "antd";

interface ITomatoActionProps {
	startTomato: () => void;
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
class TomatoAction extends React.Component<ITomatoActionProps> {
	constructor(props){
		super(props)
	}

	public render() {
		return (
			<div className="TomatoAction" id="TomatoAction">
				<Button className="startTomatoButton" onClick={()=>{this.props.startTomato()}}>开始番茄</Button>
			</div>
		);
	}
}

export default TomatoAction;
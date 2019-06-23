import * as React from 'react';
import { Dropdown,Icon,Menu } from "antd";
import Todos from 'src/components/Todos/Todos'
import axios from 'src/config/axios';
import history from 'src/config/history'
import './Index.scss'

interface IRouter {
	history: any;
}

interface IIndexState {
	user: any
}

const logout = ()=>{
	localStorage.setItem('x-token','')
	history.push('/login')
}

const menu = (
	<Menu>
		<Menu.Item key="1"><Icon type="user" />个人设置</Menu.Item>
		<Menu.Item key="2" onClick={logout}><Icon type="logout" />注销</Menu.Item>
	</Menu>
);

class Index extends React.Component<IRouter,IIndexState> {

	constructor(props: any){
		super(props)
		this.state = {
			user: {}
		}
	}

	async componentWillMount(){
		await this.getMe()
	}

	getMe = async () => {
		const response = await axios.get('me');
		this.setState({user: response.data})
	}
	// 获取当前用户信息，不需要其他参数


	render() {
		return (
			<div className="Index" id="Index">
{/* 				<p>欢迎，{this.state.user && this.state.user.account}</p>
				<Button onClick={this.logout}>注销</Button> */}
				<header>
					<span className="logo">LOGO</span>
					<Dropdown overlay={menu}>
						<span>
							{this.state.user && this.state.user.account}
							<Icon type="down" style={{ marginLeft: 8}}/>
						</span>
					</Dropdown>
				</header>
				<main>
					<Todos/>
				</main>
			</div>
		);
	}
}

export default Index;
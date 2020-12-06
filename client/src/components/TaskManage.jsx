import React, {Component} from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import TaskItem from './TaskItem';

const server_url = 'http://localhost:3001';
export default class TaskManage extends Component {
	state = {
		tasks: [],
	}
	get dateVN() {
		var d = new Date();
		const dayOfWeek = d.toLocaleDateString('vi-VN', { weekday: 'long'}).split(',')[0];
		return `${dayOfWeek}, ${d.getDay()}-${d.getMonth()}-${d.getFullYear()}`;
	}
	render() {
		return (
			<Container>
				<h3>Developed by Turong</h3>
				<span>Hôm nay:</span>
				<h4>{this.dateVN}</h4>
				<Row>
					<Col>
						<Button onClick={this.addTask}>Thêm</Button>{' '}
						<Button variant="success" onClick={(e) => this.hdlRunCommand('dir')}>Excel</Button>
					</Col>
				</Row>
				<div style={{padding: "0.3em 0"}}>
					{this.state.tasks.map((item, index) => 
							<TaskItem key={index}
										index={index}
										info={item}
										onupdate={this.hdlUpdateItem}
										ondelete={this.hdlDeleteItem}/>
					)}
				</div>
			</Container>
		);
	}

	addTask = () => {
		var tasks = this.state.tasks;
		tasks.push({name: "", time: "", date: null});
		this.setState({tasks: tasks});
	}

	hdlDeleteItem = (index) => {
		var tasks = this.state.tasks;
		tasks.splice(index, 1);
		this.setState({tasks: tasks});
	}

	hdlUpdateItem = (index, item) => {
		var tasks = this.state.tasks;
		item.date = new Date();
		tasks[index] = item;
		this.setState({tasks: tasks});
	}

	hdlRunCommand = async () => {
		const data = {
			cellValue: this.generateText(this.state.tasks)
		};
		console.log(data);
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		};
		var response = await fetch(`${server_url}/ZRlogtime`, requestOptions);
		var result = await response.json();	
		if (result.error) {
			console.error(result.error);
		} else if (result.data) {
			console.log(result.data);
		} else {
			alert(result);
		}
	}

	generateText = (tasks) => {
		// create a String array of tasks
		var txtTasks = tasks.map(task => {
			return `🧁${task.name} ${task.time}h`;
		});
		return txtTasks.join('\n');
	}
}
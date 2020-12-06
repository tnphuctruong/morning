import React, {Component} from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import TaskItem from './TaskItem';
import Dialog from './Dialog';

const server_url = 'http://localhost:3001';
export default class TaskManage extends Component {
	state = {
		tasks: [],
		deleteIndex: -1,
		showDialog: false,
		fileLocked: false
	}
	get dateVN() {
		var d = new Date();
		const dayOfWeek = d.toLocaleDateString('vi-VN', { weekday: 'long'}).split(',')[0];
		return `${dayOfWeek}, ${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
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
						<Button variant="success" onClick={(e) => this.hdlRunCommand('dir')}>Cập nhật Excel</Button>{' '}
						{this.state.fileLocked ?
						<Button variant="warning" onClick={(e) => this.setState({fileLocked: !this.state.fileLocked})}>Release File</Button>:
						<Button variant="warning" onClick={(e) => this.setState({fileLocked: !this.state.fileLocked})}>Lock File</Button>
						}
					</Col>
				</Row>
				<div style={{padding: "0.3em 0"}}>
					{this.state.tasks.map((item, index) => 
							<TaskItem key={index}
										index={index}
										info={item}
										onupdate={this.hdlUpdateItem}
										ondelete={(index) => this.setState({showDialog: true, deleteIndex: index})}/>
					)}
				</div>
				<Dialog title="Chắc chưa?"
						msg="Bạn sắp xóa cái này khỏi danh sách?"
						show={this.state.showDialog}
						onOK={() => this.hdlDeleteItem(this.state.deleteIndex)}
						onCancel={(e) => {this.setState({deleteIndex: -1})}}/>
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
		this.setState({tasks: tasks, deleteindex: -1, showDialog: false});
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
		try {
			var response = await fetch(`${server_url}/ZRlogtime`, requestOptions);
			var result = await response.json();	
			if (result.error) {
				console.error(result.error);
			} else if (result.data) {
				console.log(result.data);
			} else {
				alert(result);
			}
		} catch(e) {
			alert(e);
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
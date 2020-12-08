import React, {Component} from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import TaskItem from './TaskItem';
import Dialog from './Dialog';
import ToastNotification from './ToastNotification';

import CONSTANT from '../constants/constant';

const server_url = 'http://localhost:3001';

export default class TaskManage extends Component {
	state = {
		tasks: [],
		project: null,
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
				<h3>Made by Turong</h3>
				<span>Hôm nay:</span>
				<h4>{this.dateVN}</h4>
				<Row>
					<Col>
						<Button onClick={this.addTask}>Thêm</Button>{' '}
						<Button variant="success" onClick={this.hdlLogtime}>Cập nhật Excel</Button>{' '}
						<Button variant="info" onClick={this.hdlUpdateFile}>SVN Update</Button>{' '}
						{this.state.fileLocked ?
							<Button variant="warning" onClick={(e) => {
															this.setState({fileLocked: !this.state.fileLocked});
															this.hdlLockReleaseFile(true); }
														}>Release File</Button> :
							<Button variant="warning" onClick={(e) => {
															this.setState({fileLocked: !this.state.fileLocked});
															this.hdlLockReleaseFile(false); }
													}>Lock File</Button>
						}
					</Col>
				</Row>
				<Row>
					<Col md={4} xs={10}>
						<Form.Group>
							<Form.Label>Chọn project (案件)</Form.Label>
							<Form.Control as="select"
									onChange={(e) => this.setState({project: e.target.value})}>
								{
									CONSTANT.project_options.map((value, index) => 
										<option key={index}>{value}</option>
									)
								}
							</Form.Control>
						</Form.Group>
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
				<ToastNotification show={false}/>
			</Container>
		);
	}

	/**
	 * Add new task to UI
	 */
	addTask = () => {
		var tasks = this.state.tasks;
		tasks.push({name: "", time: "", date: null});
		this.setState({tasks: tasks});
	}

	/**
	 * Remove task item from UI
	 * @param {Number} index 
	 */
	hdlDeleteItem = (index) => {
		var tasks = this.state.tasks;
		tasks.splice(index, 1);
		this.setState({tasks: tasks, deleteindex: -1, showDialog: false});
	}

	/**
	 * Update task item in current View
	 * when user edit an item
	 * @param {Number} index
	 * @param {Object} item
	 */
	hdlUpdateItem = (index, item) => {
		var tasks = this.state.tasks;
		item.date = new Date();
		tasks[index] = item;
		this.setState({tasks: tasks});
	}

	/**
	 * Logtime to Excel
	 */
	hdlLogtime = async () => {
		const data = {
			project: this.state.project,
			task_report: this.generateExcelText(this.state.tasks),
		};
		console.log(data);
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		};
		try {
			var response = await fetch(`${server_url}/excel`, requestOptions);
			var result = await response.json();	
			if (result.error) {
				console.error(result.error);
			} else if (result.data) {
				console.log(result.data);
			} else {
				console.log(result);
			}
		} catch(e) {
			alert(e);
		}
	}

	/**
	 * Update file in SVN server
	 */
	hdlUpdateFile = async () => {
		try {
			var response = await fetch(`${server_url}/svn/update`);
			var result = await response.json();	
			if (result.error) {
				console.error(result.error);
			} else if (result.data) {
				console.log(result.data);
			} else {
				console.log(result);
			}
		} catch(e) {
			alert(e);
		}
	}

	/**
	 * Lock / Unlock file
	 * @param {Boolean} isFileLocked 
	 */
	hdlLockReleaseFile = async (isFileLocked) => {
		const command = isFileLocked ? 'unlock' : 'lock';
		try {
			var response = await fetch(`${server_url}/svn/${command}`);
			var result = await response.json();	
			if (result.error) {
				console.error(result.error);
			} else if (result.data) {
				console.log(result.data);
			} else {
				console.log(result);
			}
		} catch(e) {
			alert(e);
		}
	}
	/**
	 * Generate text for logtime
	 * @param {Object} tasks 
	 */
	generateExcelText = (tasks) => {
		// create a String array of tasks
		var txtTasks = tasks.map(task => {
			return `・${task.name} ${task.time}h`;
		});
		return txtTasks.join('\n');
	}
}
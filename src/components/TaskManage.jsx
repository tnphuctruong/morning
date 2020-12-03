import React, {Component} from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import TaskItem from './TaskItem';

export default class TaskManage extends Component {
	state = {
		tasks: [{name: "Aliba"}],
	}

	render() {
		return (
			<Container>
				<h3>Developed by Turong</h3>
				<Row>
					<Col>
						<Button onClick={this.addTask}>Thêm</Button>{' '}
						<Button variant="success">Extra</Button>
					</Col>
				</Row>
				<div style={{padding: "0.3em 0"}}>
					{this.state.tasks.map((item, index) => <TaskItem key={index} />)}
				</div>
			</Container>
		);
	}

	addTask = (e) => {
		var tasks = this.state.tasks;
		tasks.push({name:"", time: "", date: null});
		this.setState({tasks: tasks});
	}
}
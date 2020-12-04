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
		tasks.push({name: tasks.length, time: "", date: null});
		this.setState({tasks: tasks});
	}

	hdlDeleteItem = (index) => {
		var tasks = this.state.tasks;
		tasks.splice(index, 1);
		this.setState({tasks: tasks});
	}

	hdlUpdateItem = (index, item) => {
		var tasks = this.state.tasks;
		tasks[index] = item;
		this.setState({tasks: tasks});
	}
}
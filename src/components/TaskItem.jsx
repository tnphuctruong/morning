import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import './TaskItem.css';

export default class TaskItem extends Component {
	state = this.props.info

	static getDerivedStateFromProps(props, state) {
		return props.info;
	}

	render() {
		const titleRendered = (this.state.name && this.state.time);
		const taskIndex = this.props.index;
		return (
			<Form className="taskItem">
				{/* If task does not have full info */}
				<Form.Label srOnly={titleRendered}>
				<h4>Chưa đặt tên {this.state.name}</h4>
				</Form.Label>
				{/* Render task with working hours */}
				<Form.Label srOnly={!titleRendered}>
					<h4>{`${this.state.name} (${this.state.time} h)`}</h4>
				</Form.Label>
				<Form.Row>
					<Col lg={6}>
						<Form.Text>Task:</Form.Text>
						<Form.Control placeholder="Nhập tên task"
										value={this.state.name}
										onChange={(e) => {
												this.setState({name: e.target.value});
												this.props.onupdate(taskIndex, this.state);
										}}/>
					</Col>
					<Col lg={4}>
						<Form.Text>Thời gian làm task:</Form.Text>
						<Form.Control type="number"
										placeholder="Nhập thời gian làm task"
										value={this.state.time}
										onChange={(e) => {
											this.setState({time: Number(e.target.value)});
											this.props.onupdate(taskIndex, this.state);
											}}
										/>
					</Col>
					<Col lg={2}>
						<Form.Text>&nbsp;</Form.Text>
						<Button variant="danger" onClick={(e) => {this.props.ondelete(taskIndex)}}>Xóa</Button>{' '}
					</Col>
				</Form.Row>
			</Form>
		)
	}
}
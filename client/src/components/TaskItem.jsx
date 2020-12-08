import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import './TaskItem.css';

export default class TaskItem extends Component {
	constructor(props) {
		super(props);
		this.state = props.info;
	}

	render() {
		const titleRendered = (this.props.info.name && this.props.info.time);
		const taskIndex = this.props.index;
		return (
			<Form className="taskItem">
				{/* If task does not have full info */}
				<Form.Label srOnly={titleRendered}>
				<h5>Chưa đặt tên {this.props.index}</h5>
				</Form.Label>
				{/* Render task with working hours */}
				<Form.Label srOnly={!titleRendered}>
					<h5 style={{wordBreak: "break-word"}}>{`${this.props.info.name} (${this.props.info.time} h)`}</h5>
				</Form.Label>
				<Form.Row>
					<Col lg={6}>
						<Form.Text>Task:</Form.Text>
						<Form.Control placeholder="Nhập tên task"
										value={this.props.info.name}
										maxLength={100}
										onChange={(e) => {
												this.setState({name: e.target.value}, () => {
													this.props.onupdate(taskIndex, this.state);
												});
										}}/>
					</Col>
					<Col lg={4}>
						<Form.Text>Thời gian làm task:</Form.Text>
						<Form.Control type="number"
										placeholder="Nhập thời gian làm task"
										value={this.props.info.time}
										onChange={(e) => {
											this.setState({time: Number(e.target.value.slice(0, 2))}, () => {
												this.props.onupdate(taskIndex, this.state);
											});
											}}
										/>
					</Col>
					<Col lg={2}>
						<Form.Text>&nbsp;</Form.Text>
						<Button variant="danger" onClick={(e) => {
													//this.setState({});
													this.props.ondelete(taskIndex)}}>Xóa</Button>{' '}
					</Col>
				</Form.Row>
			</Form>
		)
	}
}
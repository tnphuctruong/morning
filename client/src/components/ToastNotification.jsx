import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'
import {Collapse} from 'react-bootstrap';
import { useState, useEffect} from 'react';

export default function ToastNotification(props) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(props.show);
	}, [props.show]);

	return (
		<Row>
			<Col xs={6}>
				<Toast onClose={() => setShow(false)} show={show} delay={1000} autohide animation transition={Collapse}>
					<Toast.Header>
						<img
						src="holder.js/20x20?text=%20"
						className="rounded mr-2"
						alt=""
						/>
						<strong className="mr-auto">Bootstrap</strong>
						<small>11 mins ago</small>
					</Toast.Header>
					<Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
				</Toast>
			</Col>
			<Col xs={6}>
				<Button onClick={() => setShow(true)}>Show Toast</Button>
			</Col>
		</Row>
	);
	
}
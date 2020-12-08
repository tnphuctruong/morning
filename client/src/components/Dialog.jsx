import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';


export default function Dialog(props) {
	const [show, setShow] = useState(props.show);
	const closeModal = () => setShow(false);
	useEffect(() => {
		setShow(props.show);
	}, [props.show]);
	return (
		<Modal show={show} onHide={closeModal} backdrop="static">
			<Modal.Header closeButton>
				{props.title}
			</Modal.Header>
			<Modal.Body>
				{props.msg}
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={(e) => {closeModal(); props.onCancel(e);}}>Đóng</Button>
				<Button variant="danger" onClick={(e) => props.onOK(e)}>Xóa</Button>
			</Modal.Footer>
		</Modal>
	)
}

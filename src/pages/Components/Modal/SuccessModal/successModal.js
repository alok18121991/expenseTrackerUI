
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SuccessModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Success
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <p>Expense Added</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default SuccessModal;
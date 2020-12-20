import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import MarathonForm from '../MarathonForm/MarathonForm';
import { Modal, Button } from 'react-bootstrap';

export default function CompanyDashboard() {

  const [stateMarathon, setSetMarathon] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const onClickHandler = () => {
    localStorage.removeItem('user');
    window.location = 'http://localhost:3000/main'
  }

  return (
    <div>
      {/*Показывает профиль*/}
      <h3>My Profile</h3>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <button onClick={onClickHandler}>Log Out</button>
        </ListGroup.Item>

        <ListGroup.Item>Username: {user.username}</ListGroup.Item>
        <ListGroup.Item>Company: {user.company}</ListGroup.Item>
        <ListGroup.Item>Email: {user.email}</ListGroup.Item>

        <ListGroup.Item>
          <button onClick={() => setSetMarathon(!stateMarathon)}>Add Marathon</button>
          {stateMarathon ? <MarathonForm /> : null}
        </ListGroup.Item>

        <ListGroup.Item>
          {user.marathons.map(el => (
            <>
              <Button variant="primary" onClick={handleShow}>
                Marathon: {el.title}
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Marathon: {el.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Choose what you want to do with this marathon!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={()=>history.push(`/dashboard/checkMarathon/${el._id}`)}>
                    Check Marathon
                  </Button>
                  <Button variant="primary" onClick={()=>history.push(`/dashboard/editMarathon/${el._id}`)}>
                    Edit Marathon
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ))}
        </ListGroup.Item>


      </ListGroup>
    </div>
  )
}

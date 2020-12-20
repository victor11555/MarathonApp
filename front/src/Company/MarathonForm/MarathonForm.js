import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { marathonURL } from '../../utils/urls';
import { useHistory } from 'react-router-dom';

export default function MarathonForm() {
  const { _id } = JSON.parse(localStorage.getItem('user'))
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    const title = e.target.children[0].children[1].value;
    const start = e.target.children[1].children[1].value;
    const duration = e.target.children[2].children[1].value;
    const description = e.target.children[3].children[1].value;
    const timeResponse = e.target.children[4].children[1].value;
    const deadline = e.target.children[5].children[1].value;
    const timeVideo = e.target.children[6].children[1].value;
    const channelName = e.target.children[7].children[1].value;

    fetch(marathonURL, {
      method: 'POST',
      headers: { 'Content-type': 'Application/json' },
      body: JSON.stringify({ title, start, duration, description, timeResponse, deadline, role: 'company', timeVideo, channelName, _id })
    })
      .then(res => res.json())
      .then(response => {
        if (!response.success) console.log(response.message);
        else {
          const { user } = response;
          localStorage.setItem('user', JSON.stringify(user));
          history.push('/dashboard')
        }
      });
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter the name of the marathon" required pattern="^[a-zA-Z](.[a-zA-Z0-9_-]*)$" />
      </Form.Group>

      <Form.Group controlId="formBasicStartDate">
        <Form.Label>Start date</Form.Label>
        <Form.Control type="datetime-local" required />
      </Form.Group>

      <Form.Group controlId="formBasicDuration">
        <Form.Label>Duration</Form.Label>
        <Form.Control type="number" placeholder="Enter the duration of the marathon " required pattern="^[a-zA-Z](.[a-zA-Z0-9_-]*)$" />
      </Form.Group>

      <Form.Group controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter the description  of the marathon " required pattern="^[a-zA-Z](.[a-zA-Z0-9_-]*)$" />
      </Form.Group>

      <Form.Group controlId="formBasicTimePublicationTasks">
        <Form.Label>Time of publication of tasks</Form.Label>
        <Form.Control type="time" required />
      </Form.Group>

      <Form.Group controlId="formBasicDeadline">
        <Form.Label>Deadline</Form.Label>
        <Form.Control type="time" required />
      </Form.Group>

      <Form.Group controlId="formBasicTimePublicationVideo">
        <Form.Label>Time of publication of video solutions</Form.Label>
        <Form.Control type="time" required />
      </Form.Group>

      <Form.Group controlId="formBasicTelegram">
        <Form.Label>Telegram</Form.Label>
        <Form.Control type="text" placeholder="Enter the name of the telegram channel " required pattern="^[a-zA-Z](.[a-zA-Z0-9_-]*)$" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create marathon
      </Button>
    </Form>
  )
}

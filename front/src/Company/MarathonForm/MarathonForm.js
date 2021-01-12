import React from 'react'
import {Button, Form} from 'react-bootstrap';
import {marathonURL} from '../../utils/urls';
import {useHistory} from 'react-router-dom';

export default function MarathonForm() {
    const {_id, company} = JSON.parse(localStorage.getItem('user'))
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
            headers: {'Content-type': 'Application/json'},
            body: JSON.stringify({
                company,
                title,
                start,
                duration,
                description,
                timeResponse,
                deadline,
                role: 'company',
                timeVideo,
                channelName,
                _id
            })
        })
            .then(res => res.json())
            .then(response => {
                if (!response.success) console.log(response.message);
                else {
                    const {user} = response;
                    localStorage.setItem('user', JSON.stringify(user));
                    const id = user.marathons[user.marathons.length - 1]._id
                    history.push(`/dashboard/addTask/${id}`)
                }
            });
    }

    return (
        <Form style={{maxWidth: '70%', paddingLeft: '25%'}} onSubmit={submitHandler}>

            <Form.Group controlId="formBasicTitle">
                <Form.Label style={{padding: '5px', fontWeight: '800'}}>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter the name of the marathon" required/>
            </Form.Group>

            <Form.Group controlId="formBasicStartDate">
                <Form.Label style={{padding: '5px', fontWeight: '800'}}>Start date</Form.Label>
                <Form.Control type="datetime-local" required/>
            </Form.Group>

            <Form.Group controlId="formBasicDuration">
                <Form.Label style={{padding: '5px', fontWeight: '800'}}>Duration</Form.Label>
                <Form.Control type="number" placeholder="Enter the duration of the marathon " required/>
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
                <Form.Label style={{padding: '5px', fontWeight: '800'}}>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter the description  of the marathon " required/>
            </Form.Group>

            <Form.Group controlId="formBasicTimePublicationTasks">
                <Form.Label style={{padding: '5px', fontWeight: '800'}}>Time of publication of tasks</Form.Label>
                <Form.Control type="time" required/>
            </Form.Group>

            <Form.Group controlId="formBasicDeadline">
                <Form.Label style={{padding: '5px', fontWeight: '800'}}>Deadline</Form.Label>
                <Form.Control type="time" required/>
            </Form.Group>

            <Form.Group controlId="formBasicTimePublicationVideo">
                <Form.Label style={{padding: '5px', fontWeight: '800'}}>Time of publication of video
                    solutions</Form.Label>
                <Form.Control type="time" required/>
            </Form.Group>

            <Form.Group controlId="formBasicTelegram">
                <Form.Label style={{padding: '5px', fontWeight: '800'}}>Telegram</Form.Label>
                <Form.Control type="text" placeholder="Name of the telegram channel WITHOUT @ " required
                              pattern="(?s)^((?!@).)*$"/>
            </Form.Group>

            <Button style={{margin: '20px'}} className='btn btn-danger ml-2 mt-2' variant="primary" type="submit">
                Create marathon
            </Button>

        </Form>

    )
}

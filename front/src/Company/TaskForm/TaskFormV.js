import React from 'react';
import {Button, Form} from "react-bootstrap";
import {addTaskUrl} from "../../utils/urls";

function TaskFormV({day, marathon, userId, newTaskHandler}) {

    const submitHandler = (e) => {
        e.preventDefault();
        const description = e.target.children[0].children[1].value;
        const solution = e.target.children[1].children[1].value;
        fetch(addTaskUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify({description, solution, day, marathon, userId}),
        })
            .then(res => res.json())
            .then(response => {
                if (!response.success) console.log(response.message);
                else {
                    const {user} = response;
                    localStorage.setItem('user', JSON.stringify(user));
                    e.target.children[0].children[1].value = '';
                    e.target.children[1].children[1].value = '';
                    newTaskHandler(day - 1)
                }
            });
    }
    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='formBasicDescription'>
                <Form.Label style={{fontWeight: '800'}}>Task</Form.Label>
                <Form.Control type='text' placeholder='Enter description' required/>
            </Form.Group>

            <Form.Group controlId='formBasicUrl'>
                <Form.Label style={{fontWeight: '800'}}>Solution</Form.Label>
                <Form.Control type='text' placeholder='Url of solution' required/>
            </Form.Group>

            <Button style={{marginBottom: '15px'}} className='btn btn-danger ml mt-2' variant='primary' type='submit'>
                Add!
            </Button>
        </Form>
    );
}

export default TaskFormV;

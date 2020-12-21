import React from 'react';
import {Button, Form} from "react-bootstrap";
import {addTaskUrl} from "../../utils/urls";

function TaskForm({ day, marathon, userId}) {
    const submitHandler = (e) => {
        e.preventDefault();
        const description = e.target.children[0].children[1].value;
        const solution = e.target.children[1].children[1].value;
        fetch(addTaskUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify({ description, solution, day, marathon, userId }),
        })
            .then(res => res.json())
            .then(response => {
                if (!response.success) console.log(response.message);
                else {
                    const { user } = response;
                    localStorage.setItem('user', JSON.stringify(user));
                }
            });
    }
    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='formBasicDescription'>
                <Form.Label>Task</Form.Label>
                <Form.Control type='text' placeholder='Enter description' required/>
            </Form.Group>

            <Form.Group controlId='formBasicUrl'>
                <Form.Label>Solution</Form.Label>
                <Form.Control type='text' placeholder='Url of solution' required />
            </Form.Group>

            <Button variant='primary' type='submit'>
                Add Task
            </Button>
        </Form>
    );
}

export default TaskForm;

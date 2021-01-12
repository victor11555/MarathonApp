import React from 'react'
import {Button, Form} from 'react-bootstrap';
import {signUpURL} from '../../utils/urls';

export default function StudentSignUpForm() {
    const submitHandler = (e) => {
        e.preventDefault();
        const username = e.target.children[0].children[1].value;
        const email = e.target.children[1].children[1].value;
        const password = e.target.children[2].children[1].value;
        const tlg = e.target.children[3].children[1].value;

        fetch(signUpURL, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify({username, email, password, tlg, role: 'student'})
        })
            .then(res => res.json())
            .then(response => {
                if (!response.success) alert(response.message);
                else {
                    const {user} = response;
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location = 'http://localhost:3000/main'
                }
            });
    }

    return (
        <>
            <Form className='d-flex flex-column' onSubmit={submitHandler}>
                <Form.Group controlId="formBasicUserName">
                    <Form.Label className='font-weight-bolder'>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" required
                                  pattern="^[a-zA-Z](.[a-zA-Z0-9_-]*)$"/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label className='font-weight-bolder'>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required
                                  pattern="[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+"/>
                    <Form.Text className="font-weight-bolder">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label className='font-weight-bolder'>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required/>
                </Form.Group>

                <Form.Group controlId="formBasicTelegram">
                    <Form.Label className='font-weight-bolder'>Telegram</Form.Label>
                    <Form.Control type="text" placeholder="Add your telegram" required/>
                </Form.Group>


                <Button className='font-weight-bolder' variant="danger" type="submit">
                    Sign Up
                </Button>
            </Form>
        </>
    )
}


import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { loginURL } from '../../utils/urls';
import {useHistory} from "react-router-dom";

export default function CompanyLoginForm() {
    const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.children[0].children[1].value;
    const password = e.target.children[1].children[1].value;

    fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify({ email, password, role: 'company' }),
    })
      .then(res => res.json())
      .then(response => {
        if (!response.success) console.log(response.message);
        else {
          const { user } = response;
          localStorage.setItem('user', JSON.stringify(user));
          history.push('/')
        }
      });
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control type='email' placeholder='Enter email' required
                      pattern='[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+' />
        <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' required />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Log In
      </Button>
    </Form>
  );
}


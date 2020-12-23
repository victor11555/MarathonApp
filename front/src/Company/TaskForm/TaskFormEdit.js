import React from 'react';
import { Button, Form } from "react-bootstrap";
import { editTaskUrl } from "../../utils/urls";

function TaskForm({ day, marathon, userId, task, editHandler }) {
  

  // console.log(marathon.tasks[day].task[0].description);

 


  const taskIDes = marathon.tasks[day-1].task.map((el,i)=>el._id) 
  

    const submitHandler = (e) => {
        e.preventDefault();
        
        const description = e.target.children[0].children[1].value;
        const solution = e.target.children[1].children[1].value;

        fetch(editTaskUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify({ description, solution, day, marathon, userId, taskID: task._id }),
            
        })
            .then(res => res.json())
            .then(response => {
                if (!response.success) console.log(response.message);
                else {
                    const { user } = response;
                    localStorage.setItem('user', JSON.stringify(user));
                    editHandler()
                  
                }
            });
    }

    return (
      <>
     
     
        
        

        <Form onSubmit={submitHandler }>
         
          
            <Form.Group controlId='formBasicDescription'>
                <Form.Label>Task</Form.Label>
                <Form.Control type='text' placeholder='New description' defaultValue={task.description} required />
            </Form.Group>

            <Form.Group controlId='formBasicUrl'>
                <Form.Label>URL</Form.Label>
                <Form.Control type='text' placeholder='New url of solution' defaultValue={task.solution} required />
            </Form.Group>

            <Button variant='primary' type='submit'>
               Edit Task
            </Button>
        </Form>

    
       </> 
    );
}

export default TaskForm;

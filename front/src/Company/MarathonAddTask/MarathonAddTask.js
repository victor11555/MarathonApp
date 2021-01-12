import React, {useState} from 'react';
import {Accordion, Card} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import TaskFormV from "../TaskForm/TaskFormV";

export default function MarathonAddTask() {
    const {id} = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const {marathons} = user;
    const marathon = marathons.filter(el => el._id === id)[0];
    const [state, setState] = useState(null);
    const newTaskHandler = (index) => {
        state === null ? setState(index) : setState(null)
    }

    const day = (index) => {
        return (
            <div style={{paddingLeft: '20%'}}>
                <Card style={{maxWidth: '60%'}} key={Math.random()}>
                    <Accordion.Toggle as={Card.Header} eventKey={`${index + 1}`}>
                        Day <span style={{padding: '5px', fontWeight: '800'}}>{index + 1}</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`${index + 1}`}>
                        <Card.Body>
                            {state === index ? null :
                                <button className={'btn ml mt-1 btn-outline-danger'} style={{marginBottom: '5px'}}
                                        onClick={(e) => newTaskHandler(index)}>Add Task
                                </button>}
                            {state === index ? <TaskFormV day={index + 1} userId={user._id} marathon={marathon}
                                                          newTaskHandler={newTaskHandler}/> : null}
                            {marathon.tasks[index].task.map((task, i) =>
                                <>
                                    <div style={{fontWeight: '800', marginTop: '10px'}}>Task {i + 1}</div>
                                    <div style={{marginTop: '5px'}}>Description: <span
                                        style={{padding: '5px', fontWeight: '800'}}>{task.description}</span></div>
                                </>
                            )}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card></div>
        )
    }


    let arr = []
    for (let i = 0; i < marathon.duration; i += 1) {
        arr.push(i)
    }

    return (
        <>
            <div style={{padding: '5px', fontWeight: '800', margin: '10px'}}>Marathon: <span
                style={{padding: '5px', fontWeight: '800', margin: '10px'}}>{marathon.title}</span></div>
            <Accordion defaultActiveKey="0">
                {arr.map((el, index) =>
                    <>{day(index)}</>
                )}
            </Accordion>

        </>
    )
}

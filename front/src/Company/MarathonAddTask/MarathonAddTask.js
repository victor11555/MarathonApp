import React, {useState} from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TaskForm from "../TaskForm/TaskForm";

export default function MarathonAddTask({ }) {
    const { id } = useParams();
    const { marathons } = JSON.parse(localStorage.getItem('user'));
    const marathon = marathons.filter(el => el._id === id)[0];
    const [state, setState] = useState(null);

    const day = (index) => {
        return (
            <Card key={Math.random()}>
                <Accordion.Toggle as={Card.Header} eventKey={`${index + 1}`}>
                    Day {index + 1}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={`${index + 1}`}>
                    <Card.Body>
                        <button onClick={() => setState(index)}>Добавить задание</button>
                        {state === index ? <TaskForm day={index+1} marathon={marathon} /> : null}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    }


    let arr = []
    for (let i = 0; i < marathon.duration; i += 1) {
        arr.push(i)
    }

    return (
        <>
            <div>Marathon: {marathon.title} </div>
            <Accordion defaultActiveKey="0">
                {arr.map((el, index) =>
                    <>{day(index)}</>
                )}
            </Accordion>

        </>
    )
}

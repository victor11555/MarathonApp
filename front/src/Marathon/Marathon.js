import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Marathon({ }) {
    const { id } = useParams();
    const { marathons } = JSON.parse(localStorage.getItem('user'));
    console.log( marathons);
    const marathon = marathons.filter(el => el._id === id)[0];
    console.log(marathon);
    const day = (index) => {
        return (
            <Card key={Math.random()}>
                <Accordion.Toggle as={Card.Header} eventKey={`${index + 1}`}>
                    Day {index + 1}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={`${index + 1}`}>
                    <Card.Body><button onClick={() => console.log()}>Добавить задание</button></Card.Body>
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

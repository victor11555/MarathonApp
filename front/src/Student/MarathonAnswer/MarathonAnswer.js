import React from 'react'
import {useParams} from "react-router-dom";
import {ListGroup} from "react-bootstrap";

export default function MarathonAnswer() {

    const { id } = useParams();
    const { marathons } = JSON.parse(localStorage.getItem('user'));
    const marathon = marathons.filter((el) => el._id === id)[0];

    return (
        <ListGroup variant="flush">
            <ListGroup.Item>Marathon: {marathon.title}</ListGroup.Item>
            <ListGroup.Item>
                <ul>
                    {marathon.tasks.map((el, index) =>
                        <li>
                            <div>Day{el.day}</div>
                            <ul>
                                {el.task.map((task, i) =>
                                    <li>
                                        <div>Task{i+1}</div>
                                        <div>Description: {task.description}</div>
                                        <form></form>
                                    </li>)}
                            </ul>
                        </li>
                    )}
                </ul>
            </ListGroup.Item>
        </ListGroup>
    )
}

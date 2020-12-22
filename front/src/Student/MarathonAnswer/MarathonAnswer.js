import React from 'react'
import {useParams} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import {answerUrl} from "../../utils/urls";
import Checker from '../../utils/class';
import FeedBack from "../FeedBack/FeedBack";

export default function MarathonAnswer() {
    const checker = new Checker();
    const {id} = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const {marathons} = user;
    const marathon = marathons.filter((el) => el._id === id)[0];

    const submitHandler = (e, day, task, taskId) => {
        e.preventDefault();
        const answer = e.target.children[0].value;
        fetch(answerUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify({answer, marathon: id, userId: user._id, day, task, taskId}),
        })
            .then(res => res.json())
            .then(response => {
                if (!response.success) console.log(response.message);
                else {
                    const {user} = response;
                    localStorage.setItem('user', JSON.stringify(user));
                }
            });
    }


    if (checker.checkMarathonStarted(marathon._id,)) return (
        <ListGroup variant="flush">
            <ListGroup.Item>Marathon: {marathon.title}</ListGroup.Item>
            <ListGroup.Item>
                <button onClick={(e) => {
                    e.preventDefault();
                    window.open(`https://t.me/${marathon.channelName}`, '_blank');
                }
                }>To Telegram
                </button>
            </ListGroup.Item>
            <ListGroup.Item>
                <ul>
                    {marathon.tasks.map((el) => {
                        if (!checker.checkCanPass(marathon._id, el.day)) {
                            return (
                                <ListGroup.Item>Tasks of the {el.day} day will be piblished
                                    in {el.day - 1} day(s)</ListGroup.Item>
                            )
                        } else if (checker.checkCanPass(marathon._id, el.day) && checker.checkDeadline(marathon._id, el.day) )
                            return (
                                <li>
                                    <div>Day{el.day}</div>
                                    <ul>
                                        {el.task.map((task, i) => {
                                            if (!checker.checkAnswer(marathon._id, user._id, el.day, i)) {
                                                return (
                                                    <li>
                                                        <div>Task{i + 1}</div>
                                                        <div>Description: {task.description}</div>
                                                        <form onSubmit={e => submitHandler(e, el.day, i + 1, task._id)}>
                                                            <input placeholder={'Your solution'}/>
                                                            <button type={'submit'}>Send</button>
                                                        </form>
                                                    </li>
                                                )
                                            } else if (!checker.checkFeedback(marathon._id, user._id, task._id)) {
                                                return (
                                                <li>
                                                    <div>Task{i + 1}</div>
                                                    <div>Ожидайте</div>
                                                </li>
                                                )
                                            } else {
                                                return (
                                                    <FeedBack/>
                                                )
                                            }
                                        })}
                                    </ul>
                                </li>
                            )
                        // else if (!checker.checkDeadline(marathon._id, el.day) && !checker.checkAnswer(marathon._id, user._id, el.day)) {
                        //
                        // }
                    })}
                </ul>
            </ListGroup.Item>
        </ListGroup>
    )
    else {
        return (
            <ListGroup variant="flush">
                <ListGroup.Item>Marathon: {marathon.title}</ListGroup.Item>
                <ListGroup.Item>Марафон еще не начался</ListGroup.Item>
            </ListGroup>
        )
    }
}

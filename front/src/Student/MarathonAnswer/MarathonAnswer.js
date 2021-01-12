import React, {useState} from 'react'
import {useParams} from "react-router-dom";
import {Button, ListGroup} from "react-bootstrap";
import {answerUrl} from "../../utils/urls";
import Checker from '../../utils/class';
import style from './MarathonAnswer.module.css'

export default function MarathonAnswer() {
    const checker = new Checker();
    const {id} = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const {marathons, _id} = user;
    const marathon = marathons.filter((el) => el._id === id)[0];
    const [state, setState] = useState(null)

    const submitHandler = (e, day, task, taskId) => {
        e.preventDefault();
        setState(task - 1)
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
        <>
            <div style={{position: 'relative'}}>
                <div className={`${style.img}`} style={{height: '100hv', width: '100vw'}}>
                    <div className={`${style.rgba}`} style={{height: '100vh'}}></div>
                </div>
                <div style={{margin: '50px'}}>
                    <h1 className={`text-center mt-3 mb-3 ${style.title}`}>Marathon: {marathon.title}</h1>
                    <div className='d-flex align-items-center justify-content-center'>
                        <h3 className='text-center mt-3 mb-3'>Your points: {user.points}</h3>
                        <Button style={{margin: '0 25px'}} className='btn font-weight-bolder' variant="danger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open(`https://t.me/${marathon.channelName}`, '_blank');
                                }
                                }>To Telegram
                        </Button>
                    </div>
                </div>
                <ListGroup className='d-flex align-items-center justify-content-center' variant="flush">
                    <div style={{width: '80vh'}}
                         className='d-flex align-items-center justify-content-center flex-column'>
                        <ul>
                            {marathon.tasks.map((el) => {
                                if (!checker.checkCanPass(marathon._id, el.day)) {
                                    if (el.day - 1 === 0) return (
                                        <ListGroup.Item style={{margin: '10px 0'}}>Tasks of the {el.day} day will be
                                            piblished
                                            in {marathon.timeResponse} </ListGroup.Item>
                                    )
                                    return (
                                        <ListGroup.Item style={{margin: '10px 0'}}>Tasks of the {el.day} day will be
                                            piblished
                                            in {el.day - 1} day(s)</ListGroup.Item>
                                    )
                                } else if (checker.checkDeadline(marathon._id, el.day))
                                    return (
                                        <div className={` ${style.rgba}`}>
                                            <li style={{padding: '7px'}}
                                                className='d-flex align-items-center justify-content-center'>
                                                <div className='font-weight-bold'>Day {el.day}</div>
                                                <ul>
                                                    {el.task.map((task, i) => {
                                                        if (!checker.checkAnswer(marathon._id, user._id, el.day, i)) {
                                                            return (
                                                                <li>
                                                                    <div style={{margin: '3px'}}
                                                                         className='fw-normal'>Task {i + 1}</div>
                                                                    <div
                                                                        style={{margin: '3px'}}>Description: {task.description}</div>
                                                                    {state === i ? null : <form
                                                                        onSubmit={e => submitHandler(e, el.day, i + 1, task._id)}>
                                                                        <input placeholder={'Your solution'}/>
                                                                        <button style={{margin: '0 15px'}}
                                                                                className='btn btn-outline-danger'
                                                                                type={'submit'}>Send
                                                                        </button>
                                                                    </form>}
                                                                </li>
                                                            )
                                                        } else if (!checker.checkFeedback(marathon._id, user._id, el.day, i)) {
                                                            return (
                                                                <li>
                                                                    <div className='font-weight-bold'>Task{i + 1}</div>
                                                                    <div>Ожидайте</div>
                                                                </li>
                                                            )
                                                        } else if (!checker.checkTimeVideo(marathon._id, el.day)) {
                                                            return (
                                                                <li>
                                                                    <div className='font-weight-bold'>Task{i + 1}</div>
                                                                    <div>
                                                                        Comment: {task.feedbacks[0].comment}<br/>
                                                                        Points: {task.feedbacks[0].points}<br/>
                                                                    </div>
                                                                </li>
                                                            )
                                                        } else {
                                                            return (
                                                                <li>
                                                                    <div>Task{i + 1}</div>
                                                                    <ListGroup.Item>
                                                                        Comment: {task.feedbacks[0].comment}<br/>
                                                                        Points: {task.feedbacks[0].points}<br/>
                                                                        Video solution: {task.solution}
                                                                    </ListGroup.Item>
                                                                </li>
                                                            )
                                                        }
                                                    })}
                                                </ul>
                                            </li>
                                        </div>
                                    )
                                else if (!checker.checkDeadline(marathon._id, el.day) && !checker.checkAnswer(marathon._id, user._id, el.day)) {
                                    return (
                                        <div>удалить его </div>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                </ListGroup>
            </div>
        </>
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

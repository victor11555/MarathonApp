import React, { useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TaskFormEdit from "../TaskForm/TaskFormEdit";
import { delTaskUrl } from "../../utils/urls";
import TaskFormV from "../TaskForm/TaskFormV";


export default function MarathonEdit({}) {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const { marathons } = user;
  const marathon = marathons.filter((el) => el._id === id)[0];
  const [state, setState] = useState(null);
  const [newState, setNewState] = useState(null)
  const [show, setShow] = useState(null);
  const [hide, setHide] = useState(null)
  const hider = { display: "none" };

  const editHandler = (e, index, i) => {
    console.log(index, i)
    setShow(index);
    setHide(i)
    state === null ? setState(i) : setState(null);
  };

  const delHandler = (e, task) => {
    e.preventDefault();
    console.log(task);

    fetch(delTaskUrl, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({ taskId: task._id, userId: user._id }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (!response.success) console.log(response.message);
        else {
          const { user } = response;
          localStorage.setItem("user", JSON.stringify(user));
          setShow(!show);
        }
      });
  };

  const newTaskHandler = (index ) => {
    // console.log(index);
    
    newState === null ? setNewState(index) : setNewState(null) 
    
  
  }

  const day = (index) => {
    return (
      <Card key={Math.random()}>
        <Accordion.Toggle as={Card.Header} eventKey={`${index + 1}`}>
          Day {index + 1}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={`${index + 1}`}>
          <Card.Body>
          {newState===index ? null : <button
                 
                  onClick={(e)=> newTaskHandler(index)}
                >
                  Add new task
                </button>}
              
            {newState===index ? (<TaskFormV day={index+1} marathon={marathon} userId={user._id} newTaskHandler={newTaskHandler}/>) : null}
            {marathon.tasks[index].task.map((task, i) => (
              <>
                <div style={(show===index && hide===i) ? hider : null}>
                  <div>
                    Day {index + 1 } >=>=>=>=> task {i + 1}
                  </div>
                  <div>Description: {task.description}</div>
                  <div>Solution: {task.solution}</div>
                </div>
                <button
                  style={show===index && hide===i? hider : null}
                  onClick={(e) => editHandler(e, index, i)}
                >
                  Edit Task
                </button>
                {state === i && show === index ? (
                  <TaskFormEdit
                    day={index + 1}
                    userId={user._id}
                    marathon={marathon}
                    task={task}
                    editHandler={editHandler}
                  />
                ) : null}
                <button
                  onClick={(e) => {
                    delHandler(e, task);
                  }}
                >
                  Delete task
                </button>
              </>
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  };

  let arr = [];
  for (let i = 0; i < marathon.duration; i += 1) {
    arr.push(i);
  }

  return (
    <>
      <div>Marathon: {marathon.title} </div>
      <Accordion defaultActiveKey="0">
        {arr.map((el, index) => (
          <>{day(index)}
  
          </>
        ))}
      </Accordion>
    </>
  );
}

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
      <div style={{paddingLeft: '20%'}}>
      <Card style={{maxWidth: '60%'}}key={Math.random()}>
        <Accordion.Toggle as={Card.Header} eventKey={`${index + 1}`}>
          <span style={{padding: '10px', fontWeight: '800'}}>Day {index + 1}</span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={`${index + 1}`}>
          <Card.Body>
          {newState===index ? null : <button className={'btn ml mt-1 btn-outline-danger'} style={{marginBottom:'5px'}}
                 
                  onClick={(e)=> newTaskHandler(index)}
                >
                  Add new task
                 
                </button>}
              
            {newState===index ? (<TaskFormV day={index+1} marathon={marathon} userId={user._id} newTaskHandler={newTaskHandler}/>) : null}
            {marathon.tasks[index].task.map((task, i) => (
              <>
                <div style={(show===index && hide===i) ? hider : null}>
                  <div>
                    <br/>
                   <span style={{fontWeight: '800'}}>Day {index + 1 } <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
  <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg> task {i + 1}</span> 

                  </div>
                  
                  <div><span>Description</span>: <span style={{padding: '10px', fontWeight: '800'}}>{task.description}</span></div>
                  <div>Solution: <span style={{padding: '10px', fontWeight: '800'}}>{task.solution}</span></div>
                  <br/>
                </div>
                <button className={'btn btn-outline-info'} style={{marginTop: '10px'}}
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
                <button style={{marginLeft: '10px'}}className={'btn btn-outline-danger'}
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
      </div>
    );
  };

  let arr = [];
  for (let i = 0; i < marathon.duration; i += 1) {
    arr.push(i);
  }

  return (
    <>
      <div style={{margin: '20px', paddingLeft: '10%'}}
      >Marathon: <span  style={{padding: '5px', fontWeight: '800'}} >{marathon.title}</span> </div>
      <Accordion defaultActiveKey="0">
        {arr.map((el, index) => (
          <>{day(index)}
  
          </>
        ))}
      </Accordion>
    </>
  );
}

import {Route, Switch} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import MainPage from './pages/MainPage/MainPage';
import MarathonAddTask from './Company/MarathonAddTask/MarathonAddTask';
import MarathonEdit from './Company/MarathonEdit/MarathonEdit';
import MarathonCheck from './Company/MarathonCheck/MarathonCheck';
import MarathonAnswer from "./Student/MarathonAnswer/MarathonAnswer";

function App() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path='/dashboard' component={DashboardPage}/>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/signup' component={SignUpPage}/>
                <Route exact path='/main' component={MainPage}/>
                <Route exact path='/dashboard/editMarathon/:id' component={MarathonEdit}/>
                <Route exact path='/dashboard/checkMarathon/:id' component={MarathonCheck}/>
                <Route exact path='/dashboard/addTask/:id' component={MarathonAddTask}/>
                <Route exact path='/dashboard/answerMarathon/:id' component={MarathonAnswer}/>
            </Switch>
        </>
    );
}

export default App;

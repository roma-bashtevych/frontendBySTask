import {Route, Switch, BrowserRouter as Router, Redirect} from "react-router-dom";
import CreateUser from "../components/users/createUser/CreateUser";
import Users from "../components/users/Users";
import UpdateUser from "../components/users/UpdateUser/UpdateUser";
import Login from "../components/login/Login";
import {useSelector} from "react-redux";

export default function UserRoutes() {
    const { user } = useSelector(store => store.usersReducer);
    const userObj = user._id ? user : JSON.parse(localStorage.getItem("user"));

    if (userObj) {
        return (
            <Router>
                <Switch>
                    <Route exact path={'/'} render={() => {
                        return <Users/>
                    }}/>

                    <Route path={'/create'} render={() => {
                        return <CreateUser/>
                    }}/>

                    <Route path={'/update'} render={() => {
                        return <UpdateUser/>
                    }}/>

                </Switch>
            </Router>
        )
    }
    return (
        <Router>
            <Switch>
                <Route path={'/login'} render={() => {
                    return <Login/>
                }}/>

                <Route path={'/registration'} render={() => {
                    return <CreateUser/>
                }}/>

                <Redirect to={'/login'}/>
            </Switch>
        </Router>
    )
}

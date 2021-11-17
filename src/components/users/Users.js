import './Users.css';
import {useEffect, useState} from "react";
import {getAllUsers} from "../../services/user.services";
import {useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import User from "./user/User";
import LogOut from "../logOut/logOut";
import Error from "../error/Error";
import { setAllUsers } from '../../redux/actions'

export default function Users() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    const { user, toggle } = useSelector(store => store.usersReducer);
    const userObj = user._id ? user : JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getAllUsers().then(resp => {
            setUsers(resp.data)
            dispatch(setAllUsers(resp.data))
        }).catch((err) => {
            setError(err.response.data.message)
        });
    }, [toggle, dispatch]);

    return (
        <div className={'users'}>
            <Error error={error} setError={setError}/>
            <div className={'users__nav'}>
                <button className={'users__btn-update btn'} onClick={() => {
                    history.push('/update');
                }}>update user
                </button>
                {
                    userObj?.role === 'admin' ?
                        <button className={'users__btn btn'} onClick={() => {
                            history.push('/create');
                        }}>create user
                        </button> : null
                }
                <LogOut/>
            </div>
            <div className={'users__list'}>
                <h3 className={'users__item'}>username</h3>
                <h3 className={'users__item'}>first name</h3>
                <h3 className={'users__item'}>last name</h3>
                <h3 className={'users__item'}>email</h3>
                <h3 className={'users__item'}>type</h3>
            </div>
            <div>
                {
                    users?.map(user => <User key={user._id} oneUser={user}/>)
                }
            </div>
        </div>
    )
}

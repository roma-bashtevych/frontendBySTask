import './CreateUser.css';
import {useState} from "react";
import {createUser} from "../../../services/user.services";
import {useHistory} from "react-router-dom";
import Input from "../../input/Input";
import Error from "../../error/Error";
import {useSelector} from "react-redux";

export default function CreateUser() {
    const history = useHistory();
    const { user } = useSelector(store => store.usersReducer);
    const userObj = user._id ? user : JSON.parse(localStorage.getItem("user"));

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('driver');
    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState('');
    const roles = ['admin', 'driver'];

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const resp = await createUser({ username, firstName, lastName, email, password, role });
            setUsername('')
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
            userObj ? history.push('/') : history.push('/login');

        } catch (err) {
            setError(err.response.data.message)
        }
    }

    return (
        <div className={'create'}>
            <Error error={error} setError={setError}/>
            <form className={'form'} action="/users" method={'post'} onSubmit={handleSubmit}>
                <h2 className={'form__title'}>Created user form</h2>
                <Input type={'text'}
                       name={'username'}
                       value={username}
                       onChange={setUsername}
                       placeholder={'Please enter username'}/>
                <Input type={'text'} name={'firstName'} value={firstName}
                       onChange={setFirstName}
                       placeholder={'Please enter first name'}/>
                <Input type={'text'} name={'lastName'} value={lastName}
                       onChange={setLastName}
                       placeholder={'Please enter last name'}/>
                <Input type={'email'} name={'email'} value={email}
                       onChange={setEmail}
                       placeholder={'Please enter email'}/>
                <Input type={'password'} name={'password'} value={password}
                       onChange={setPassword}
                       placeholder={'Please enter password'}/>
                {
                    userObj?.role === 'admin' ?
                        <label className={'form__label-role'} htmlFor="'role">
                            <Input type={'text'} name={'role'} placeholder={'Please enter role'}
                                   value={role}
                                   onChange={setRole}
                                   toggle={toggle}
                                   setToggle={setToggle}/>
                            <ul className={'form__role'}>
                                {
                                    toggle && roles.map((value, index) => {
                                        return (
                                            <li className={'form__role-item'} key={index} onClick={(e) => {
                                                setRole(e.target.textContent)
                                                setToggle(!toggle);
                                            }}>{value}</li>
                                        )
                                    })
                                }
                            </ul>
                        </label> : null
                }
                <button className={'btn'} type={'submit'}
                        disabled={!email && !password && !username && !firstName && !lastName}>send
                </button>
            </form>
        </div>
    )
}

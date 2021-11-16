import Input from "../../input/Input";
import {useState} from "react";
import {updateUserById} from "../../../services/user.services";
import {useHistory} from "react-router-dom";
import Error from "../../error/Error";
import {useSelector} from "react-redux";

export default function UpdateUser() {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const { user } = useSelector(store => store.usersReducer);
    const userObj = user._id ? user : JSON.parse(localStorage.getItem("user"));

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const resp = await updateUserById(userObj._id, { username, firstName, lastName, email });
            setUsername('')
            setEmail('');
            setFirstName('');
            setLastName('');
            history.push('/');

        } catch (err) {
            setError(err.response.data.message)
        }
    }

    return (
        <form className={'form'} onSubmit={handleSubmit}>
            <Error error={error} setError={setError}/>
            <h2 className={'form__title'}> update user form</h2>
            <Input type={'text'}
                   name={'username'}
                   value={username}
                   onChange={setUsername}
                   placeholder={userObj.username}/>
            <Input type={'text'} name={'firstName'} value={firstName}
                   onChange={setFirstName}
                   placeholder={userObj.firstName}/>
            <Input type={'text'} name={'lastName'} value={lastName}
                   onChange={setLastName}
                   placeholder={userObj.lastName}/>
            <Input type={'email'} name={'email'} value={email}
                   onChange={setEmail}
                   placeholder={userObj.email}/>
            <button className={'btn'} type={'submit'}>send</button>
        </form>
    )
}

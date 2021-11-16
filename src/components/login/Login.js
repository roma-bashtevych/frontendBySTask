import Input from "../input/Input";
import {useState} from "react";
import {authUser} from "../../services/user.services";
import Error from "../error/Error";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const hundleSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await authUser({ username, password });
            dispatch({ type: 'USER', payload: resp.data.user });
            localStorage.setItem('user', JSON.stringify(resp.data.user));
            localStorage.setItem('access_token', resp.data.access_token);
            localStorage.setItem('refresh_token', resp.data.refresh_token);
            history.push('/')
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    return (
        <>
            <Error error={error} setError={setError}/>
            <form className={'form'} onSubmit={hundleSubmit}>
                <h2 className="form__title">Login</h2>
                <Input name={'username'} type={'text'} placeholder={'please enter username'}
                       value={username}
                       onChange={setUsername}/>
                <Input name={'password'} type={'password'} placeholder={'please enter password'}
                       value={password}
                       onChange={setPassword}/>
                <button disabled={!username && !password} className={'btn'}>login</button>
                <button className={'btn'} onClick={() => {
                    history.push('/registration')
                }}>registration
                </button>
            </form>
        </>
    )
}

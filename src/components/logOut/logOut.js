import {logOutUser} from "../../services/user.services";
import {useDispatch} from "react-redux";

export default function LogOut() {
    const dispatch = useDispatch();

    const logOut = async () => {
        try {
            const resp = await logOutUser()
            if (resp.status === 204) {
                dispatch({ type: 'LOG_OUT_USER' });
                localStorage.clear();
                window.location.href = '/login'
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <button className={'users__btn-logout btn'} onClick={logOut}>log out
        </button>
    )
}

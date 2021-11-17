import {logOutUser} from "../../services/user.services";
import {useDispatch} from "react-redux";
import { exit } from '../../redux/actions'

export default function LogOut() {
    const dispatch = useDispatch();

    const logOut = async () => {
        try {
            const resp = await logOutUser()
            if (resp.status === 204) {
                dispatch(exit());
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

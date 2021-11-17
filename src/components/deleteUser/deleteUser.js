import {deleteUserById} from "../../services/user.services";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {setToggle} from '../../redux/actions'

export default function DeleteUser({ userLogin, user }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { toggle } = useSelector(store => store.usersReducer);

    const deleteUser = async () => {
        const resp = await deleteUserById(user._id);
        dispatch(setToggle(!toggle))
        if (user._id === userLogin._id) {
            dispatch({ type: 'LOG_OUT_USER' });
            localStorage.clear();
            history.push('/registration')
        }
    }
    return (
        <button className={'user__btn btn'} onClick={deleteUser}>delete</button>
    )
}

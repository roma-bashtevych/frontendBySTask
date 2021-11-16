import './User.css';
import {useSelector} from "react-redux";
import DeleteUser from "../../deleteUser/deleteUser";

export default function User({ oneUser }) {
    const { user } = useSelector(store => store.usersReducer);
    const userObj = user._id ? user : JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <div className={'user'}>
                <h3 className={'user__item'}>{oneUser.username}</h3>
                <h3 className={'user__item'}>{oneUser.firstName}</h3>
                <h3 className={'user__item'}>{oneUser.lastName}</h3>
                <h3 className={'user__item'}>{oneUser.email}</h3>
                <h3 className={'user__item'}>{oneUser.role}</h3>
                <div>
                    {
                        userObj?.role === 'admin' || userObj._id === oneUser._id ?
                            <DeleteUser user={oneUser} userLogin={userObj}/>
                            : null
                    }
                </div>
            </div>

        </>
    )
}

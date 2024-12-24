import { useEffect, useState } from "react";
import UsersList from "../../components/usersList";
import { UseAllGetUsers } from "../../api";

const Users = () =>{
    const [userDetails, setUserDetails] = useState([]);
    const getAllUsers = async() =>{
        const page = 1;
        const userData = await UseAllGetUsers(page);
        setUserDetails(userData);
    }
    useEffect(() =>{
        getAllUsers()
    },[userDetails] )

    return(
        <>
            <UsersList users={userDetails}/>
        </>
    )
}
export default Users;
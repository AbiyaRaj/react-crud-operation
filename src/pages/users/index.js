import { useEffect, useState } from "react";
import UsersList from "../../components/usersList";
import { UseAllGetUsers } from "../../api";

const Users = () =>{
    const [userDetails, setUserDetails] = useState('');

    const getAllUsers = async () => {
        try {
            const page = 1;
            const userData = await UseAllGetUsers(page);
            setUserDetails(userData); 
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    console.log(JSON.stringify(userDetails, null, 2), 'userDetails');
    
    useEffect(() =>{
        getAllUsers();
    },[] )

    return(
        <>
            {userDetails ? <UsersList users={userDetails} /> : <p>Loading...</p>}
        </>
    )
}
export default Users;
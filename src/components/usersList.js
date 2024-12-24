import { useEffect, useState } from "react";
import { UseCreateUser, UseDeleteUser } from "../api";
// import { UseCreateUser, UseDeleteUser } from "../../api";

const UsersList = ({users}) =>{

    const dataArray = users.data;

    const [firstName, setFirstName]     = useState('');
    const [lastName, setLastName]       = useState('');
    const [email, setEmail]             = useState('');
    const [image, setImage]             = useState('');
    const [userDetails, setUserDetails] = useState(dataArray);
    const [editDetails, setEditDetails] = useState([]);

    console.log(userDetails, 'userDetails');

    var __userID        = "";
    const emptyData = () =>
    {
        // getAllUsers();
        setFirstName(''); 
        setLastName('');
        setEmail('');
        setImage('');
    }

    const editSingleUser = async(item) =>
    {        
        setEditDetails(item)
        setFirstName(item?.first_name);
        setLastName(item?.last_name);
        setEmail(item?.email);
        setImage(item?.avatar);
    }

    const submitDetails = async(id) =>
    {
        if(editDetails != "")
        {
            id = editDetails?.id
        }       

        const data = {
            first_name : firstName,
            last_name  : lastName,
            email      : email,
            avatar     : image,
            id         : id
        };       

        const createUser =  await UseCreateUser(data);

        if(!createUser?.error)
        {
            emptyData();
            closeModal('userModal');
        }
    }

    const deleteSingleUser = (userId) => {
        __userID = userId
    }

    const deleteUserDetails = async() => {
        const param = 
        {
            'id': __userID
        }

        const deleteUser = await UseDeleteUser(param)

        if(!deleteUser?.error)
        {
            // getAllUsers();
            closeModal('deleteUserModal');
        }        
    }

    const closeModal = (id) => {
        const closeButton = document.querySelector(`#${id} .btn-close`);
        if (closeButton) closeButton.click();
    };
    
    useEffect(() =>{
        // getAllUsers()
    },[] )

    return(
        <>
            <div class="px-3">
                <div class="mt-3 mb-3">
                    <h5>Users</h5>
                    <button class="btn"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/></svg></button> |
                    <button class="btn"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z"/></svg></button> 


                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#userModal">Create user</button>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Profile</th>
                            <th scope="col">First name</th>
                            <th scope="col">Last name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(userDetails) && 
                            userDetails.map((item, index) => {
                                console.log(item, 'item');
                                
                                    return (
                                        <tr key={index}>
                                            <td><img src={item?.avatar}/></td>
                                            <td>{item?.first_name}</td>
                                            <td>{item?.last_name}</td>
                                            <td>{item?.email}</td>
                                            <td>
                                                <div class="d-flex gap-2">
                                                    <button type="button" class="btn btn-outline-success" onClick={() => editSingleUser(item)} data-bs-toggle="modal" data-bs-target="#userModal"><i class="bi bi-pen"></i></button>
                                                    <button type="button" class="btn btn-outline-danger" onClick={() => deleteSingleUser(item.us_id)} data-bs-toggle="modal" data-bs-target="#deleteUserModal"><i class="bi bi-trash"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>

                <div class="modal fade" id="userModal" aria-labelledby="userModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">User details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="firstname_input" class="form-label">First name</label>
                                    <input type="text" class="form-control" id="firstname_input" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                </div>
                                <div class="mb-3">
                                    <label for="lastname_input" class="form-label">Last name</label>
                                    <input type="text" class="form-control" id="lastname_input" placeholder="Last name" value={lastName}  onChange={(e) => setLastName(e.target.value)}/>
                                </div>
                                <div class="mb-3">
                                    <label for="email_input" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email_input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div class="mb-3">
                                    <label for="image_input" class="form-label">Profile image</label>
                                    <input type="text" class="form-control" id="image_input" placeholder="profile image" value={image} onChange={(e) => setImage(e.target.value)}/>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => {submitDetails(0)}}>Submit</button>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="deleteUserModal" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete user details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <h3>Are you sure!</h3>
                                <p>Do you want to delete the user!</p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" class="btn btn-primary" onClick={deleteUserDetails}>Delete</button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default UsersList;
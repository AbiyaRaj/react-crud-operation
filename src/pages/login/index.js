import { useState, useEffect } from "react";
import { userLogin } from "../../api";
import { useNavigate } from "react-router-dom";
import { setSessionToken, getSessionToken } from "../../utils/cookies";

const Login = () =>{

    const [userName, setUserName]           = useState('');
    const [userPassword, setUserPassword]   = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = getSessionToken();
        console.log(token, 'token');
        
        if (token) {
            navigate('/users'); 
        }
        else
        {
            navigate('/'); 
        }
    }, [navigate]);

    const userLoginDetails = async() => {
        const data = {
            email     : userName,
            password  : userPassword,
        }
        const loginUser =  await userLogin(data);

        if(loginUser != "" || loginUser != [])
        {
            if(loginUser?.token)
            {
                setSessionToken(loginUser?.token);
                navigate('users')
            }
        }
    }

    return(
        <>
            <section class="vh-100 d-flex justify-content-center align-items-center">
                <div class="container-fluid h-custom">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <div data-mdb-input-init class="form-outline mb-4">
                                <label class="form-label" for="form3Example3">Email address</label>
                                <input type="email" id="form3Example3" class="form-control form-control-lg"
                                placeholder="Enter a valid email address" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </div>

                            <div data-mdb-input-init class="form-outline mb-3">
                                <label class="form-label" for="form3Example4">Password</label>
                                <input type="password" id="form3Example4" class="form-control form-control-lg"
                                placeholder="Enter password"  value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
                            </div>

                            <div class="d-flex justify-content-between align-items-center">
                                <div class="form-check mb-0">
                                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                <label class="form-check-label" for="form2Example3">
                                    Remember me
                                </label>
                                </div>
                            </div>
                            <div class="text-center d-flex justify-content-center align-items-center text-lg-start mt-4 pt-2">
                                <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg" onClick={userLoginDetails}>Login</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                </section>
        </>
    )
}
export default Login;
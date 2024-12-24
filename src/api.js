import { API_URLS } from "./config/urls";

export const userLogin = (data) => new Promise((res, rej) => {
    const url = API_URLS.LOGIN_USER;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),  
        redirect: 'follow'
    })
    .then((res) => res.json())
    .then((response) => {
        
        if (!response.error) {
            res(response);
        } else {
            res([]);
        }
    })
    .catch((error) => {
        res([]);
    });
});

export const UseCreateUser = (data) => new Promise((res, rej) => {
    const url = API_URLS.CREATE_USER;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),  
        redirect: 'follow'
    })
    .then((res) => res.json())
    .then((response) => {

        console.log(response, 'response');
        
        if (!response.error) {
            res(response);
        } else {
            res([]);
        }
    })
    .catch((error) => {
        res([]);
    });
});

export const UseAllGetUsers = (page) => new Promise((res, rej) =>{
    const url = `${API_URLS.GET_ALL_USERS}?page=${page}`;

    fetch(url, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
        },
        redirect: 'follow'
    })

    .then((res) => res.json())
    .then((response) => 
        {
        if (!response.error) 
        {
            res(response);
        } 
        else 
        {
            res([]);
        }
    })
    .catch((error) => {
        res([]);
    });
})

export const UseDeleteUser = (data) => new Promise((res, rej) =>{
    const url = API_URLS.DELETE_USER;

    fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),  
        redirect: 'follow'
    })

    .then((res) => res.json())
    .then((response) => 
        {
        if (!response.error) 
            {
            res(response);
        } 
        else 
        {
            res([]);
        }
    })
    .catch((error) => {
        res([]);
    });
})


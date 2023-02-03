const USERS_URL = 'http://localhost:10001/api/users';

function logout(){
    document.cookie = `Authorization=''; max-age=-1`;
    window.location='./login.html';
}

window.onload = async ()=>{
    try{
        //Getting token from cookies
        const { Authorization } = parseCookie(document.cookie);

        //Elements for fill in
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');

        //Getting data from server
        const res = await axios.get(USERS_URL+'/profile',
        {
            headers: {
                Authorization: Authorization
            }
        })

        //Take user object from response
        const user = res.data.user;

        //Filling up elements
        email.innerHTML = user.email;
        username.innerHTML = user.username;
        phone.innerHTML = user.phone ?? '';

    } catch(e) {
        const error = new Error(e.response.data.error);
        const status = e.response.status;
        alert(`Error${status}: ${error.message}`);
    }
}

async function showUsers(){
    try {
        const { Authorization } = parseCookie(document.cookie);

        console.log(Authorization);

        const res = await axios.get(USERS_URL+'/getAll',
            {headers: {
                Authorization: Authorization
            }});

        console.log(res);
    } catch (e) {
        const error = new Error(e.response.data.error);
        const status = e.response.status;
        alert(`Error${status}: ${error.message}`);
    }
}
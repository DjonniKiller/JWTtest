const USERS_URL = 'http://localhost:10001/api/users';

function logout(){
    document.cookie = `Authorization=''; max-age=-1`;
    window.location='./auth.html';
}

async function showUsers(){
    try {
        const { Authorization } = parseCookie(document.cookie);

        const res = await axios({
            method: 'get',
            url: 'http://localhost:10001/api/users/getAll',
            data: {
                Authorization: Authorization
            }
        })

        console.log(res);
    } catch (e) {
        const error = new Error(e.response.data.error);
        const status = e.response.status;
        alert(`Error${status}: ${error.message}`);
    }
}
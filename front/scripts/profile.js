const USERS_URL = 'http://localhost:10001/api/users';

function logout(){
    document.cookie = `Authorization=''; max-age=-1`;
    window.location='./auth.html';
}

async function showUsers(){
    try {
        const { Authorization } = parseCookie(document.cookie);

        const res = await axios.get({
            method: 'get',
            url: USERS_URL + '/getAll',
            headers: {
                Authorization: Authorization
            }
        })

        console.log(res);
    } catch (e) {
        alert(new Error(e).message);
    }
}
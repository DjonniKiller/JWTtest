const USERS_URL = 'http://localhost:10001/api/users';

function logout(){
    document.cookie = `Authorization=''; max-age=-1`;
    window.location='./auth.html';
}

async function showUsers(){
    try {
        const { Authorization } = parseCookie(document.cookie);

        console.log(Authorization);

        const res = await axios({
            method: 'get',
            url: 'http://localhost:10001/api/users/getAll',
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
                //"Content-type": "Application/json"
                //Authorization: Authorization
            }
        })

        console.log(res);
    } catch (e) {
        alert(new Error(e).message);
    }
}
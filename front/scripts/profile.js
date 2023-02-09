const USERS_URL = 'http://localhost:10001/api/users';
const POSTS_URL = 'http://localhost:10001/api/posts';

function logout(){
    //Clearing cookies
    document.cookie = `Authorization=''; max-age=-1`;

    //Change location to login page
    window.location='./login.html';
}

async function getUserPosts(id){
    try {
        //Request to get all user posts from DB
        const res = await axios.get(POSTS_URL+'/author', {
            headers: {
                AuthorID: id
            }
        })

        return res.data;
    } catch (e) {
        const error = new Error(e.response.data.error);
        const status = e.response.status;
        alert(`Error${status}: ${error.message}`);
    }
}

window.onload = async ()=>{
    try{
        /*--    Прогрузка профиля   --*/
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
        email.innerHTML = `<b>Почта:</b> ${user.email}`;
        username.innerHTML = user.username;
        phone.innerHTML = user.phone ? `<b>Телефон:</b> ${user.phone}`: '';



        /*--    Отображение публикаций  --*/
        //Get publication div element
        const publicationsDiv = document.getElementById('publications');

        //Clear it's innerHTML
        publicationsDiv.innerHTML = '';

        //Get all posts by user id
        const posts = await getUserPosts(user.id);


        //For each post add div in publication div
        posts.forEach(el => {
            publicationsDiv.innerHTML += 
                `<div class="post">
                    <div class="icon_div">
                        <img class="icon" src="../../profile_icon.jpg">
                    </div>
                    <div class="post_data">
                        <h2>${el.header}</h2>
                        <p>${el.text}</p>
                    </div>
                </div>`;
        });
    } catch(e) {
        const error = new Error(e.response.data.error);
        const status = e.response.status;

        if (e.response.data.error === 'Authencation error!') logout();

        console.log(`Error${status}: ${error.message}`);
    }
}

async function showUsers(){
    try {
        //Token from cookies
        const { Authorization } = parseCookie(document.cookie);

        //Get request to server to get users from DB
        const res = await axios.get(USERS_URL+'/getAll',
            {headers: {
                Authorization: Authorization
            }});

        //Logging response
        console.log(res);
    } catch (e) {
        const error = new Error(e.response.data.error);
        const status = e.response.status;
        console.log(`Error${status}: ${error.message}`);
    }
}

async function publicatePost(){
    try {
        //Token from cookies
        const { Authorization } = parseCookie(document.cookie);

        //Input values
        const header = document.getElementById('header').value;
        const text = document.getElementById('text').value;


        //Posting to server post create request
        await axios.post(POSTS_URL+'/create', 
            {
                header: header,
                text: text,
                token: Authorization
            }
        );

        //Reloading current page
        location.reload();
    } catch (e) {
        const error = new Error(e.response.data.error);
        const status = e.response.status;
        console.log(`Error${status}: ${error.message}`);
    }
}
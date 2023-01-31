async function login(){
    //Authentication values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //Div that shows auth errors
    const errorDiv = document.getElementById('errorDiv');

    //Trying to post data to server
    try{
        const res = await axios({
            method: 'post',
            url: `http://localhost:10001/api/auth/login`,
            data: {
                email: email,
                password: password
            }
        });

        //Show response token
        document.cookie=`Authorization=${res.data.token}; max-age=1800`;
        window.location.href='./profile.html';
    } catch(e) {
        const error = new Error(e.response.data.error);
        const status = e.response.status;

        errorDiv.classList.remove('error_hidden');
        errorDiv.classList.add('error_show');
        errorDiv.innerHTML = `<p>Error${status}: ${error.message}</p>`;
    }
}

async function register(){
    //Authentication values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //Div that shows auth errors
    const errorDiv = document.getElementById('errorDiv');

    //Trying to post data to server
    try{
        const res = await axios({
            method: 'post',
            url: `http://localhost:10001/api/auth/register`,
            data: {
                email: email,
                password: password
            }
        });

        alert('Success!');
    } catch(e) {
        const error = new Error(e.response.data.error);
        const status = e.response.status;

        errorDiv.classList.remove('error_hidden');
        errorDiv.classList.add('error_show');
        errorDiv.innerHTML = `<p>Error${status}: ${error.message}</p>`;
    }
}

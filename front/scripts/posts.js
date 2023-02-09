const POSTS_URL = 'http://localhost:10001/api/posts'

function formatDate(date){
    //Getting post creating date and current date
    const timestamp = new Date(date);
    const currDate = new Date();


    //All dimensions for creating formatted date
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth() < 10 ? '0'+`${timestamp.getMonth()}`:timestamp.getMonth();
    const day = timestamp.getDate() < 10 ? '0'+`${timestamp.getDate()}`:timestamp.getDate();
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();


    //Checking for date coincidence
    const condition = (currDate.getMonth() === timestamp.getMonth() && currDate.getDay() === timestamp.getDay());


    //Creating formatted date
    let formattedDate = condition?`${hours}:${minutes}`:`${day}.${month}.${year} ${hours}:${minutes}`;

    return formattedDate;
}


window.onload = async () => {
    try{
        //Get posts div element
        const postsDiv = document.getElementById('posts');

        console.log(postsDiv);

        //Clear it's innerHTML
        postsDiv.innerHTML = '';

        //Get all posts by user id
        const posts = await axios.get(POSTS_URL+'/all');


        //For each post add div in posts div
        posts.data.forEach(el => {
            postsDiv.innerHTML += 
                `<div class="post">
                    <div class="info">
                        <div class="icon_div">
                            <img class="icon" src="../../profile_icon.jpg">
                        </div>
                        <div class="author">
                            <p class="name">${el.username}</p>
                            <p class="timestamp">${formatDate(el.created_at)}</p>
                        </div>
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
        console.log(`Error${status}: ${error.message}`);
    }
}
function login(){
    const resText = document.getElementById('responseText');
    axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => (resText.innerHTML = response.data))
        .catch(error => console.log(error));;
}

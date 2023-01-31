function parseCookie(cookie){
    return cookie.split(';').reduce((arr, el) => {
        const data = el.trim().split('=');
        return {...arr, [data[0]]: data[1]};
    }, {});
}
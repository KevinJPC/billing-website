//fetch for login, for which it sends the user's credentials 
export function fetchLogin(credentials) {
    return (fetch("https://distribuciones-nacionales-api.herokuapp.com/auth/local", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => {
            console.error('Error:', error)
        })
    )
}

//fetch for login using the jwt of the sessionstorage
export function fetchReLogin() {

    let jwt = sessionStorage.getItem('jwt');

    return (fetch("https://distribuciones-nacionales-api.herokuapp.com/users/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })
            .then(res => res.json())
            .catch(error => console.log("Error", error))
    )
}
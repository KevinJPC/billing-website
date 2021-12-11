
//fetch to obtain all registered products, for this it obtains and sends the user's jwt
export function fetchGetProducts() {

    let jwt = sessionStorage.getItem('jwt');

    return (fetch("https://distribuciones-nacionales-api.herokuapp.com/products", {
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

//fetch to filter the registered products, for this it obtains and sends the user's jwt and the query
export function fetchGetProductsByQuery(query) {

    let jwt = sessionStorage.getItem('jwt');
    
    return (fetch("https://distribuciones-nacionales-api.herokuapp.com/products/find/" + query, {
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
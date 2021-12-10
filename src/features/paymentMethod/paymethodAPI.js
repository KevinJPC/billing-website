export function fetchGetPaymentMethods() {

    let jwt = sessionStorage.getItem('jwt');

    return (fetch("https://distribuciones-nacionales-api.herokuapp.com/payment-methods", {
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
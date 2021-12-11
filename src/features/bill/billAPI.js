//fetch to obtain all registered bills, for this it obtains and sends the user's jwt
export function billGet() {

    let jwt = sessionStorage.getItem('jwt');

    return (fetch("https://distribuciones-nacionales-api.herokuapp.com/bills", {
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

//fetch to register bills, for this it obtains and sends the user's jwt
export function billRegister(bill) {

    let jwt = sessionStorage.getItem('jwt');

    return (fetch("https://distribuciones-nacionales-api.herokuapp.com/bills", {
        method: 'POST',
        body: JSON.stringify(bill),
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + jwt
        }
    }).then(res => res.json())
        .catch(error => {
            
        })
    )
}

//fetch to update bills status, for this it obtains and sends the user's jwt
export function updateStatusBill(bill) {

    let jwt = sessionStorage.getItem('jwt');

    return (fetch("https://distribuciones-nacionales-api.herokuapp.com/bills/" + bill.id, {
        method: 'PUT',
        body: JSON.stringify(bill),
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + jwt
        }
    }).then(res => res.json())
        .catch(error => {
            
        })
    )
}
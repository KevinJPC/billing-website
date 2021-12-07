export function fetchGet(jwt) {

    return (fetch("https://distribuciones-nacionales-api.herokuapp.com/payment-methods", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + 
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM4ODA4MjA4LCJleHAiOjE2NDE0MDAyMDh9.79yFVPQ8NvDVw792aCp8x2_DXdwVoM_VXLxwF9DpG68"
            }
        })
            .then(res => res.json())
            .catch(error => console.log("Error", error))
    )
}
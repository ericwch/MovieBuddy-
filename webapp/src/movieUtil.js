export const makeMovieMeet = async ( movieMeetObj ) => (
    
        fetch("moviemeet/new", 
            {
            method: "POST",
            body: JSON.stringify(movieMeetObj),
            headers: {
                'Content-Type': 'application/json'
                }
            })

        
    
)

export const deleteMovieMeet =  ( movieMeetId ) => (
    fetch(`moviemeet/${movieMeetId}`, 
            {
            method: "DELETE",
            })
)

export const getMovieMeet = async () => (
    fetch("/moviemeet",{
        method: "GET",
        

    }).then((res) => {
        if(res.ok){
            return res.json()
        }
    }).then((movieMeetJSON) => {

        
        console.log(movieMeetJSON)
        return movieMeetJSON
    })
)

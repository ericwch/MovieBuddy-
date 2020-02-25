export const makeMovieMeet = async ( movieMeetObj ) => {
    try { 
        let res = await fetch("moviemeet/new", 
            {
            method: "POST",
            body: JSON.stringify(movieMeetObj),
            headers: {
                'Content-Type': 'application/json'
                }
            })

            return (res.status == "204")
    }
    catch(e){
        console.log(e)
        return (false)
    }
}

export const deleteMovieMeet = async ( movieMeetId ) => {
    try { 
        let res = await fetch(`moviemeet/${movieMeetId}`, 
            {
            method: "DELETE",
            })

            return (res.status == "204")
    }
    catch(e){
        console.log(e)
        return (false)
    }
}
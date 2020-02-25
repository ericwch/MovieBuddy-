export const checkAuth = async () => {
    console.log("first call!")
    try {
        let res = await fetch("auth/login", {
        method: "GET",
        redirect: 'follow',
        headers: {
            
            'Content-Type': 'application/json'
        },
        credentials: "include"
        })
        console.log(res.status)
        return (res.status == "204")
    }
    catch (e) {
        console.log(e)
        return (false)
    }
    
}

export const logout = async () => {
    console.log("logout call")
    

    try{ 
        let res = await fetch("auth/logout", {
        method: "GET",
        redirect: 'follow'
    })
        return(res.status == "204")
    }   
    catch(e){
         console.log(e)
         return (false)
    }
    
}
export const register = async ( userObj ) => {
    try { 
        let res = await fetch("auth/register", 
            {
            method: "POST",
            body: JSON.stringify(userObj),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
                },
            redirect: 'follow'

            })

        if (res.ok){
            let resJSON = await res.json()
            return resJSON.user!=null
        }
    }
    catch(e){
        console.log(e)
        return (false)
    }
}


export const login = async ( userObj ) => {
    try { 
        let res = await fetch("auth/login", 
            {
            method: "POST",
            body: JSON.stringify(userObj),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
                },
            redirect: 'follow'
            })

            return (res.status == "204")
    }
    catch(e){
        console.log(e)
        return (false)
    }
}

export const formToJSON = (formData) => {

    const JSONObj = {}

    for (let chunk of formData){
        JSONObj[chunk[0]]= chunk[1]
    }

    return JSONObj
}



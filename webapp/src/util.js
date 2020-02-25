export const formToJSON = (formData) => {

    const JSONObj = {}

    for (let chunk of formData){
        JSONObj[chunk[0]]= chunk[1]
    }

    return JSONObj
}
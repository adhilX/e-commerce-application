import axiosInstance from "../axois/axoisInstences"


export async function loginUser(username: string, password: string) {
   
    try{
        const result = await axiosInstance.post("/auth/login", { username, password })
        return result
    }
    catch(error){
        console.log(error)
        throw error
    }

}
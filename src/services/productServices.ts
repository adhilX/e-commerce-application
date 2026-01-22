import axiosInstance from "../axois/axoisInstences"

export async function getProducts() {
    try{
        const result = await axiosInstance.get("/products")
        // console.log(result)
        return result
    }
    catch(error){
        console.log(error)
        throw error
    }
}   
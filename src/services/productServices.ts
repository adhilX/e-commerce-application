import axiosInstance from "../axois/axoisInstences"

export async function getProducts({ page = 1, limit = 8 }: { page?: number; limit?: number }) {
    try{
            const skip = (page - 1) * limit

        const result = await axiosInstance.get("/products", {
            params: {
                limit,
                skip
            }
        })
        // console.log(result)
        return result
    }
    catch(error){
        console.log(error)
        throw error
    }
}   
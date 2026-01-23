import axiosInstance from "../axois/axoisInstences"

export async function getProducts({ page = 1, limit = 8, category, search }: { page?: number; limit?: number; category?: string; search?: string }) {
    try {
        const skip = (page - 1) * limit
        let url = "/products"

        if (category) {
            url = `/products/category/${category}`
        } else if (search) {
            url = `/products/search`
        }

        const result = await axiosInstance.get(url, {
            params: {
                limit,
                skip,
                q: search
            }
        })
        // console.log(result)
        return result
    }
    catch (error) {
        console.log(error)
        throw error
    }
}


export async function getCategories() {
    try {
        const result = await axiosInstance.get("/products/categories")
        return result.data
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

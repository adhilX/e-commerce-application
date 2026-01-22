import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { loginUser } from "../services/userSevices"
import { useDispatch } from "react-redux"
import { setToken, setUser } from "../store/slice/authSlice"
import { useNavigate } from "react-router-dom"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

   const dispatch = useDispatch()
   const navigate = useNavigate()
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (Credential :{username: string,password: string})=>
         loginUser(Credential.username, Credential.password),
    onSuccess: (data) => {
     dispatch(setUser(data.data))
     dispatch(setToken(data.data.accessToken))
     navigate("/",{replace: true})
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutate({username,password })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
        <div className=" bg-gray-800 rounded-lg p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input className="border bg-black text-white border-gray-300 p-2 rounded-lg" type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input className="border bg-black text-white border-gray-300 p-2 rounded-lg" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button className="bg-blue-500 text-white p-2 rounded-lg" type="submit">{isPending ? "Logging in..." : "Login"}</button>

            {isError && <p className="text-red-500">{error?.message}</p>}
        </form>
        </div>
    </div>
  )
}

export default Login
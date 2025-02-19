import axios from "axios"

const loginApi = (email: any,password: any)=>{
    return axios.post("/login",{email,password})
}
export {loginApi}
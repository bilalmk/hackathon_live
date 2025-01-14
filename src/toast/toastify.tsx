import { ToastContainer, toast } from "react-toastify"

export const notifySuccess = (message:string)=>{
    toast.success(message)
}

const ToastProvider = ()=>{
    return <ToastContainer position="top-left" autoClose={3000} hideProgressBar/>
}

export default ToastProvider


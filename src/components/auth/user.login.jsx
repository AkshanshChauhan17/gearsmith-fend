import { useState } from "react"
import authPostRequest from "./post.req"

export default function UserLogin() {
    const [focusField, setFocusField] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = (url)=>{
        const login = async ()=> {
            await authPostRequest(url, {email: email, password: password})
                .then((res)=>console.log(res))
                .catch(err=>{throw err})

            setLoading(false);
        }
        login()
    }
    return (
        <div className="login-section">
            <form action="#">
                <fieldset className={focusField===0 || email!="" ? "focus-field" : "field"}>
                    <legend>User Email</legend>
                    <input type="email" required onFocus={()=>setFocusField(0)} onBlur={()=>setFocusField(email ==="" ? 400 : 0)} onChange={(e)=>setEmail(e.target.value)} />
                </fieldset>
                <fieldset className={focusField===1 || password!="" ? "focus-field" : "field"}>
                    <legend>User Email</legend>
                    <input type="password" required onFocus={()=>setFocusField(1)} onBlur={()=>setFocusField(password ==="" ? 400 : 0)} onChange={(e)=>setPassword(e.target.value)} />
                </fieldset>
                <button className="button" onClick={()=>{handleLogin("http://localhost:1000/user/login"); setLoading(true);}}>Log In</button>
            </form>
        </div>
    )
}
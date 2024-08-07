import { useState } from "react"
import { Link } from "react-router-dom"
import url_main from "../../functions/url"
import authPostLoginRequest from "./post.req.login"

export default function UserLogin({lsDef}) {
    const [focusField, setFocusField] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = (url)=>{
        setLoading(true)
        const login = async ()=> {
            await authPostLoginRequest(url, {email: email, password: password})
                .then(async(res)=>{
                    if(res.loginStatus) {
                        await lsDef(res.loginStatus)
                        localStorage.setItem("token", res.token)
                        alert(res.message)
                        window.location.href = "/"
                    } else {
                        localStorage.clear()
                        alert(res.message)
                    }
                })
                .catch(err=>{throw err})

            setLoading(false)
            clearAllUseState()
        }
        login()
    }

    if(loading) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }
    return (
        <div className="login-section">
            <form action="#" onSubmit={()=>handleLogin(url_main + "user/login")}>
                <div className="login-heading">Login
                    <div className="gearsmith-logo"></div>
                </div>
                <hr />
                <br />
                <fieldset className={focusField===0 || email!="" ? "focus-field" : "field"}>
                    <legend>User Email</legend>
                    <input type="email" required onFocus={()=>setFocusField(0)} onBlur={()=>setFocusField(email ==="" ? 400 : 0)} onChange={(e)=>setEmail(e.target.value)} value={email} />
                </fieldset>
                <fieldset className={focusField===1 || password!="" ? "focus-field" : "field"}>
                    <legend>User Password</legend>
                    <input type="password" required onFocus={()=>setFocusField(1)} onBlur={()=>setFocusField(password ==="" ? 400 : 0)} onChange={(e)=>setPassword(e.target.value)} value={password} />
                </fieldset>
                <input type="submit" className="button" value="Log In" />
                <br />
                <div className="footer">
                For new user
                <Link to="/register">Register here.</Link>
                </div>
            </form>
        </div>
    )
}
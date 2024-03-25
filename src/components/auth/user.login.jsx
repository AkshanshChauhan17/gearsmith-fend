import { useState } from "react"

export default function UserLogin() {
    const [focusField, setFocusField] = useState()
    const [email, setEmail] = useState("")
    return (
        <div className="login-section">
            <form>
                <fieldset className={focusField===0 || email!="" ? "focus-field" : "field"}>
                    <legend>User Email</legend>
                    <input type="email" required onFocus={()=>setFocusField(0)} onBlur={()=>setFocusField(email ==="" ? 400 : 0)} onChange={(e)=>setEmail(e.target.value)} />
                </fieldset>
            </form>
        </div>
    )
}
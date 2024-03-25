import { useState } from "react"
import authPostRequest from "./post.req"
import { Link } from "react-router-dom"

export default function UserSignin({lsDef}) {
    const [focusField, setFocusField] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const [base64Images, setBase64Images] = useState({
        original: '',
        small: '',
        medium: '',
        large: ''
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Resize for small image
                const smallWidth = 100; // Set your desired width
                const smallHeight = (img.height / img.width) * smallWidth;
                canvas.width = smallWidth;
                canvas.height = smallHeight;
                ctx.drawImage(img, 0, 0, smallWidth, smallHeight);
                const smallBase64 = canvas.toDataURL('image/jpeg');

                // Resize for medium image
                const mediumWidth = 300; // Set your desired width
                const mediumHeight = (img.height / img.width) * mediumWidth;
                canvas.width = mediumWidth;
                canvas.height = mediumHeight;
                ctx.drawImage(img, 0, 0, mediumWidth, mediumHeight);
                const mediumBase64 = canvas.toDataURL('image/jpeg');

                // Resize for large image
                const largeWidth = 600; // Set your desired width
                const largeHeight = (img.height / img.width) * largeWidth;
                canvas.width = largeWidth;
                canvas.height = largeHeight;
                ctx.drawImage(img, 0, 0, largeWidth, largeHeight);
                const largeBase64 = canvas.toDataURL('image/jpeg');

                setBase64Images({
                    original: reader.result,
                    small: smallBase64,
                    medium: mediumBase64,
                    large: largeBase64
                });
            };
        };

        reader.readAsDataURL(file);
    };

    const handleSignin = (url)=>{
        const signIn = async ()=> {
            await authPostRequest(url, {email: email, password: password, meta: { first_name: f_name, last_name: l_name, mobile_no: mob_no, profile_photo: base64Images}})
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

            setLoading(false);
        }
        signIn()
    }

    const clearAllUseState = ()=>{
        setEmail("")
        setPassword("")
        setLoading(false)
        setFocusField(400)
    }

    if(loading) {
        return <div className="loading">
            <div className="loader"></div>
        </div>
    }
    return (
        <div className="signin-section">
            <form action="#" onSubmit={()=>{handleSignin("http://localhost:1000/user/signin"); setLoading(true); clearAllUseState();}}>
                <div className="form-section">
                    <div className="left-section">
                        <div className="selected-image-section">
                            <img src={base64Images.medium} alt="" />
                            <input type="file" accept="image/*"  onChange={(e)=>{handleImageChange(e)}} required />
                        </div>
                        </div>
                        <div className="right-section">
                            <div className="form">
                            <div className="signin-heading">SignIn
                                <div className="gearsmith-logo"></div>
                            </div>
                        <hr />
                        <fieldset className={focusField===0 || email!="" ? "focus-field" : "field"}>
                            <legend>User Email</legend>
                            <input type="email" required onFocus={()=>setFocusField(0)} onBlur={()=>setFocusField(email ==="" ? 400 : 0)} onChange={(e)=>setEmail(e.target.value)} value={email} />
                        </fieldset>
                        <fieldset className={focusField===1 || password!="" ? "focus-field" : "field"}>
                            <legend>User Password</legend>
                            <input type="password" required onFocus={()=>setFocusField(1)} onBlur={()=>setFocusField(password ==="" ? 400 : 0)} onChange={(e)=>setPassword(e.target.value)} value={password} />
                        </fieldset>
                        <input type="submit" className="button" value="Sign In" />
                            </div>
                        </div>                    
                    </div>
                <br />
                <div className="footer">
                Already Having Account
                <Link to="/">Login Here</Link>
                </div>
            </form>
        </div>
    )
}
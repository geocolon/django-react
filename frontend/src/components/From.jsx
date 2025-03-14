import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const formTitle = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.pereventDefault();

        try {
            const res = await api.post(route, {username, password})
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }
}

return <from onSubmit={handleSubmit} className="from-container">
    <h1>{formTitle}</h1>
    <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        placeholder="Username"
    />
    <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        placeholder="Password"
    />
    <button className="from-button" type="submit">
        {formTitle}
    </button>  
        
</from>
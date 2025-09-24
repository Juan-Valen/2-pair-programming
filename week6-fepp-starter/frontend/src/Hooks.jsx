import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignup = (setIsAuthenticated) => {
    const [form, setForm] = useState({ email: "", password: "", password2: "" });
    const navigate = useNavigate();
    const handleSignup = async () => {
        try {
            if (form.password !== form.password2) {
                console.error("Passwords do not match!");
                return;
            }
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                const user = await res.json();
                sessionStorage.setItem("user", JSON.stringify(user));
                console.log("User Signup successfully.");
                setIsAuthenticated(true);
                navigate("/");
            } else {
                console.error("signup failed!");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return {
        form,
        setForm,
        handleSignup
    }
}

export const useLogin = (setIsAuthenticated) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                const user = await res.json();
                sessionStorage.setItem("user", JSON.stringify(user));
                console.log("User Login successfully.");
                setIsAuthenticated(true);
                navigate("/");
            } else {
                console.error("Login failed!");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return {
        form,
        setForm,
        handleLogin
    }
}

export default useSignup;

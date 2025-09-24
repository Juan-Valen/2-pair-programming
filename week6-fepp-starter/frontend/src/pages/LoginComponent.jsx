import { useLogin } from "../Hooks";

const LoginComponent = ({ setIsAuthenticated }) => {
    const { form, setForm, handleLogin } = useLogin(setIsAuthenticated);

    return (
        <div className="form-container">
            <h2>Login</h2>
            <label>
                email:
                <input
                    type="text"
                    value={form.email}
                    onChange={(e) => setForm((f) =>{ return {...f, email: e.target.value}})} />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm((f) =>{ return {...f, password: e.target.value}})} />
            </label>
            <br />
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};

export default LoginComponent;

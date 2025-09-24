import useSignup from "../Hooks";

const SignupComponent = ({ setIsAuthenticated }) => {
    const { form, setForm, handleSignup } = useSignup(setIsAuthenticated);

    return (
        <div className="form-container">
            <h2>Signup</h2>
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
            <label>
                Confirm Password:
                <input
                    type="password"
                    value={form.password2}
                    onChange={(e) => setForm((f) =>{ return {...f, password2: e.target.value}})} />
            </label>
            <br />
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
};

export default SignupComponent;

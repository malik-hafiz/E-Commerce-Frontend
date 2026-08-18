import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="auth-page">
      <form className="auth-card">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Login</h1>
        <label>Email<input type="email" placeholder="you@example.com" /></label>
        <label>Password<input type="password" placeholder="••••••••" /></label>
        <button className="btn btn-dark btn-large" type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </form>
    </section>
  );
}

import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <section className="auth-page">
      <form className="auth-card">
        <p className="eyebrow">JOIN US</p>
        <h1>Create account</h1>
        <label>Name<input type="text" placeholder="Your name" /></label>
        <label>Email<input type="email" placeholder="you@example.com" /></label>
        <label>Password<input type="password" placeholder="••••••••" /></label>
        <button className="btn btn-dark btn-large" type="submit">Sign up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}

import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import { FaCcVisa } from "react-icons/fa";
import { SiMastercard } from "react-icons/si";
import { FaCcPaypal } from "react-icons/fa6";
import { FaGooglePay } from "react-icons/fa";
import { FaApplePay } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>
            STAY UPTO DATE ABOUT
            <br />
            OUR LATEST OFFERS
          </h2>

          <div className="newsletter-form">
            <div className="email-input">
              <span>✉</span>
              <input
                type="email"
                placeholder="Enter your email address"
              />
            </div>

            <button type="button">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="footer-main">

        {/* Company */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            SHOP.CO
          </Link>

          <p>
            We have clothes that suits your style and which
            you're proud to wear. From women to men.
          </p>

          <div className="social-icons">
            <a href="#" aria-label="Twitter"><FaXTwitter /></a>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="GitHub"><IoLogoGithub /></a>
          </div>
        </div>

        {/* Company Links */}
        <div className="footer-column">
          <h3>COMPANY</h3>

          <Link to="/about">About</Link>
          <Link to="/features">Features</Link>
          <Link to="/works">Works</Link>
          <Link to="/career">Career</Link>
        </div>

        {/* Help */}
        <div className="footer-column">
          <h3>HELP</h3>

          <Link to="/customer-support">Customer Support</Link>
          <Link to="/delivery">Delivery Details</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

        {/* FAQ */}
        <div className="footer-column">
          <h3>FAQ</h3>

          <Link to="/account">Account</Link>
          <Link to="/manage-deliveries">Manage Deliveries</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/payments">Payments</Link>
        </div>

        {/* Resources */}
        <div className="footer-column">
          <h3>RESOURCES</h3>

          <Link to="/free-ebooks">Free eBooks</Link>
          <Link to="/development-tutorial">Development Tutorial</Link>
          <Link to="/how-to-blog">How to - Blog</Link>
          <Link to="/youtube-playlist">Youtube Playlist</Link>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">

        <p>
          Shop.co © 2026, All Rights Reserved
        </p>

        <div className="payment-methods">
          <span><FaCcVisa /></span>
          <span><SiMastercard /></span>
          <span><FaCcPaypal /></span>
          <span><FaGooglePay /></span>
          <span><FaApplePay /></span>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
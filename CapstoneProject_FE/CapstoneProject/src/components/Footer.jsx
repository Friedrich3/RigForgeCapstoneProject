import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Discord, Facebook, Instagram, TwitterX, Youtube } from "react-bootstrap-icons"
import { useSelector } from "react-redux";

const Footer = () => {
  const currentUser = useSelector((state) => state.profile.data);
  return (
    <footer className="py-4 mt-auto" style={{ backgroundColor: "#0a0a14" }}>
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <h5 className="text-light mb-3">RigForge</h5>
            <p className="text-secondary">
              Build your dream PC with our easy-to-use PC builder tool. Compare components, check compatibility, and
              create the perfect custom computer.
            </p>
            <div className="d-flex gap-3 text-light">
              <a href="#" className="text-light">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-light">
                <TwitterX size={20} />
              </a>
              <a href="#" className="text-light">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-light">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-light">
                <Discord size={20} />
              </a>
            </div>
          </Col>

          <Col md={2} className="mb-3">
            <h6 className="text-light mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/builder" className="text-secondary text-decoration-none">
                  PC Builder
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/Builds" className="text-secondary text-decoration-none">
                  Community Builds
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/guides" className="text-secondary text-decoration-none">
                  Build Guides
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={2} className="mb-3">
            <h6 className="text-light mb-3">Components</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/products/cpu" className="text-secondary text-decoration-none">
                  CPUs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products/motherboard" className="text-secondary text-decoration-none">
                  Motherboards
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products/gpu" className="text-secondary text-decoration-none">
                  GPUs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products/memory" className="text-secondary text-decoration-none">
                  Memory
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products/case" className="text-secondary text-decoration-none">
                  Cases
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={2} className="mb-3">
            <h6 className="text-light mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/faq" className="text-secondary text-decoration-none">
                  FAQ
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-secondary text-decoration-none">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="text-secondary text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-secondary text-decoration-none">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={2} className="mb-3">
            <h6 className="text-light mb-3">Account</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/Account/login" className="text-secondary text-decoration-none">
                  Login
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/Account/register" className="text-secondary text-decoration-none">
                  Register
                </Link>
              </li>
              <li className="mb-2">
                <Link to={currentUser.role? "/Account/profile" : "/Account/login"} className="text-secondary text-decoration-none">
                  My Profile
                </Link>
              </li>
              <li className="mb-2">
                <Link to={currentUser.role? "/Account/mybuilds" : "/Account/login"} className="text-secondary text-decoration-none">
                  Saved Builds
                </Link>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="border-secondary" />

        <div className="text-center text-secondary">
          <small>&copy; {new Date().getFullYear()} RigForge. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

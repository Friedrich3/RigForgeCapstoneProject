import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import { RegisterAccount } from "../../redux/actions/AccountApi"
import GoogleLoginButton from "./GoogleLoginButton";


const initialForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate()
  const [regForm, setRegForm] = useState(initialForm);
  const [error, setError] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (regForm.password !== regForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    let response = await RegisterAccount(regForm);
    if(response){
      navigate('/Account/login');
    }
    setRegForm(initialForm);
    setError("OPS, something went wrong")
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5}>
          <Card
            className="border-0 shadow"
            style={{ backgroundColor: "#121225" }}
          >
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="text-light mb-1">Create Account</h2>
                <p className="text-light opacity-75">
                  Get started with RigForge
                </p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="text-light">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={regForm.username}
                    onChange={(e) =>
                      setRegForm({ ...regForm, username: e.target.value })
                    }
                    required
                    className="bg-dark text-light border-secondary"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your Username.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="text-light">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={regForm.email}
                    onChange={(e) =>
                      setRegForm({ ...regForm, email: e.target.value })
                    }
                    required
                    className="bg-dark text-light border-secondary"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className="text-light">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={regForm.password}
                    onChange={(e) =>
                      setRegForm({ ...regForm, password: e.target.value })
                    }
                    required
                    minLength={8}
                    className="bg-dark text-light border-secondary"
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 8 characters long and include at
                    least one uppercase letter, one lowercase letter, and one
                    digit.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label className="text-light">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={regForm.confirmPassword}
                    onChange={(e) =>
                      setRegForm({
                        ...regForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className="bg-dark text-light border-secondary"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please confirm your password.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="w-100 mb-3 text-center mb-3 mt-5">
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                >
                  Create Account
                </Button>
                <p className=" text-light fw-bold">Or</p>
                <GoogleLoginButton />
                </div>
                <div className="text-center text-light opacity-75">
                  <span>Already have an account? </span>
                  <Link to="/Account/login" className="text-decoration-none">
                    Sign in
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

import { useEffect, useState } from "react"
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap"
import { Facebook, Google } from "react-bootstrap-icons"
import { Link, useNavigate } from "react-router-dom"
import { LoginAccount, SetToken } from "../../redux/actions/AccountApi"
import { useDispatch, useSelector } from "react-redux"
import { GoogleLogin } from "@react-oauth/google"
import GoogleLoginButton from "./GoogleLoginButton"

const Login = () => {
const userLogged = useSelector((state)=> state.profile.data)

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("");
  const navigate= useNavigate();
  const dispatch = useDispatch();


  useEffect(()=>{
      if(userLogged.email !== null){
        navigate("/")
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await LoginAccount(loginData);
    if(success){
      dispatch(SetToken());
      navigate("/");
    }else{
      setError("Login failed, Invalid Email or Password ")
      setLoginData(...loginData, {password: ""})
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5} >
          <Card className="border-0 shadow" style={{ backgroundColor: "#121225" }}>
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="text-light mb-1">Welcome Back</h2>
                <p className="text-light opacity-75">Sign in to continue to RigForge</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="text-light">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })}
                    required
                    className="bg-dark text-light border-secondary"
                  />
                  <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className="text-light">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })}
                    required
                    className="bg-dark text-light border-secondary"
                  />
                  <Form.Control.Feedback type="invalid">Please provide your password.</Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-between mb-3">
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot password?
                  </Link>
                </div>
                <div className="w-100 mb-3 text-center">

                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Sign In
                </Button>
                <p className=" text-light fw-bold">Or</p>
                <GoogleLoginButton />
                </div>
                <div className="text-center text-light opacity-75">
                  <span>Don't have an account? </span>
                  <Link to="/Account/register" className="text-decoration-none">
                    Sign up
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login

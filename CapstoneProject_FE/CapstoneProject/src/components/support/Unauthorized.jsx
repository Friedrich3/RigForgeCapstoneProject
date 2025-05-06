import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import {
  ShieldLockFill,
  HouseFill,
  BoxArrowInRight,
  QuestionCircleFill,
  ExclamationTriangleFill,
  KeyFill,
} from "react-bootstrap-icons"

const Unauthorized = () => {
  return (
    <Container className="py-5 my-5">
      <Row className="justify-content-center text-center">
        <Col md={8} lg={6}>
          <div className="error-icon mb-4">
            <ShieldLockFill size={80} className="text-danger" />
          </div>

          <h1 className="display-1 fw-bold text-light mb-0">403</h1>
          <h2 className="display-6 text-light mb-4">Access Denied</h2>

          <p className="lead text-light opacity-75 mb-4">
            Sorry, you don't have permission to access this area. This motherboard is protected by advanced security
            protocols.
          </p>

          <Card className="border-0 shadow-sm mb-5" style={{ backgroundColor: "#121225", border: "1px solid #2c2c44" }}>
            <Card.Body className="p-4">
              <h5 className="text-light mb-3">Why am I seeing this?</h5>
              <ul className="text-start text-light opacity-75 mb-0">
                <li className="mb-2">
                  You may need to <strong>log in</strong> to access this page
                </li>
                <li className="mb-2">
                  Your account may not have <strong>sufficient permissions</strong>
                </li>
                <li className="mb-2">
                  The content may be <strong>restricted</strong> to specific user groups
                </li>
                <li className="mb-2">
                  Your session may have <strong>expired</strong> due to inactivity
                </li>
              </ul>
            </Card.Body>
          </Card>

          <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mb-5">
            <Button
              as={Link}
              to="/"
              variant="primary"
              size="lg"
              className="d-flex align-items-center justify-content-center"
            >
              <HouseFill className="me-2" /> Return Home
            </Button>
            <Button
              as={Link}
              to="/Account/login"
              variant="outline-light"
              size="lg"
              className="d-flex align-items-center justify-content-center"
            >
              <BoxArrowInRight className="me-2" /> Sign In
            </Button>
            <Button
              as={Link}
              to="/contact"
              variant="outline-secondary"
              size="lg"
              className="d-flex align-items-center justify-content-center"
            >
              <QuestionCircleFill className="me-2" /> Contact Support
            </Button>
          </div>

          <div
            className="animated-pulse p-4 rounded-3 mb-4"
            style={{ backgroundColor: "#1a1a35", border: "1px solid #2c2c44" }}
          >
            <div className="d-flex align-items-center mb-3">
              <ExclamationTriangleFill size={24} className="text-warning me-3" />
              <h5 className="text-light mb-0">Need immediate access?</h5>
            </div>
            <p className="text-light opacity-75 mb-3">
              If you believe you should have access to this page, please contact your system administrator or our
              support team.
            </p>
            <div className="d-flex align-items-center justify-content-center">
              <KeyFill size={20} className="text-primary me-2" />
              <span className="text-light">Access Code: PC_BUILDER_403</span>
            </div>
          </div>

          <div className="text-light opacity-75">
            <small>If you believe this is an error, please include this code when contacting support.</small>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Unauthorized

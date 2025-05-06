import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { HouseFill, Tools, QuestionCircleFill, ExclamationTriangleFill } from "react-bootstrap-icons"

const NotFound = () => {
  return (
    <Container className="py-5 my-5">
      <Row className="justify-content-center text-center">
        <Col md={8} lg={6}>
          <div className="error-icon mb-4">
            <ExclamationTriangleFill size={80} className="text-warning" />
          </div>

          <h1 className="display-1 fw-bold text-light mb-0">404</h1>
          <h2 className="display-6 text-light mb-4">Page Not Found</h2>

          <p className="lead text-light opacity-75 mb-5">
            Oops! It seems like the component you're looking for has been disconnected from the motherboard.
          </p>

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
              to="/builder"
              variant="outline-light"
              size="lg"
              className="d-flex align-items-center justify-content-center"
            >
              <Tools className="me-2" /> Builder
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

          <div className="p-4 rounded-3 mb-4" style={{ backgroundColor: "#121225", border: "1px solid #2c2c44" }}>
            <h5 className="text-light mb-3">Looking for something specific?</h5>
            <p className="text-light opacity-75 mb-3">
              Try checking the navigation menu or use the search function to find what you're looking for.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Link to="/products/cpu" className="text-decoration-none">
                CPUs
              </Link>
              <Link to="/products/gpu" className="text-decoration-none">
                GPUs
              </Link>
              <Link to="/products/motherboard" className="text-decoration-none">
                Motherboards
              </Link>
              <Link to="/guides" className="text-decoration-none">
                Guides
              </Link>
            </div>
          </div>

          <div className="error-code text-secondary">
            <small>Error Code: RIGFORGE_404</small>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound

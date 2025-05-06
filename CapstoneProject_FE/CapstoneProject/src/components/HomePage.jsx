import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircleFill, CpuFill, GearFill, GraphUp, HddStackFill, Laptop, PersonFill, ShieldShaded } from "react-bootstrap-icons"
import { useEffect, useState } from "react"
import LoadingScreen from "./support/LoadingScreen"
import {normalizeImagePath} from "../redux/actions/ProductsApi"

const HomePage = () => {
  const [Featureds, setFeatureds] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(()=>{
    fetchFeatured()
  },[])

  const fetchFeatured = async () => {
    try {
      const url = "https://localhost:7099/api/SharedBuild/featured"
    const response = await fetch(url)
    if(!response.ok){
      setIsLoading(false);
      throw new Error("Error while fetching FeaturedBuilds")
    }
    const data = await  response.json();
    setFeatureds(data.data)
    setIsLoading(false)
    } catch (error) {
      console.log("Error:", error)
    }
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero-section py-5"
        style={{ background: "linear-gradient(135deg, #121225 0%, #1a1a35 100%)" }}
      >
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold text-light mb-3">Build Your Dream PC</h1>
              <p className="lead text-light opacity-75 mb-4">
                Create your perfect custom PC with our easy-to-use builder tool. Select compatible components, compare
                prices, and build with confidence.
              </p>
              <div className="d-flex gap-3">
                <Link to="/builder" className="btn btn-primary btn-lg px-4 py-2">
                  Start Building <ArrowRight className="ms-2" />
                </Link>
                <Link to="/Builds" className="btn btn-outline-light btn-lg px-4 py-2">
                  View Builds
                </Link>
              </div>
            </Col>
            <Col lg={6}>
              <div className="position-relative">
                <div
                  className="hero-image-container p-3 rounded-4 shadow-lg"
                  style={{ background: "rgba(21, 21, 43, 0.4)", backdropFilter: "blur(10px)" }}
                >
                  <img
                    src="src/assets/img/heroSectionv2.png"
                    alt="PC Builder Interface"
                    className="img-fluid rounded-3"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ backgroundColor: "#0a0a14" }}>
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-light mb-3">Why Choose RigForge</h2>
            <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: "700px" }}>
              Our platform offers everything you need to build your perfect custom PC
            </p>
          </div>

          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm feature-card" style={{ backgroundColor: "#121225" }}>
                <Card.Body className="p-4 text-center">
                  <div
                    className="feature-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <GearFill size={30} />
                  </div>
                  <Card.Title className="text-light h5 mb-3">Easy Building</Card.Title>
                  <Card.Text className="text-light opacity-75">
                    Our intuitive interface makes it simple to select compatible components and build your dream PC.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm feature-card" style={{ backgroundColor: "#121225" }}>
                <Card.Body className="p-4 text-center">
                  <div
                    className="feature-icon bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <ShieldShaded size={30} />
                  </div>
                  <Card.Title className="text-light h5 mb-3">Compatibility Check</Card.Title>
                  <Card.Text className="text-light opacity-75">
                    Our system automatically checks component compatibility to ensure your build works perfectly.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm feature-card" style={{ backgroundColor: "#121225" }}>
                <Card.Body className="p-4 text-center">
                  <div
                    className="feature-icon bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <GraphUp size={30} />
                  </div>
                  <Card.Title className="text-light h5 mb-3">Price Comparison</Card.Title>
                  <Card.Text className="text-light opacity-75">
                    Compare prices from multiple retailers to get the best deals on your components.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm feature-card" style={{ backgroundColor: "#121225" }}>
                <Card.Body className="p-4 text-center">
                  <div
                    className="feature-icon bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <PersonFill size={30} />
                  </div>
                  <Card.Title className="text-light h5 mb-3">Community Support</Card.Title>
                  <Card.Text className="text-light opacity-75">
                    Join our community of PC enthusiasts to share builds and get advice on your configuration.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-5" style={{ backgroundColor: "#121225" }}>
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-light mb-3">How It Works</h2>
            <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: "700px" }}>
              Building your custom PC is easy with our step-by-step process
            </p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <div className="text-center mb-4 mb-md-0">
                <div
                  className="step-number rounded-circle bg-primary d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <span className="text-white fw-bold h4 mb-0">1</span>
                </div>
                <h3 className="h4 text-light mb-3">Select Components</h3>
                <p className="text-light opacity-75">
                  Browse our extensive catalog of PC components and select the parts that match your needs and budget.
                </p>
                <div className="step-icon text-primary mb-3">
                  <CpuFill size={40} />
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="text-center mb-4 mb-md-0">
                <div
                  className="step-number rounded-circle bg-primary d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <span className="text-white fw-bold h4 mb-0">2</span>
                </div>
                <h3 className="h4 text-light mb-3">Check Compatibility</h3>
                <p className="text-light opacity-75">
                  Our system automatically verifies that all your selected components work together perfectly.
                </p>
                <div className="step-icon text-primary mb-3">
                  <HddStackFill size={40} />
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="text-center">
                <div
                  className="step-number rounded-circle bg-primary d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <span className="text-white fw-bold h4 mb-0">3</span>
                </div>
                <h3 className="h4 text-light mb-3">Complete Your Build</h3>
                <p className="text-light opacity-75">
                  Review your build, save it to your account, or purchase all components with just a few clicks.
                </p>
                <div className="step-icon text-primary mb-3">
                  <Laptop size={40} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5" style={{ backgroundColor: "#0a0a14" }}>
        <Container className="py-5">
          <Row className="g-4 text-center">
            <Col md={3}>
              <div className="mb-4 mb-md-0">
                <h2 className="display-4 fw-bold text-primary mb-2">10K+</h2>
                <p className="text-light mb-0">Components</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="mb-4 mb-md-0">
                <h2 className="display-4 fw-bold text-primary mb-2">50K+</h2>
                <p className="text-light mb-0">Completed Builds</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="mb-4 mb-md-0">
                <h2 className="display-4 fw-bold text-primary mb-2">100K+</h2>
                <p className="text-light mb-0">Happy Users</p>
              </div>
            </Col>
            <Col md={3}>
              <div>
                <h2 className="display-4 fw-bold text-primary mb-2">24/7</h2>
                <p className="text-light mb-0">Support</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>


      {/* CTA Section */}
      <section className="py-5" style={{ background: "linear-gradient(135deg, #121225 0%, #1a1a35 100%)" }}>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="display-5 fw-bold text-light mb-3">Ready to Build Your Dream PC?</h2>
              <p className="lead text-light opacity-75 mb-4 mx-auto" style={{ maxWidth: "700px" }}>
                Start building your custom PC today with our easy-to-use builder tool. Select compatible components,
                compare prices, and create the perfect PC for your needs.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/builder" className="btn btn-primary btn-lg px-4 py-2">
                  Start Building Now <ArrowRight className="ms-2" />
                </Link>
                <Link to="/Account/register" className="btn btn-outline-light opacity-75 btn-lg px-4 py-2">
                  Create Account
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Builds Section */}
      <section className="py-5" style={{ backgroundColor: "#0a0a14" }}>
        <Container className="py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="display-6 fw-bold text-light mb-0">Featured Builds</h2>
            <Link to="/Builds" className="btn btn-outline-light opacity-75">
              View All <ArrowRight className="ms-2" />
            </Link>
          </div>


{/* FEATURED BUILDS */}
          <Row className="g-4 justify-content-xl-center">
            {isLoading && 
            <LoadingScreen message={"Loading Featured Builds..."}/>}
            {!isLoading && Featureds.map((build,index) => (

              <Col md={4} xxl={3} key={index}>
                <Card className="border-0 shadow-sm h-100" style={{ backgroundColor: "#121225" }}>

                  <Card.Img
                              variant="top"
                              src={normalizeImagePath(build.image)}
                              alt={build.buildName}
                              height={400}
                              className="p-2"
                            />
                  <Card.Body className="p-4 d-flex flex-column ">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="text-light mb-0">{build.buildName}</h5>
                    </div>
                    <div className="text-light opacity-75">
                      <div className="d-flex mb-2">
                          <div className="d-flex flex-column mb-3">
                            <small className="text-light opacity-75">
                              <img
                                src="src/assets/img/cpu-dark.png"
                                width={22}
                                className="me-1"
                              />{" "}
                              {build.cpuName}
                            </small>
                            <small className="text-light opacity-75">
                              <img
                                src="src/assets/img/gpu-dark.png"
                                width={22}
                                className="me-1"
                              />{" "}
                              {build.gpuName}
                            </small>
                            <small className="text-light opacity-75">
                              <img
                                src="src/assets/img/case-dark.png"
                                width={22}
                                className="me-1"
                              />{" "}
                              {build.caseName}
                            </small>
                          </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="text-light fw-bold">${build.totalPrice.toFixed(2)}</span>
                      <Link to={`/Builds/${build.userBuildId}`} className="btn btn-sm btn-outline-light opacity-75">
                        View Details
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default HomePage

import { useEffect, useState } from "react"
import { Container, Row, Col, Card, ListGroup, Badge, Button } from "react-bootstrap"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Check, InfoCircle, Share, ArrowLeft } from "react-bootstrap-icons"
import { normalizeImagePath } from "../../redux/actions/ProductsApi"
import { GetShareBuildDetail } from "../../redux/actions/ShareBuildApi"
import { useDispatch, useSelector } from "react-redux"
import { CloneBuildAuthorize, CloneBuildLocal } from "../../redux/actions/BuildApi"

const componentCategories = [
  { id: "cpu", name: "CPU", icon: "cpu-dark.png" },
  { id: "cpucooler", name: "CPU Cooler", icon: "cpu-cooler-dark.png" },
  { id: "motherboard", name: "Motherboard", icon: "motherboard-dark.png" },
  { id: "gpu", name: "GPU", icon: "gpu-dark.png" },
  { id: "ram", name: "RAM", icon: "ram-dark.png" },
  { id: "storage", name: "Storage", icon: "storage-dark.png" },
  { id: "powersupply", name: "Power Supply", icon: "power-supply-dark.png" },
  { id: "case", name: "Case", icon: "case-dark.png" },
]

const BuildViewer = () => {
  const activeUser = useSelector((state) => state.profile.data)
  const { buildId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [build, setBuild] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBuild()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildId])

  const fetchBuild = async () => {
    setLoading(true)
    const data = await GetShareBuildDetail(buildId)
      setBuild(data.data)
      setLoading(false)
  }

  const checkComponents = () =>{
    return componentCategories.reduce((tot, category) =>{
        return tot + (build[category.id] ? 1 : 0);
      },0)
    
  }
  const checkWattage =() => {
    if(build.requiredWattage && build.maxBuildWattage){
      return (build.requiredWattage / build.maxBuildWattage) * 100;
    }else{
      return 0;
    }
  }
  const getDate = (datetime) =>{
  const date = new Date(datetime);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  const handleCloneBuild = async () =>{
    
    if(activeUser.email && activeUser.role){
      await CloneBuildAuthorize(build.userBuildId)
      navigate("/builder")
    }else{
      await dispatch(CloneBuildLocal(build))
    }
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-light mt-3">Loading build details...</p>
      </Container>
    )
  }

  if (!build) {
    return (
      <Container className="py-5 text-center">
        <h3 className="text-light">Build not found</h3>
        <p className="text-light opacity-75">The build you're looking for doesn't exist or has been removed.</p>
        <Button as={Link} to="/builds" variant="primary" className="mt-3">
          <ArrowLeft className="me-2" /> Back to Builds
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <Button as={Link} to="/builds" variant="outline-light" size="sm" className="mb-3">
            <ArrowLeft className="me-2" /> Back to Builds
          </Button>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="text-light mb-1">{build.buildName}</h2>
              <p className="text-light opacity-75 mb-0">
                By{" "}{build.username}
                {/* <Link to={`/profile/${build.author}`} className="text-decoration-none">
                  
                </Link> */}
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={9}>
          <Card className="border-0 shadow mb-4" style={{ backgroundColor: "#121225" }}>
            <Card.Header className="bg-dark text-light border-bottom border-secondary d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Build Components</h5>
              <div className="d-flex align-items-center">
                <span className="text-light opacity-75 me-3">
                  <small>
                  Last Update {getDate(build.lastModified)}
                  </small>
                </span>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {componentCategories.map((category) => {
                  const component = build[category.id]
                  return (
                    <ListGroup.Item
                      key={category.id}
                      className="d-flex align-items-center border-bottom border-secondary py-3"
                      style={{ backgroundColor: "#121225" }}
                    >
                      <div className="d-flex align-items-center" style={{ width: "150px" }}>
                        <span className="text-light">
                          <img src={`/src/assets/img/${category.icon}`} alt="" height="25" className="me-2" />{" "}
                          {category.name}
                        </span>
                      </div>

                      {component ? (
                        <div className="flex-grow-1 d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div>
                              <div>
                                <div style={{ width: "75px", minWidth: "75px" }} className="p-1">
                                  <img
                                    src={normalizeImagePath(component.image) || "/placeholder.svg"}
                                    alt={component.name}
                                    className="img-fluid"
                                  />
                                </div>
                              </div>
                            </div>
                            <Link to={`/products/${category.id}/${component.id}`} className="text-decoration-none">
                              <h6 className="mb-0 text-light">{component.name}</h6>
                            </Link>
                          </div>

                          <div className="d-flex align-items-center">
                            <span className="text-light">${component.price.toFixed(2)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-grow-1">
                          <span className="text-secondary">No component selected</span>
                        </div>
                      )}
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow mb-4" style={{ backgroundColor: "#121225" }}>
            <Card.Header className="bg-dark text-light border-bottom border-secondary">
              <h5 className="mb-0">Build Description</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <p className="text-light mb-0">{build.description}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3}>
          <Card className="border-0 shadow mb-4" style={{ backgroundColor: "#121225" }}>
            <Card.Header className="bg-dark text-light border-bottom border-secondary">
              <h5 className="mb-0">Build Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-light">Wattage</span>
                  <span className="text-light">{build.requiredWattage > 0 ? `${build.requiredWattage}W` : "N/A"}</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className={`progress-bar ${
                      checkWattage() < 70 ? "bg-success" : checkWattage() < 90 ? "bg-warning" : "bg-danger"
                    }`}
                    role="progressbar"
                    style={{ width: `${Math.min(checkWattage(), 100)}%` }}
                    aria-valuenow={`${Math.min(checkWattage(), 100)}`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <small className="text-light opacity-75">
                  Estimated wattage: {build.maxBuildWattage != null ? `${build.maxBuildWattage} W` : "N/A"}
                </small>
              </div>

              <hr className="border-secondary" />

              <div className="d-flex justify-content-between mb-3">
                <span className="text-light">Components</span>
                <span className="text-light">
                  {checkComponents()} / {componentCategories.length}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-light">Total Price</span>
                <span className="text-light fw-bold">${build.totalPrice.toFixed(2)}</span>
              </div>

              <Button 
              // as={Link} to="/builder" 
              variant="outline-light" className="w-100"
              onClick={()=>handleCloneBuild()}>
                Clone This Build
              </Button>
            </Card.Body>
          </Card>

        </Col>
      </Row>
    </Container>
  )
}

export default BuildViewer

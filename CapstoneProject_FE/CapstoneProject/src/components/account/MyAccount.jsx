"use client"
import { Container, Row, Col, Nav, Card } from "react-bootstrap"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Person, Wrench, Bell, CreditCard, Shield, BoxArrowRight } from "react-bootstrap-icons"
import AccountDetails from "./AccountDetails"
import MyBuilds from "./MyBuilds"
import { useDispatch, useSelector } from "react-redux"
import { Logout } from "../../redux/actions/AccountApi"

const MyAccount = () => {
  const { section } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.profile.data)

  // Funzione per cambiare sezione
  const handleSectionChange = (selectedSection) => {
    navigate(`/Account/${selectedSection}`)
  }

  // Render della sezione corrente
  const renderSection = () => {
    switch (section) {
      case "mybuilds":
        return <MyBuilds />
      case "profile":
        return <AccountDetails userData={user} />
      default:
        break
    }
  }

  const formatRegisteredDate = (rawDate) => {
    if (!rawDate) return "Data non disponibile";
    const date = new Date(rawDate);
    return date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
    const logoutAccount = () =>{
      dispatch(Logout())
      navigate("/Account/Login")
    }

  return (
    <Container fluid className="py-4">
      <Row>
        <Col lg={3} className="mb-4">
          <Card className="border-0 shadow-sm" style={{ backgroundColor: "#121225" }}>
            <Card.Body className="p-0">
              <div className="p-4 text-center border-bottom border-secondary">
                <div className="mb-3">
                </div>
                <h5 className="text-light mb-1">{user.username}</h5>
                <p className="text-light small mb-0">Member since {formatRegisteredDate(user.registeredAt)}</p>
              </div>

              <Nav className="flex-column py-2">
                <Nav.Link
                  as={Link}
                  to="/Account/profile"
                  className={`d-flex align-items-center px-4 py-3 ${
                    section === "profile" ? "active bg-primary text-white" : "text-light"
                  }`}
                  onClick={() => handleSectionChange("profile")}
                >
                  <Person size={18} className="me-3" />
                  <span>Account Details</span>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/Account/mybuilds"
                  className={`d-flex align-items-center px-4 py-3 ${
                    section === "mybuilds" ? "active bg-primary text-white" : "text-light"
                  }`}
                  onClick={() => handleSectionChange("mybuilds")}
                >
                  <Wrench size={18} className="me-3" />
                  <span>My Builds</span>
                </Nav.Link>
                {/* <Nav.Link
                  as={Link}
                  to="/account/notifications"
                  className="d-flex align-items-center px-4 py-3 text-light"
                >
                  <Bell size={18} className="me-3" />
                  <span>Notifications</span>
                  <span className="badge bg-danger ms-auto">3</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/account/billing" className="d-flex align-items-center px-4 py-3 text-light">
                  <CreditCard size={18} className="me-3" />
                  <span>Billing & Payments</span>
                </Nav.Link>*/}
                {user.role ==="Admin" &&
                <Nav.Link as={Link} to="/backoffice/overview" className="d-flex align-items-center px-4 py-3 text-light">
                  <Shield size={18} className="me-3" />
                  <span>BackOffice &#40; ADMIN Only &#41;</span>
                </Nav.Link>
                }
              </Nav>

              <div className="p-4 border-top border-secondary">
                <Nav.Link className="d-flex align-items-center text-danger" onClick={logoutAccount}>
                  <BoxArrowRight size={18} className="me-2" />
                  <span>Logout</span>
                </Nav.Link> 
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>{renderSection()}</Col>
      </Row>
    </Container>
  )
}

export default MyAccount

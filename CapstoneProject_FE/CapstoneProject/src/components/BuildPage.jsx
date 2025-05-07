import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
  Badge,
  NavLink,
  Modal,
} from "react-bootstrap";
import {
  Amazon,
  ArrowCounterclockwise,
  BoxArrowUpRight,
  Cart,
  Check,
  InfoCircle,
  Plus,
  PlusLg,
  Save,
  Share,
  ShareFill,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ExportToText, NewBuild, RemoveComponent, RemoveComponentApi, ResetBuildFromApi, StartupLoadFromApi } from "../redux/actions/BuildApi";
import { normalizeImagePath } from "../redux/actions/ProductsApi";
import { useEffect, useState } from "react";

const BuildPage = () => {
  const currentUser = useSelector((state) => state.profile.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentBuild = useSelector((state) => state.build.data);

  const [showExport,setShowExport] = useState(false);
  const [exportBuild, setExportBuild] = useState("")



  useEffect(()=>{
    if(currentUser.email && currentUser.role){
      dispatch(StartupLoadFromApi())
    }else{
      dispatch({type:"STARTUP_LOAD_FROM_STORAGE"})
    }
    checkComponents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentUser, dispatch])

  const componentCategories = [
    {
      id: "cpu",
      name: "CPU",
      icon: "cpu-dark.png",
      selected: currentBuild.cpu,
      link: `/products/cpu?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc&search=`,
    },
    {
      id: "cpucooler",
      name: "CPU Cooler",
      icon: "cpu-cooler-dark.png",
      selected: currentBuild.cpucooler,
      link: `/products/cpucooler?page=1&pageSize=12&sortBy=price&sortDir=desc&search=`,
    },
    {
      id: "motherboard",
      name: "Motherboard",
      icon: "motherboard-dark.png",
      selected: currentBuild.motherboard,
      link: `/products/motherboard?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc&search=`,
    },
    {
      id: "gpu",
      name: "GPU",
      icon: "gpu-dark.png",
      selected: currentBuild.gpu,
      link: `/products/gpu?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc&search=`,
    },
    {
      id: "ram",
      name: "Ram",
      icon: "ram-dark.png",
      selected: currentBuild.ram,
      link: `/products/ram?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc&search=`,
    },
    {
      id: "storage",
      name: "Storage",
      icon: "storage-dark.png",
      selected: currentBuild.storage,
      link: `/products/storage?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc&search=`,
    },
    {
      id: "powersupply",
      name: "Power Supply",
      icon: "power-supply-dark.png",
      selected: currentBuild.powersupply,
      link: `/products/powersupply?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc&search=`,
    },
    {
      id: "case",
      name: "Case",
      icon: "case-dark.png",
      selected: currentBuild.case,
      link: `/products/case?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc&search=`,
    },
  ];

  const calculateTotalPrice = () => {
    let total = 0;
    Object.values(currentBuild).forEach((item) => {
      if (item && item.price) {
        total += item.price;
      }
    });
    return total;
  };

  const handleRemoveComponent = (category) => {
    if(currentUser.role){
      dispatch(RemoveComponentApi(category));
    }else{
      dispatch(RemoveComponent(category));
    }
  };

  const handleResetBuild = () => {
    if(currentUser.email && currentUser.role){
      dispatch(ResetBuildFromApi());
    }else{
      dispatch({type:"RESET_BUILD"});
    }
  };

  const handleNavigateToDetails = (category) => {
    if (category.selected?.id) {
      navigate(`/products/${category.id}/${category.selected.id}`);
    }
  }

  const checkComponents = () =>{
    return componentCategories.reduce((tot, category) =>{
        return tot + (category.selected ? 1 : 0);
      },0)
    
  }
  const checkWattage =() => {
    if(currentBuild.requiredWattage && currentBuild.maxBuildWattage){
      return (currentBuild.requiredWattage / currentBuild.maxBuildWattage) * 100;
    }else{
      return 0;
    }
  }
  

  const exportModal = () => {
    return (
      <>
        <Modal show={showExport} onHide={()=>{setShowExport(false)}} className="" size="lg" data-bs-theme="dark">
            <Modal.Header closeButton className="">
            <Modal.Title>Export Custom Build - Copy and Paste to share the build info </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#121225" }} className="">
            <Form onSubmit={(e) => {e.preventDefault()}}>
                <Form.Group className="mb-3">
                <Form.Label className="">Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={20}
                    placeholder=""
                    className=""
                    value={exportBuild}
                    autoFocus
                    onChange={(e)=>{setExportBuild(e.target.value)}}
                />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#121225" }} className="">
            <Button variant="secondary" type="button" onClick={()=>{setShowExport(false)}}>
                Close
            </Button>
            <Button variant="primary" type="button" onClick={()=>{}} >
                Copy to Clipboard
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
  }
  const handleExport = ()=>{
    if(currentUser.email && currentUser.role){
      setExportBuild(ExportToText(currentBuild));
    }else{
      setExportBuild(ExportToText(currentBuild, calculateTotalPrice(currentBuild)))
    }
      setShowExport(true)
  }



  return (
    
    <Container className="py-4">
      <>{exportModal()}</>
      <Row>
        <Col lg={9}>
          <Card
            className="border-0 shadow mb-4"
            style={{ backgroundColor: "#121225" }}
          >
            <Card.Header className="bg-dark text-light border-bottom border-secondary d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{currentUser.role ? `${currentBuild.name}`: currentBuild.name? `${currentBuild.name}`:`Current Build` }</h5>
              <div>
                {currentUser.role ?
                  <></>
                  :
                  <Button as={Link} to={"/Account/login"} variant="outline-light " size="sm" className="me-2 opacity-75" ><Save className="me-1" /> Login to Save Build</Button>
                }
                {/* TODO: WINDOW PERSONALIZZATA PER LA CANCELLAZIONE DELLA BUILD */}
                <Button variant="outline-light" className="opacity-75 me-1 " size="sm"onClick={handleResetBuild}>
                  <ArrowCounterclockwise className="me-1 align-center"/> Reset Build
                </Button>
                <Button variant="outline-light" className="opacity-75" size="sm" onClick={handleExport}>
                  <BoxArrowUpRight className="me-1 text-center pb-1"/> Export Build
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {/* componenti */}
                {componentCategories.map((category) => (
                  <ListGroup.Item
                    key={category.id}
                    className="align-items-center border-bottom border-secondary py-3 d-xl-flex "
                    style={{ backgroundColor: "#121225" }}
                  >
                    <div
                      className="d-flex align-items-center col-xl-2 pb-lg-1"
                      //style={{ width: "150px" }}
                    >
                      <span className="text-light custom-truncate">
                        <img
                          src={`src/assets/img/${category.icon}`}
                          alt=""
                          height="25"
                          className="me-2"
                        />{" "}
                        {category.name}
                      </span>
                    </div>

                    {category.selected ? (
                      <div className="flex-grow-1 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div >
                            <div >
                              <div
                                style={{ width: "75px", minWidth: "75px" }}
                                className="p-1"
                              >
                                <img
                                  src={normalizeImagePath(
                                    category.selected.image
                                  )}
                                  alt={category.selected.name}
                                  onClick={() => {if (category.selected?.id) {handleNavigateToDetails(category);}}}
                                  className="img-fluid custom-link"
                                />
                              </div>
                            </div>
                          </div>
                          <h5 className="mb-0 text-light custom-link"  onClick={() => {if (category.selected?.id) {handleNavigateToDetails(category);}}}>
                            {category.selected.name}
                          </h5>
                        </div>

                        <div className="d-flex align-items-center">
                          <span className="text-light me-3">
                            ${category.selected.price.toFixed(2)}
                          </span>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveComponent(category.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      //TERNARY OPERATOR
                      <div className="flex-grow-1 d-flex justify-content-between align-items-center">
                        <span className="text-secondary">
                          No component selected
                        </span>
                        <Link
                          to={category.link}
                          className="btn btn-primary btn-sm"
                        >
                          <Plus className="me-1" /> Choose {category.name}
                        </Link>
                      </div>
                    )}
                  </ListGroup.Item>
                ))}
                {/* fine COMPS */}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3}>
          <Card
            className="border-0 shadow mb-4"
            style={{ backgroundColor: "#121225" }}
          >
            <Card.Header className="bg-dark text-light border-bottom border-secondary">
              <h5 className="mb-0">Build Summary</h5>
            </Card.Header>
            <Card.Body>
              {/* TODO : Fixare badge compatibilita se compatibile*/}
              {/* <div className="d-flex justify-content-between mb-3">
                <span className="text-light">Compatibility</span>
                <Badge bg="success" className="d-flex align-items-center">
                  <Check className="me-1" /> Compatible
                </Badge>
              </div> */}

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-light">Wattage</span>
                  <span className="text-light">{currentBuild.requiredWattage > 0? `${currentBuild.requiredWattage}W`: "N/A"}</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className={`progress-bar ${checkWattage() < 70 ? "bg-success " : checkWattage() < 90 ? "bg-warning": "bg-danger" }`}
                    role="progressbar"
                    style={{ width: `${Math.min(checkWattage(),100)}%` }}
                    aria-valuenow={`${Math.min(checkWattage(),100)}`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <small className="text-light opacity-75">
                  Estimated wattage: {currentBuild.maxBuildWattage != null? `${currentBuild.maxBuildWattage} W`:"N/A"} 
                </small>
              </div>

              <hr className="border-secondary" />

              <div className="d-flex justify-content-between mb-3">
                <span className="text-light">Components</span>
                <span className="text-light">
                  {checkComponents()} /{" "}
                  {componentCategories.length}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-light">Total Price</span>
                <span className="text-light fw-bold">
                  ${calculateTotalPrice().toFixed(2)}
                </span>
              </div>
              {/* IF Not  LOGGED */}
              {!currentUser.email && !currentUser.role &&
              <Button variant="outline-light" className="w-100 mb-2" onClick={()=>{handleResetBuild()}}>
                <PlusLg className="me-2" /> Start New Build
              </Button>
              }

              {/* IF LOGGED */}
              {currentUser.email && currentUser.role &&
              <Button variant="outline-light" className="w-100 mb-2" onClick={()=>{dispatch(NewBuild())}}>
                <PlusLg className="me-2" /> Start New Build
              </Button>
              }

              {currentUser.email && currentUser.role &&
              <Button variant="outline-light" className="w-100 mb-2" as={Link} to={"/Account/mybuilds"}> 
                <ShareFill className="me-2"/> Share Build
              </Button>
              }
              <Button variant="primary" className="w-100 " onClick={()=>{ alert("We are currently waiting for amazon to connect our services. This feature will be available soon! ")} }>
                <Amazon className="me-2" /> Buy All Components
              </Button>
            </Card.Body>
          </Card>

          {/* <Card
            className="border-0 shadow"
            style={{ backgroundColor: "#121225" }}
          >
            <Card.Header className="bg-dark text-light border-bottom border-secondary">
              <h5 className="mb-0">Guides</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h6 className="text-light">How to Use PC Builder</h6>
                <p className="text-muted small mb-2">
                  Step-by-step guide to building your custom PC
                </p>
                <Link
                  to="/guides/how-to-use"
                  className="btn btn-sm btn-outline-light"
                >
                  Read Guide
                </Link>
              </div>

              <hr className="border-secondary" />

              <div>
                <h6 className="text-light">Compatibility Guide</h6>
                <p className="text-muted small mb-2">
                  Learn about component compatibility
                </p>
                <Link
                  to="/guides/compatibility"
                  className="btn btn-sm btn-outline-light"
                >
                  Read Guide
                </Link>
              </div>
            </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
};

export default BuildPage;

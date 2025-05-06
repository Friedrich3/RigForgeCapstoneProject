import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Nav,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Search,
  Grid3x3,
  List,
  SortDown,
  Heart,
  Eye,
  Calendar3,
  Lightning,
  Filter,
  BookmarkStarFill,
} from "react-bootstrap-icons";
import { GetAllSharedBuilds } from "../../redux/actions/ShareBuildApi";
import { normalizeImagePath } from "../../redux/actions/ProductsApi";
import { useSelector } from "react-redux";
import DropDown from "../support/DropDown";
import LoadingScreen from "../support/LoadingScreen";

const BuildsGallery = () => {
  //TODO : IMpostare dropdown su carte per la gestione delle build da admin
  const activeUser = useSelector((state) => state.profile.data)

  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid o list
  const [sortOption, setSortOption] = useState("recommended");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    fetchDatas();
  }, [isChange]);

  const fetchDatas = async () => {
    setLoading(true);
    const result = await GetAllSharedBuilds();
    setBuilds(result.data);
    setLoading(false);
  };
  
  const reload = ()=>{
    setIsChange(!isChange)
  }

  const filteredBuilds = builds.filter((build) => {
    const matchesSearch = build.buildName
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) || build.userName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch;
  });

  // Ordina le build in base all'opzione selezionata
  const sortedBuilds = [...filteredBuilds].sort((a, b) => {
    switch (sortOption) {
      case "recommended":
        return (b.isFeatured === true? 1 : 0) - (b.isFeatured === false? 1 : 0);
      case "recent":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "price-low":
        return a.totalPrice - b.totalPrice;
      case "price-high":
        return b.totalPrice - a.totalPrice;
      default:
        return 0;
    }
  });

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBuilds = sortedBuilds.slice(startIndex, endIndex);

  const renderPagination = () => {
    return (
      <Pagination className="justify-content-center mt-4" data-bs-theme={"dark"}>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        />
        {[...Array(Math.ceil(builds.length / itemsPerPage)).keys()].map(
          (number) => (
            <Pagination.Item
              key={number + 1}
              active={currentPage === number + 1}
              onClick={() => setCurrentPage(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          disabled={currentPage === Math.ceil(builds.length / itemsPerPage)}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </Pagination>
    );
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setViewMode("list");
    }else{
      setViewMode("grid");
    }
  };

  const renderBuildCard = (build) => {
    if (viewMode === "list") {
      return (
        <Card
          className="border-0 shadow-sm mb-3"
          style={{ backgroundColor: "#121225" }}
        >
        {build.isFeatured &&
        <BookmarkStarFill className="position-absolute top-0 start-0 text-warning fs-3"/>
        }
          {(activeUser && (activeUser.username === build.userName || activeUser.role === "Admin")) &&
        <DropDown build={ build } reload={reload}/>
      }
          <div className="d-flex">
            <div style={{ width: "200px", minWidth: "200px" }} className="p-3">
              <Link to={`/builds/${build.userBuildId}`}>
                <img
                  src={normalizeImagePath(build.image)}
                  alt={build.buildName}
                  className="img-fluid rounded"
                />
              </Link>
            </div>
            <Card.Body className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <Link
                    to={`/builds/${build.userBuildId}`}
                    className="text-decoration-none"
                  >
                    <h5 className="text-light mb-1">{build.buildName}</h5>
                  </Link>
                  <p className="text-light opacity-75 small mb-2">
                    By {build.userName}
                    {/* <Link to={`/profile/${build.author}`} className="text-decoration-none">
                      
                      </Link> */}
                  </p>
                  <div className="d-flex mb-2">
                    <div className="d-flex flex-column mb-3">
                      <small className="text-light opacity-75 custom-truncate">
                        <img
                          src="src/assets/img/cpu-dark.png"
                          width={22}
                          className="me-1"
                        />{" "}
                        {build.cpuName}
                      </small>
                      <small className="text-light opacity-75 custom-truncate">
                        <img
                          src="src/assets/img/gpu-dark.png"
                          width={22}
                          className="me-1"
                        />{" "}
                        {build.gpuName}
                      </small>
                      <small className="text-light opacity-75 custom-truncate">
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
              </div>

              <div className="mt-auto d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-light fw-bold">
                    ${build.totalPrice.toFixed(2)}
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  as={Link}
                  to={`/builds/${build.userBuildId}`}
                >
                  View Build
                </Button>
              </div>
            </Card.Body>
          </div>
        </Card>
      );
    }
    return (
      <Card
        className="border-0 shadow-sm h-100"
        style={{ backgroundColor: "#121225" }}
      >
        {build.isFeatured &&
                <BookmarkStarFill className="position-absolute top-0 start-0 text-warning fs-3"/>
            }
      {(activeUser && (activeUser.username === build.userName || activeUser.role === "Admin")) &&
        <DropDown build={ build } reload={reload}/>
      }
        <Link
          to={`/builds/${build.userBuildId}`}
          className="text-decoration-none"
        >
          <Card.Img
            variant="top"
            src={normalizeImagePath(build.image)}
            alt={build.buildName}
            height={400}
            className="p-2"
          />
        </Link>
        <Card.Body className="d-flex flex-column">
          {/* <div className="mb-2">
            <Badge bg="primary" className="me-1">
            {build.category.charAt(0).toUpperCase() + build.category.slice(1)}
            </Badge>
            <Badge bg="secondary" className="me-1">
              {build.components} components
            </Badge>
          </div> */}

          <Link
            to={`/builds/${build.userBuildId}`}
            className="text-decoration-none"
          >
            <Card.Title className="text-light mb-1">
              {build.buildName}
            </Card.Title>
          </Link>
          <Card.Text className="text-light opacity-75 small mb-2">
            By {build.userName}
            {/* <Link to={`/profile/${build.userName}`} className="text-decoration-none">
              
            </Link> */}
          </Card.Text>

          <div className="d-flex flex-column mb-3">
            <small className="text-light opacity-75 custom-truncate">
              <img
                src="src/assets/img/cpu-dark.png"
                width={22}
                className="me-1"
              />{" "}
              {build.cpuName}
            </small>
            <small className="text-light opacity-75 custom-truncate">
              <img
                src="src/assets/img/gpu-dark.png"
                width={22}
                className="me-1"
              />{" "}
              {build.gpuName}
            </small>
            <small className="text-light opacity-75 custom-truncate">
              <img
                src="src/assets/img/case-dark.png"
                width={22}
                className="me-1"
              />{" "}
              {build.caseName}
            </small>
          </div>

          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-light fw-bold">
                ${build.totalPrice.toFixed(2)}
              </span>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="w-100"
              as={Link}
              to={`/builds/${build.userBuildId}`}
            >
              View Build
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };





  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-light mb-2">Community Builds</h1>
          <p className="text-light opacity-75">
            Explore PC builds shared by our community. Get inspired and find
            your next dream build.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6} lg={8} className="mb-3 mb-md-0">
          <InputGroup>
            <InputGroup.Text className="bg-dark border-secondary">
              <Search className="text-light" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search builds by name, author, or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-dark text-light border-secondary"
            />
          </InputGroup>
        </Col>
        <Col md={6} lg={4} className="d-flex justify-content-md-end">
          <div className="d-flex align-items-center me-3">
            <Button
              variant={viewMode === "grid" ? "primary" : "outline-light"}
              size="sm"
              className="me-2 d-flex h-100 align-items-center"
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 size={16} />
            </Button>
            <Button
              variant={viewMode === "list" ? "primary" : "outline-light"}
              size="sm"
              className="d-flex h-100 align-items-center"
              onClick={() => setViewMode("list")}
            >
              <List size={16} />
            </Button>
          </div>
          <div className="d-flex align-items-center">
            <SortDown size={18} className="text-light me-2" />
            <Form.Select
              size="sm"
              value={sortOption}
              onChange={handleSortChange}
              className="bg-dark text-light border-secondary"
              style={{ width: "auto" }}
            >
              <option value="recommended">Recommended</option>
              <option value="recent">Most Recent</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </Form.Select>
          </div>
        </Col>
      </Row>

      {/* <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm" style={{ backgroundColor: "#121225" }}>
            <Card.Body className="py-2">
              <div className="d-flex align-items-center">
                <Filter className="text-light me-3" />
                <Nav className="flex-nowrap overflow-auto hide-scrollbar">
                  <Nav.Link
                    className={`text-nowrap ${filterCategory === "all" ? "text-primary" : "text-light"}`}
                    onClick={() => setFilterCategory("all")}
                  >
                    All Builds
                  </Nav.Link>
                  <Nav.Link
                    className={`text-nowrap ${filterCategory === "gaming" ? "text-primary" : "text-light"}`}
                    onClick={() => setFilterCategory("gaming")}
                  >
                    Gaming
                  </Nav.Link>
                  <Nav.Link
                    className={`text-nowrap ${filterCategory === "streaming" ? "text-primary" : "text-light"}`}
                    onClick={() => setFilterCategory("streaming")}
                  >
                    Streaming
                  </Nav.Link>
                  <Nav.Link
                    className={`text-nowrap ${filterCategory === "workstation" ? "text-primary" : "text-light"}`}
                    onClick={() => setFilterCategory("workstation")}
                  >
                    Workstation
                  </Nav.Link>
                  <Nav.Link
                    className={`text-nowrap ${filterCategory === "budget" ? "text-primary" : "text-light"}`}
                    onClick={() => setFilterCategory("budget")}
                  >
                    Budget
                  </Nav.Link>
                  <Nav.Link
                    className={`text-nowrap ${filterCategory === "content" ? "text-primary" : "text-light"}`}
                    onClick={() => setFilterCategory("content")}
                  >
                    Content Creation
                  </Nav.Link>
                </Nav>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}

      {loading ? (
        // <Row className="py-5 text-center">
        //   <Col>
        //     <div className="spinner-border text-light" role="status">
        //       <span className="visually-hidden">Loading...</span>
        //     </div>
        //     <p className="text-light mt-3">Loading builds...</p>
        //   </Col>
        // </Row>
        <LoadingScreen message={"Loading builds..."} />

      ) : sortedBuilds.length === 0 ? (
        <Row className="py-5 text-center">
          <Col>
            <h4 className="text-light mb-3">No builds found</h4>
            <p className="text-light opacity-75 mb-4">
              {searchTerm
                ? "No builds match your search criteria. Try adjusting your filters or search term."
                : "There are no builds to display at this time."}
            </p>
            <Button variant="primary" as={Link} to="/builder">
              Create Your Own Build
            </Button>
          </Col>
        </Row>
      ) : (
        <Row className={viewMode === "list" ? "" : "g-4"}>
          {displayedBuilds.map((build) => (
            <Col
              key={build.id}
              xs={12}
              md={viewMode === "list" ? 12 : 6}
              lg={viewMode === "list" ? 12 : 4}
              xl={viewMode === "list" ? 12 : 3}
              className={viewMode === "list" ? "mb-3" : ""}
            >
              {renderBuildCard(build)}
            </Col>
          ))}
        </Row>
      )}

      {!loading && displayedBuilds.length > 0 && (
        renderPagination()
      )}
    </Container>
  );
};

export default BuildsGallery;

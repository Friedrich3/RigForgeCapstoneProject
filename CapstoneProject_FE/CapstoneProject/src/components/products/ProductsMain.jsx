import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Breadcrumb,
} from "react-bootstrap";
import {
  Funnel,
  SortDown,
  Grid,
  List,
  XCircleFill,
  Search,
  ArrowLeft,
} from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { GetallProducts } from "../../redux/actions/ProductsApi";
import ProductListCard from "./ProductListCard";
import ProductGridCard from "./ProductGridCard";
import { debounce } from "lodash";
import ProductFilters from "./ProductFilters";

const ProductsMain = () => {
  const navigate = useNavigate();

  const { category } = useParams();

  //GESTIONE URL DINAMICA
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;
  const pageSize = parseInt(queryParams.get("pageSize")) || 12;
  const sortBy = queryParams.get("sortBy") || "releaseyear";
  const sortDir = queryParams.get("sortDir") || "desc";
  //build attule per filtri compatibilita'
  const build = useSelector((state) => state.build.data);

  //useState per filtri ProductFilters.jsx
  const manufacturer = queryParams.get("manufacturer");
  const minPrice = queryParams.get("minPrice");
  const maxPrice = queryParams.get("maxPrice");
  const socket = queryParams.get("socket");
  const coolertype = queryParams.get("type");
  const ramtype = queryParams.get("ramtype");
  const formfactor = queryParams.get("formfactor");

  const minFrequency = queryParams.get("minSpeed");
  const maxFrequency = queryParams.get("maxSpeed");
  const minCapacity = queryParams.get("minCapacity");
  const maxCapacity = queryParams.get("maxCapacity");
  const storagetype = queryParams.get("storagetype");

  const minStorage = queryParams.get("minStorage");
  const maxStorage = queryParams.get("maxStorage");

  const modulartype = queryParams.get("modulartype");
  const minwattage = queryParams.get("minWattage");
  const maxwattage = queryParams.get("maxWattage");
  
  const color = queryParams.get("color");
  const glasspanel = queryParams.get("glasspanel");

  //UseStates
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null);
  //Paginazione e visualizzazione
  const [currentPage, setCurrentPage] = useState(page);
  const [viewMode, setViewMode] = useState("list"); // grid or list
  const [showFilters, setShowFilters] = useState(true);
  const [sortOption, setSortOption] = useState("featured");
  const [searchOption, setSearchOption] = useState(
    queryParams.get("search") || ""
  );

  useEffect(() => {
    if (!category) return;
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, location.search]);

  useEffect(() => {
    const updateSearchQuery = debounce((value) => {
      if (queryParams.get("search") !== value) {
      queryParams.set("search", value);
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      });
    }
    }, 500); // 500ms delay

    updateSearchQuery(searchOption);

    return () => {
      updateSearchQuery.cancel();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOption]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await GetallProducts(
        build,
        category,
        page,
        pageSize,
        sortBy,
        sortDir,
        searchOption,
        minPrice,
        maxPrice,
        manufacturer,
        socket,
        coolertype,
        ramtype,
        formfactor,
        minFrequency,
        maxFrequency,
        minCapacity,
        maxCapacity,
        storagetype,
        minStorage,     
        maxStorage,
        modulartype,
        minwattage,
        maxwattage,
        color,
        glasspanel
      );
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const resetAllFilters =() =>{
    setSearchOption("");
    navigate(`/products/${category}?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc`);
  }

  // Mapping per i nomi delle categorie
  const categoryNames = {
    cpu: "CPUs",
    motherboard: "Motherboards",
    cpucooler: "CPU Coolers",
    ram: "RAMs",
    gpu: "Graphics Cards",
    storage: "Storage",
    case: "Cases",
    powersupply: "Power Supplies",
  };

  const handlePageChange = (pageNumber) => {
    queryParams.set("page", pageNumber);
    setCurrentPage(pageNumber);
    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });

    // Scroll to top when changing page
    window.scrollTo(0, 0);
  };

  //LEGATO ALLA SORT BY DELLA GRIGLIA/LISTA
  const handleSortChange = (e) => {
    if (e.target.value === sortOption) return;
    setSortOption(e.target.value);
    switch (e.target.value) {
      case "featured":
        queryParams.set("sortBy", "releaseyear");
        queryParams.set("sortDir", "desc");
        break;

      case "priceasc":
        queryParams.set("sortBy", "price");
        queryParams.set("sortDir", "asc");
        break;

      case "pricedesc":
        queryParams.set("sortBy", "price");
        queryParams.set("sortDir", "desc");
        break;

      case "nameasc":
        queryParams.set("sortBy", "name");
        queryParams.set("sortDir", "asc");
        break;

      case "namedesc":
        queryParams.set("sortBy", "name");
        queryParams.set("sortDir", "desc");
        break;
      default:
        break;
    }
    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  };

  // const handleSearchChange = (e) =>{
  //   e.preventDefault()
  //   queryParams.set("search", searchOption);
  //   navigate({
  //     pathname: location.pathname,
  //     search: queryParams.toString(),
  //   });
  // };

  //PAGINAZIONE ALLA FINE DELLA LISTA/GRID
  const renderPagination = () => {
      const totalPages = products?.totalPages || 0;

      if (totalPages <= 1) return null;
      
      return (
        <div className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              >
              Previous
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
            key={index}
            className={`page-item ${
              currentPage === index + 1 ? "active" : ""
              }`}
              >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
                >
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
              }`}
              >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              >
              Next
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const renderProductCard = (product) => {
    if (viewMode === "list") {
      return <ProductListCard product={product} />;
    }
    return <ProductGridCard product={product} />;
  };

  //MAIN BODY
  return (
    <>
      {!isLoading && (
        <>
          <div className="container-lg py-4 px-5" >
            <Row className="mb-2">
              <Col>
                <Breadcrumb className="bg-transparent p-0">
                  <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                    Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/builder" }}>
                    Build
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className="text-secondary" active>
                    {categoryNames[category] || category}
                  </Breadcrumb.Item>
                </Breadcrumb>
                <h1 className="text-light mb-0">
                  {categoryNames[category] || category}
                </h1>
                <p className="text-secondary">{products? `
                  ${products.totalCount} ${products.totalCount === 1 ? "product" : "products"} found `
                  : null
                  }
                </p>
<div className="d-flex justify-content-between ">
<Button variant="outline-light" size="sm" className=" align-content-center" as={Link} to={`/builder`}>
            <ArrowLeft size={16} className="me-1" /> Back to Builder
          </Button>
                {/* SEARCHBAR */}
                <Form className="d-flex justify-content-end">
                  <div className="position-relative">
                    <Form.Control
                      type="search"
                      value={searchOption}
                      onChange={(e) => setSearchOption(e.target.value)}
                      placeholder="Search"
                      className="bg-dark text-light border-secondary"
                      style={{ paddingRight: "2.5rem" }}
                      />
                    <Button
                      variant="link"
                      className="position-absolute end-0 top-0 text-light h-100"
                      disabled
                      >
                      <Search />
                    </Button>
                  </div>
                </Form>
                      </div>
              </Col>
            </Row>

            <Row>
              <ProductFilters category={category} showFilters={showFilters} setShowFilters={setShowFilters} />

              {/* Products Grid */}
              <Col lg={showFilters ? 9 : 12}>
                <Card
                  className="border-0 shadow-sm mb-4"
                  style={{ backgroundColor: "#121225" }}
                >
                  <Card.Header className="bg-dark border-0">
                    <Row className="align-items-center">
                      <Col xs={12} md={6} className="mb-3 mb-md-0">
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-light"
                            size="sm"
                            className="d-lg-none me-2"
                            onClick={() => setShowFilters(true)}
                          >
                            <Funnel size={16} className="me-1" /> Filters
                          </Button>

                          <div className="d-none d-md-flex">
                            <Button
                              variant={
                                viewMode === "list"
                                  ? "primary"
                                  : "outline-light"
                              }
                              className="me-2"
                              size="sm"
                              onClick={() => setViewMode("list")}
                            >
                              <List size={16} />
                            </Button>
                            <Button
                              variant={
                                viewMode === "grid"
                                  ? "primary"
                                  : "outline-light"
                              }
                              size="sm"
                              onClick={() => setViewMode("grid")}
                            >
                              <Grid size={16} />
                            </Button>
                          </div>
                        </div>
                      </Col>

                      <Col xs={12} md={6}>
                        <div className="d-flex align-items-center justify-content-md-end">
                          <div className="d-flex align-items-center">
                            <SortDown size={18} className="text-light me-2" />
                            <Form.Select
                              size="sm"
                              value={sortOption}
                              onChange={handleSortChange}
                              className="bg-dark text-light border-secondary"
                              style={{ width: "auto" }}
                            >
                              <option value="featured">Default</option>
                              <option value="priceasc">
                                Price: Low to High
                              </option>
                              <option value="pricedesc">
                                Price: High to Low
                              </option>
                              <option value="nameasc">Name: A to Z</option>
                              <option value="namedesc">Name: Z to A</option>
                            </Form.Select>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Header>

                  <Card.Body className="p-3">
                    <Row className={viewMode === "list" ? "" : "g-3"}>
                      {/* Products if < 0 */}
                      {products?.items?.length === 0 &&
                      <Row className="py-5 text-center">
                          <Col>
                            <h4 className="text-light mb-3">No products found</h4>
                            <p className="text-light opacity-75 mb-4">
                                No products match your criteria. Try adjusting your filters or search term.
                            </p>
                            <Button
                              variant="outline-danger" onClick={resetAllFilters}
                              >
                              Clear All Filters
                            </Button>
                          </Col>
                      </Row>}
                      {/* Producsts map if > 0 */}
                      {products?.items?.length >=0 && products.items.map((product) => (
                        <Col
                          key={product.id}
                          xs={12}
                          md={viewMode === "list" ? 12 : 6}
                          lg={viewMode === "list" ? 12 : 4}
                          xl={viewMode === "list" ? 12 : 3}
                          className={viewMode === "list" ? "mb-3" : ""}
                        >
                          {renderProductCard(product)}
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>

                {renderPagination()}
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default ProductsMain;

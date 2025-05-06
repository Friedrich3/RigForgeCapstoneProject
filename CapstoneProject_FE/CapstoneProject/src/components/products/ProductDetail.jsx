import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Tabs,
    Tab,
    Table,
    Breadcrumb,
} from "react-bootstrap";
import { Heart, Check, ArrowLeft } from "react-bootstrap-icons";
import {
    GetSingleProduct,
    normalizeImagePath,
} from "../../redux/actions/ProductsApi";
import CpuDetailSpec from "./DetailsBody/CpuDetailSpec";
import CoolerDetailSpec from "./DetailsBody/CoolerDetailSpec";
import MoboDetailSpec from "./DetailsBody/MoboDetailSpec";
import RamDetailSpec from "./DetailsBody/RamDetailSpec";
import GpuDetailSpec from "./DetailsBody/GpuDetailSpec";
import StorageDetailSpec from "./DetailsBody/StorageDetailSpec";
import CaseDetailSpec from "./DetailsBody/CaseDetailSpec";
import PsuDetailSpec from "./DetailsBody/PsuDetailSpec";
import { AddComponent, AddComponentApi } from "../../redux/actions/BuildApi";
import { useDispatch, useSelector } from "react-redux";

const ProductDetail = () => {
    const currentUser = useSelector((state) => state.profile.data);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category, productId } = useParams();

    const [activeTab, setActiveTab] = useState("overview");
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const data = await GetSingleProduct(category, productId);
            setProduct(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const renderProductBody = (category, product) => {
        switch (category) {
            case "cpu":
                return <CpuDetailSpec product={product} />;
            case "cpucooler":
                return <CoolerDetailSpec product={product} />;
            case "motherboard":
                return <MoboDetailSpec product={product} />;
            case "ram":
                return <RamDetailSpec product={product} />;
            case "gpu":
                return <GpuDetailSpec product={product} />;
            case "storage":
                return <StorageDetailSpec product={product} />;
            case "case":
                return <CaseDetailSpec product={product} />;
            case "powersupply":
                return <PsuDetailSpec product={product} />;

            default:
                return <></>;
        }
    };

    const handleNavigate = async () => {
        if(currentUser.role){
            await AddComponentApi(productId, category);
        }else{
            await dispatch(AddComponent(category, product));
        }
        navigate("/builder");
    };

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col>
                    <Breadcrumb className="bg-transparent p-0">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                            Home
                        </Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/builder" }}>
                            Builder
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            linkAs={Link}
                            linkProps={{ to: `/products/${category}` }}
                        >
                            {categoryNames[category] || category}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active className="text-secondary">
                            {product.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Button
                        variant="outline-light"
                        size="sm"
                        className="mb-3"
                        as={Link}
                        to={`/products/${category}`}
                    >
                        <ArrowLeft size={16} className="me-1" /> Back to{" "}
                        {categoryNames[category] || category}
                    </Button>
                </Col>
            </Row>

            {!isLoading && (
                <Row className="g-4">
                    {/* Top: Image + name + buttons */}
                    <Col xs={12}>
                        <Card
                            className="border-0 shadow-sm p-4 d-flex flex-md-row align-items-center justify-content-between"
                            style={{ backgroundColor: "#121225" }}
                        >
                            <div className="d-flex align-items-center">
                                <img
                                    src={normalizeImagePath(product.image) || "/placeholder.svg"}
                                    alt={product.name}
                                    className="img-fluid me-4"
                                    style={{ maxHeight: "150px", maxWidth: "150px" }}
                                />
                                <h3 className="text-light mb-0">{product.name}</h3>
                            </div>
                            <div className="d-flex flex-column align-items-end">
                                <Button
                                    variant="primary"
                                    className="mb-2"
                                    onClick={handleNavigate}
                                >
                                    <Check size={16} className="me-1" /> Add to Build
                                </Button>
                            </div>
                        </Card>
                    </Col>

                    {/* Bottom: Left (Tabs), Right (Specs) */}
                    <Col md={4}>
                        <Card
                            className="border-0 shadow-sm h-100"
                            style={{ backgroundColor: "#121225" }}
                        >
                            <Card.Body className="p-0">
                                <Tabs
                                    activeKey={activeTab}
                                    
                                    onSelect={(k) => setActiveTab(k)}
                                    className="mb-0 product-tabs"
                                >
                                    <Tab eventKey="overview" title="Overview">
                                        <div className="p-4">
                                            <h5 className="text-light mb-3">Product Overview</h5>
                                            <p className="text-light opacity-75">
                                                {product.description}
                                            </p>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="reviews" title="Reviews">
                                        <div className="p-4">
                                            <h5 className="text-light mb-3">Customer Reviews</h5>
                                            <p className="text-light opacity-75">
                                                No reviews available.
                                            </p>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={8}>
                        <Card
                            className="border-0 shadow-sm h-100"
                            style={{ backgroundColor: "#121225" }}
                        >
                            <Card.Body className="p-4">
                                <h3 className="text-light mb-3">Specifications</h3>
                                <Table responsive variant="dark" className="border-secondary">
                                    <tbody>
                                        {renderProductBody(category, product)}

                                        {/* {product.specs && Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key}>
                        <td className="text-light opacity-75" style={{ width: "30%" }}>{key}</td>
                        <td className="text-light">{value}</td>
                      </tr>
                    ))} */}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default ProductDetail;

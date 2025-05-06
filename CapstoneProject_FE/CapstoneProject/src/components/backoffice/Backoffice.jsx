import { Card, Row, Col, Container, Nav } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import CaseTable from "./case/CaseTable";
import CpuTable from "./cpu/CpuTable";
import CpuCoolerTable from "./cpucooler/CpuCoolerTable";
import GpuTable from "./gpu/GpuTable";
import MotherboardTable from "./motherboard/MotherboardTable";
import PowerSupplyTable from "./powersupply/PowerSupplyTable";
import RamTable from "./ram/RamTable";
import StorageTable from "./storage/StorageTable";
import Template from "./supportTables/Template";

const sections = [
{ label: "CPU", route: "cpu" },
{ label: "Coolers", route: "cpucooler" },
{ label: "Motherboards", route: "motherboard" },
{ label: "RAM", route: "ram" },
{ label: "GPU", route: "gpu" },
{ label: "Storage", route: "storage" },
{ label: "Cases", route: "case" },
{ label: "Power Supplies", route: "powersupply" },
{ label: "Support Tables", route: "support" },
];

const BackofficeMain = () => {
const { section } = useParams()
const navigate = useNavigate()

 // Funzione per cambiare sezione
const handleSectionChange = (selectedSection) => {
    navigate(`/backoffice/${selectedSection}`)
}    
//   Render della sezione corrente
const renderSection = () => {
switch (section) {
    case "cpu":
    return <CpuTable />
    case "cpucooler":
    return <CpuCoolerTable />
    case "motherboard":
    return <MotherboardTable />
    case "ram":
    return <RamTable />
    case "gpu":
    return <GpuTable />
    case "storage":
    return <StorageTable />
    case "case":
    return  <CaseTable />
    case "powersupply":
    return <PowerSupplyTable />
    case "support":
    // return <SocketTable />
        return <Template />
    default:
    break
}
}




return (
<>
<Container fluid className="py-4">
<Row>
<Col lg={2} className="mb-4">
<Card className="border-0 shadow-sm" style={{ backgroundColor: "#121225" }}>
    <Card.Body className="p-0">
    <Nav className="flex-column py-2">
        {sections.map((category, index) => (
        <Nav.Link
        key={index}
        as={Link}
        to={`/backoffice/${category.route}`}
        className={`d-flex align-items-center px-4 py-3 ${
            section === category.route ? "active bg-primary text-white" : "text-light"
        }`}
        onClick={() => handleSectionChange(category.route)}
        >
        <span>{category.label}</span>
        </Nav.Link>
            ))
        }
    </Nav>
    </Card.Body>
</Card>
</Col>

<Col lg={10}>{renderSection()}</Col>
</Row>
</Container>
</>
);
};

export default BackofficeMain;

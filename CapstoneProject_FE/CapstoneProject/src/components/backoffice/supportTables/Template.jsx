import { Col, Container, Row } from "react-bootstrap";
import ManufacturerTable from "./ManufacturerTable";
import SocketTable from "./SocketTable";
import RamTypeTable from "./RamTypeTable";
import FormFactorTable from "./FormFactorTable";
import StorageTypeTable from "./StorageTypeTable";

const Template = () => {
return (
<>
    <Container fluid>
    <Row>
        <Col md={4} className="mb-3 mb-md-0">
        <ManufacturerTable />
        </Col>
        <Col md={7}>
        <div className="mb-3">
            <SocketTable />
        </div>
        <div className="mb-3">
            <RamTypeTable />
        </div>

        <div className="mb-3">
            <FormFactorTable />
        </div>
        <div className="mb-3">
            <StorageTypeTable />
        </div>
        </Col>
    </Row>
    </Container>
</>
);
};

export default Template;

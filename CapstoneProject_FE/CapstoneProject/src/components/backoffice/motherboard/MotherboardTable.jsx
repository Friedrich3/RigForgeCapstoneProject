// MotherboardTable.jsx
import { useState, useEffect } from "react";
import {
Button,
Card,
Modal,
Table,
Form,
Row,
Col,
Pagination,
} from "react-bootstrap";
import { AddNewComponent, DeleteComponent, EditComponent, GetAllComponentBackoffice, GetAllFormFactor, GetAllManufacturers, GetAllRamType, GetAllSockets } from "../../../redux/actions/BackofficeApi";
import { normalizeImagePath } from "../../../redux/actions/ProductsApi";

const MotherboardTable = () => {
const [isChange, setIsChange] = useState(false);
    // TODO CAMBIARE
const [component, setComponent] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 25;
const [showModal, setShowModal] = useState(false);
const [editMode, setEditMode] = useState(false);
//TODO CAMBIARE
const [formData, setFormData] = useState({ motherboardId: null, name: "",price:"", maxRam: "", ramSlots: "", chipset: "",wifiIncluded: false,pcieSlots:"",m2Slots:"", releaseYear:"",description:"",image:"",manufacturer:{},ramType:{},socket:{},formFactor:{} });
const [manufacturersList, setManufacturersList] = useState([]);
const [socketList, setSocketList] = useState([]);
const [ramTypeList, setRamTypeList] = useState([]);
const [formFactorList, setFormFactorList] = useState([]);


useEffect(() => {
    handleFetch()
}, [isChange]);

const handleFetch = async () => {
    const data = await GetAllComponentBackoffice("motherboard")
    setComponent(data)
}

const handleFetchSupport = async ()=> {
    const manufacturers = await GetAllManufacturers("motherboard");
    setManufacturersList(manufacturers)
    const sockets = await GetAllSockets();
    setSocketList(sockets);
    const ramtypes = await GetAllRamType();
    setRamTypeList(ramtypes);
    const formfactors = await GetAllFormFactor();
    setFormFactorList(formfactors);
}

const handleShowModal = (item = null) => {
    handleFetchSupport();
if (item) {
    setEditMode(true);
    setFormData({ motherboardId: item.motherboardId , name: item.name ,price:item.price , maxRam: item.maxRam , ramSlots: item.ramSlots , chipset: item.chipset , wifiIncluded: item.wifiIncluded , pcieSlots:item.pcieSlots , m2Slots:item.m2Slots , releaseYear: item.releaseYear , description:item.description , image:item.image , manufacturer:item.manufacturer.id , ramType:item.ramType.id , socket:item.socket.id , formFactor:item.formFactor.id  });
} else {
    setEditMode(false);
    setFormData({ motherboardId: null, name: "",price:"", maxRam: "", ramSlots: "", chipset: "",wifiIncluded: false,pcieSlots:"",m2Slots:"", releaseYear:"",description:"",image:"",manufacturer:{},ramType:{},socket:{},formFactor:{} });
}
setShowModal(true);
};

const handleCloseModal = () => setShowModal(false);

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
    e.preventDefault()
    const newformData = new FormData()
        newformData.append("Name", formData.name);
        newformData.append("ManufacturerId", formData.manufacturer);
        newformData.append("SocketId", formData.socket);
        newformData.append("Chipset", formData.chipset);
        newformData.append("FormFactorId", formData.formFactor);
        newformData.append("RamTypeId", formData.ramType);
        newformData.append("MaxRam", formData.maxRam);
        newformData.append("RamSlots", formData.ramSlots);
        newformData.append("PcieSlots", formData.pcieSlots);
        newformData.append("M2Slots", formData.m2Slots);
        newformData.append("ReleaseYear", formData.releaseYear);
        newformData.append("WifiIncluded", formData.wifiIncluded);
        newformData.append("Price", formData.price.toString());
        newformData.append("Description", formData.description);
        newformData.append("Image", formData.image);



if (editMode) {
    await EditComponent("Motherboard", formData.motherboardId , newformData);
} else {
    await AddNewComponent("Motherboard", newformData)
}
setShowModal(false);
setIsChange(!isChange)
};

const handleDelete = async(id) => {
    await DeleteComponent("Motherboard",id)
    setIsChange(!isChange)
};

const totalPages = Math.ceil(component.length / itemsPerPage);
const displayedMobos = component.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

const renderPagination = () => (
<Pagination className="mt-3 justify-content-center" data-bs-theme={"dark"}>
    <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} />
    {[...Array(totalPages)].map((_, index) => (
    <Pagination.Item
        key={index}
        active={index + 1 === currentPage}
        onClick={() => setCurrentPage(index + 1)}
    >
        {index + 1}
    </Pagination.Item>
    ))}
    <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} />
</Pagination>
);

return (
<Card className="border-0 shadow-sm" style={{ backgroundColor: "#121225" }}>
    <Card.Header className="bg-dark d-flex justify-content-between align-items-center">
    <h5 className="text-light mb-0">Motherboard Management</h5>
    <Button size="sm" onClick={() => handleShowModal()}>+ Add Motherboard</Button>
    </Card.Header>
    <Card.Body>
    <Table striped bordered hover variant="dark" responsive>
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Maker</th>
            <th>Socket</th>
            <th>Chipset</th>
            <th>Form Factor</th>
            <th>MemoryType</th>
            <th>Max Memory</th>
            <th>Ram Slots</th>
            <th>Pcie Slots</th>
            <th>M.2 Slots</th>
            <th>Wifi</th>
            <th>Year of Release</th>
            <th>Price</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {displayedMobos.map((item, index) => (
            <tr key={index}>
            <td><img src={`${normalizeImagePath(item.image)}`} width={25}/></td>
            <td>{item.name}</td>
            <td>{item.manufacturer.name}</td>
            <td>{item.socket.name}</td>
            <td>{item.chipset}</td>
            <td>{item.formFactor.name}</td>
            <td>{item.ramType.name}</td>
            <td>{item.maxRam}</td>
            <td>{item.ramSlots}</td>
            <td>{item.pcieSlots}</td>
            <td>{item.m2Slots}</td>
            <td>{item.wifiIncluded? "Yes" : "No"}</td>
            <td>{item.releaseYear}</td>
            <td>{item.price.toFixed(2)}</td>
            <td>
                <Button size="sm" variant="outline-light" className="me-2" onClick={() => handleShowModal(item)}>
                Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(item.motherboardId)}>
                Delete
                </Button>
            </td>
            </tr>
        ))}
        </tbody>
    </Table>
    {renderPagination()}
    </Card.Body>

    {/* Add/Edit Modal */}
    <Modal show={showModal} onHide={handleCloseModal} centered data-bs-theme={"dark"}>
    <Modal.Header closeButton>
        <Modal.Title>{editMode ? "Edit Motherboard" : "Add Motherboard"}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        
        <Form >
        <Row className="mb-3">
        <Col>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={formData.name} onChange={handleChange} required/>
            </Form.Group>
            </Col> 
        </Row> 
        <Row className="mb-3">
            <Col>
            <Form.Group>
                <Form.Label>Manufacturer</Form.Label>
                <Form.Select  
                value={ formData.manufacturer }
                name="manufacturer" onChange={handleChange} required >
                <option value="">Choose...</option>
                {manufacturersList.length >0 && manufacturersList.map((item,index) => (
                    <option value={item.id} key={index}>{item.name}</option>
                ))}
                </Form.Select>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Socket</Form.Label>
                <Form.Select
                value={formData.socket} 
                name="socket" onChange={handleChange} required> 
                <option value="">Choose...</option>
                {socketList.length >0 && socketList.map((item,index) => (
                    <option value={item.id} key={index}>{item.name}</option>
                ))}
                </Form.Select>
            </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col>
            <Form.Group>
                <Form.Label>Chipset</Form.Label>
                <Form.Control name="chipset" value={formData.chipset} onChange={handleChange} required/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Form Factor</Form.Label>
                <Form.Select  
                value={ formData.formFactor }
                name="formFactor" onChange={handleChange} required >
                <option value="">Choose...</option>
                {formFactorList.length >0 && formFactorList.map((item,index) => (
                    <option value={item.id} key={index}>{item.name}</option>
                ))}
                </Form.Select>
            </Form.Group>
            </Col>
        </Row>

        <Row className="mb-3">
        <Col>
            <Form.Group>
                <Form.Label>Ram Type</Form.Label>
                <Form.Select  
                value={ formData.ramType }
                name="ramType" onChange={handleChange} required >
                <option value="">Choose...</option>
                {ramTypeList.length > 0 && ramTypeList.map((item,index) => (
                    <option value={item.id} key={index}>{item.name}</option>
                ))}
                </Form.Select>
            </Form.Group>
            </Col>
        <Col>
            <Form.Group>
                <Form.Label>Max RAM Capacity </Form.Label>
                <Form.Control name="maxRam" value={formData.maxRam} onChange={handleChange} type="number" required/>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group>
                <Form.Label>Ram Slots</Form.Label>
                <Form.Control name="ramSlots" value={formData.ramSlots} onChange={handleChange} type="number"  required/>
            </Form.Group>
        </Col>
        </Row>

        <Row className="mb-3">
        <Col>
            <Form.Group>
                <Form.Label>Pcie Slots</Form.Label>
                <Form.Control name="pcieSlots" value={formData.pcieSlots} onChange={handleChange} type="number" required/>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group>
                <Form.Label>M.2 Slots</Form.Label>
                <Form.Control name="m2Slots" value={formData.m2Slots} onChange={handleChange} type="number"  required/>
            </Form.Group>
        </Col>
        </Row>

        <Row className="mb-3">
        <Col>
            <Form.Group>
                <Form.Label>Year of Release</Form.Label>
                <Form.Control name="releaseYear" value={formData.releaseYear} onChange={handleChange} type="number"  required/>
            </Form.Group>
        </Col>
        <Col>
        <Form.Group  className="h-100 d-flex align-items-end">
                <Form.Label></Form.Label>
                <Form.Check
                        className=""
                        type="checkbox"
                        label="Wireless Network"
                        checked={formData.wifiIncluded}
                        onChange={(e) =>
                            setFormData({ ...formData, wifiIncluded: e.target.checked })
                            }
                    />
            </Form.Group>
        </Col>
        </Row>

        <Row className="mb-3">
        <Col xs={6}>
            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control name="price" value={formData.price} onChange={handleChange} step={0.01} type="number" required/>
            </Form.Group>
        </Col>
        
        </Row>
        <Row className="mb-3">
        <Form.Group controlId="formFile">
                    <Form.Label>Immagine</Form.Label>
                    <Form.Control type="file" onChange={(e) => {
                        setFormData({ ...formData, image: e.target.files[0] });
                    }}  required={!editMode}/>
        </Form.Group>
        </Row>

        <Row className="mb-3">
        <Col>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" value={formData.description} onChange={handleChange} as="textarea" rows={3} required/>
            </Form.Group>
            </Col> 
        </Row> 





        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit} >{editMode ? "Save Changes" : "Add Motherboard"}</Button>
    </Modal.Footer>
    </Modal>
</Card>
);
};

export default MotherboardTable;

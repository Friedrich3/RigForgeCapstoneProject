// CpuTable.jsx
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
import { AddNewComponent, DeleteComponent, EditComponent, GetAllComponentBackoffice, GetAllManufacturers, GetAllSockets } from "../../../redux/actions/BackofficeApi";
import { normalizeImagePath } from "../../../redux/actions/ProductsApi";

const CpuTable = () => {
const [isChange, setIsChange] = useState(false);

const [cpus, setCpus] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 25;
const [showModal, setShowModal] = useState(false);
const [editMode, setEditMode] = useState(false);

const [formData, setFormData] = useState({ id: null, name: "", cores: "",threads: "", baseClock: "",boostClock: "", tdp: "",integratedGraphics : false,  releaseYear: "", price: 0, manufacturer: {} , socket: {} , description: "" , image: ""});
const [manufacturersList, setManufacturersList] = useState([]);
const [socketList, setSocketList] = useState([]);

useEffect(() => {
    handleFetch()
}, [isChange]);



const handleFetch = async () => {
    const data = await GetAllComponentBackoffice("Cpu")
    setCpus(data)
}

const handleFetchSupport = async ()=> {
    const manufacturers = await GetAllManufacturers("cpu");
    setManufacturersList(manufacturers)
    const sockets = await GetAllSockets();
    setSocketList(sockets);
}

const handleShowModal = (cpu = null) => {
    handleFetchSupport();
if (cpu) {
    setEditMode(true);
    setFormData({ cpuId: cpu.cpuId, name:cpu.name , cores: cpu.cores ,threads: cpu.threads , baseClock: cpu.baseClock, boostClock: cpu.boostClock, tdp: cpu.tdp ,integratedGraphics : cpu.integratedGraphics ,  releaseYear: cpu.releaseYear , price: cpu.price , manufacturer: cpu.manufacturer.id , socket: cpu.socket.id , description: cpu.description , image: cpu.image});
} else {
    setEditMode(false);
    //CAMBIARE
    setFormData({ cpuId: null, name: "", cores: "",threads: "", baseClock: "",boostClock: "", tdp: "",integratedGraphics : false,  releaseYear: "", price: 0, manufacturer: {} , socket: {} , description: "" , image: ""});
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
        newformData.append("Cores", formData.cores);
        newformData.append("Threads", formData.threads);
        newformData.append("BaseClock", parseFloat(formData.baseClock));
        newformData.append("BoostClock", parseFloat(formData.boostClock));
        newformData.append("Tdp", formData.tdp);
        newformData.append("IntegratedGraphics", formData.integratedGraphics);
        newformData.append("ReleaseYear", formData.releaseYear);
        newformData.append("Price", formData.price.toString());
        newformData.append("ManufacturerId", formData.manufacturer);
        newformData.append("SocketId", formData.socket);
        newformData.append("Description", formData.description);
        newformData.append("Image", formData.image);

if (editMode) {
    await EditComponent("Cpu", formData.cpuId , newformData);
} else {
    await AddNewComponent("Cpu", newformData)
}
setShowModal(false);
setIsChange(!isChange)
};

const handleDelete = async(id) => {
    await DeleteComponent("Cpu",id)
    setIsChange(!isChange)
};



const totalPages = Math.ceil(cpus.length / itemsPerPage);
const displayedCpus = cpus.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <h5 className="text-light mb-0">CPU Management</h5>
    <Button size="sm" onClick={() => handleShowModal()}>+ Add CPU</Button>
    </Card.Header>
    <Card.Body>
    <Table striped bordered hover variant="dark" responsive>
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Maker</th>
            <th>Socket</th>
            <th>Cores</th>
            <th>Threads</th>
            <th>Core Clock</th>
            <th>Boost Clock</th>
            <th>TDP</th>
            <th>Integrated Graphic</th>
            <th>Year of Release</th>
            <th>Price</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {displayedCpus.map((cpu, index) => (
            <tr key={index}>
            <td><img src={`${normalizeImagePath(cpu.image)}`} width={25}/></td>
            <td>{cpu.name}</td>
            <td>{cpu.manufacturer.name}</td>
            <td>{cpu.socket.name}</td>
            <td>{cpu.cores}</td>
            <td>{cpu.threads}</td>
            <td>{cpu.baseClock} Ghz</td>
            <td>{cpu.boostClock} Ghz</td>
            <td>{cpu.tdp}</td>
            <td>{cpu.integratedGraphics? "Yes" : "No"}</td>
            <td>{cpu.releaseYear}</td>
            <td>{cpu.price.toFixed(2)}</td>
            <td>
                <Button size="sm" variant="outline-light" className="me-2" onClick={() => handleShowModal(cpu)}>
                Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(cpu.cpuId)}>
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
        <Modal.Title>{editMode ? "Edit CPU" : "Add CPU"}</Modal.Title>
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
                <Form.Label>Cores</Form.Label>
                <Form.Control name="cores" value={formData.cores} onChange={handleChange} step="1" type="number" required/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Threads</Form.Label>
                <Form.Control name="threads" value={formData.threads} onChange={handleChange} step="1" type="number" required/>
            </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col>
            <Form.Group>
                <Form.Label>Base Clock (GHz)</Form.Label>
                <Form.Control name="baseClock" value={formData.baseClock} onChange={handleChange} type="number" step="0.1" required/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Boost Clock (GHz)</Form.Label>
                <Form.Control name="boostClock" value={formData.boostClock} onChange={handleChange} type="number" step="0.1" required/>
            </Form.Group>
            </Col>
            
        </Row>
        <Row className="mb-3">
        <Col>
            <Form.Group>
                <Form.Label>TDP (W)</Form.Label>
                <Form.Control name="tdp" value={formData.tdp} onChange={handleChange} type="number" required/>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group>
                <Form.Label>Year of Release</Form.Label>
                <Form.Control name="releaseYear" value={formData.releaseYear} onChange={handleChange} type="number"  required/>
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
        <Col>
            <Form.Group  className="h-100 d-flex align-items-end">
                <Form.Label></Form.Label>
                <Form.Check
                        className=""
                        type="checkbox"
                        label="Integrated Graphics"
                        checked={formData.integratedGraphics}
                        onChange={(e) =>
                            setFormData({ ...formData, integratedGraphics: e.target.checked })
                            }
                    />
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
        <Button variant="primary" onClick={handleSubmit} >{editMode ? "Save Changes" : "Add CPU"}</Button>
    </Modal.Footer>
    </Modal>
</Card>
);
};

export default CpuTable;

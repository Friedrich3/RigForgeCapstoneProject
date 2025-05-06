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

const CpuCoolerTable = () => {
const [isChange, setIsChange] = useState(false); 
    // TODO CAMBIARE
const [component, setComponent] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 25;
const [showModal, setShowModal] = useState(false);
const [editMode, setEditMode] = useState(false);
//TODO CAMBIARE
const [formData, setFormData] = useState({ cpuCoolerId: null, name: "", type: "", tdp: "", price: "",manufacturer: {}, compatibleSockets:[] ,description:"" ,image:""});
const [manufacturersList, setManufacturersList] = useState([]);
const [socketList, setSocketList] = useState([]);


useEffect(() => {
    handleFetch()
}, [isChange]);

const handleFetch = async () => {
    const data = await GetAllComponentBackoffice("cpucooler")
    setComponent(data)
}

const handleFetchSupport = async ()=> {
    const manufacturers = await GetAllManufacturers("cooler");
    setManufacturersList(manufacturers)
    const sockets = await GetAllSockets();
    setSocketList(sockets);
}

const handleShowModal = (cooler = null) => {
    handleFetchSupport();
if (cooler) {
    setEditMode(true);
    setFormData({cpuCoolerId: cooler.cpuCoolerId , name: cooler.name , type: cooler.type , tdp: cooler.tdp , price: cooler.price ,manufacturer: cooler.manufacturer.id, compatibleSockets: cooler.compatibleSockets.map(s => s.id) ,description: cooler.description ,image: cooler.image});
} else {
    setEditMode(false);
    setFormData({ cpuCoolerId: null, name: "", type: "", tdp: "", price: "",manufacturer: {}, compatibleSockets:[] ,description:"" ,image:""});
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
        newformData.append("Type", formData.type == "0"? "Air" : "Liquid");
        newformData.append("Tdp", formData.tdp);
        newformData.append("Price", formData.price.toString());
        newformData.append("ManufacturerId", formData.manufacturer);
        formData.compatibleSockets.forEach((socketId) => {
            newformData.append("CompatibleSocketIds", socketId);
        });
        newformData.append("Description", formData.description);
        newformData.append("Image", formData.image);

if (editMode) {
    await EditComponent("CpuCooler", formData.cpuCoolerId , newformData);
} else {
    await AddNewComponent("CpuCooler", newformData)
}
setShowModal(false);
setIsChange(!isChange)
};

const handleDelete = async(id) => {
    await DeleteComponent("CpuCooler",id)
    setIsChange(!isChange)
};

const totalPages = Math.ceil(component.length / itemsPerPage);
const displayedCpus = component.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <h5 className="text-light mb-0">CpuCooler Management</h5>
    <Button size="sm" onClick={() => handleShowModal()}>+ Add CpuCooler</Button>
    </Card.Header>
    <Card.Body>
    <Table striped bordered hover variant="dark" responsive>
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Maker</th>
            <th>Type</th>
            <th>TDP</th>
            <th>Compatible Sockets</th>
            <th>Price</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {displayedCpus.map((item, index) => (
            <tr key={index}>
            <td><img src={`${normalizeImagePath(item.image)}`} width={25}/></td>
            <td>{item.name}</td>
            <td>{item.manufacturer.name}</td>
            <td>{item.type === 0? "Air": "Liquid" }</td>
            <td>{item.tdp}</td>
            <td>{item.compatibleSockets?.length > 0? item.compatibleSockets.map(i=>(<p key={i.name} className="m-0">- {i.name}</p>)) :"No Socket Compatible"}</td>
            <td>{item.price.toFixed(2)}</td>
            <td>
                <Button size="sm" variant="outline-light" className="me-2" onClick={() => handleShowModal(item)}>
                Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(item.cpuCoolerId)}>
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
        <Modal.Title>{editMode ? "Edit CpuCooler" : "Add CpuCooler"}</Modal.Title>
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
            <Col >
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
            <Col >
            <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Select  
                value={ formData.type }
                name="type" onChange={handleChange} required >
                <option value="">Choose...</option>
                <option value="0">Air</option>
                <option value="1">Liquid</option>
                </Form.Select>
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
        </Row>

        <Row className="mb-3">
        <Col xs={6} className="mb-3">
            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control name="price" value={formData.price} onChange={handleChange} step={0.01} type="number" required/>
            </Form.Group>
        </Col>
        <Col xs={6}>
        <Form.Group>
                    <Form.Label>Compatible Sockets</Form.Label>
                    <Form.Select
                        multiple
                        name="compatibleSockets"
                        value={formData.compatibleSockets}
                        onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, (opt) => parseInt(opt.value));
                        setFormData({ ...formData, compatibleSockets: selected });
                        }}
                    >
                        {socketList.map((socket) => (
                        <option key={socket.id} value={socket.id}>
                            {socket.name}
                        </option>
                        ))}
                    </Form.Select>
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
        <Button variant="primary" onClick={handleSubmit} >{editMode ? "Save Changes" : "Add CpuCooler"}</Button>
    </Modal.Footer>
    </Modal>
</Card>
);
};

export default CpuCoolerTable;

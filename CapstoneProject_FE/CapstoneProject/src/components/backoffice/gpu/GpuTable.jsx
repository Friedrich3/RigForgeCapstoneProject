// GpuTable.jsx
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
import { AddNewComponent, DeleteComponent, EditComponent, GetAllComponentBackoffice, GetAllManufacturers } from "../../../redux/actions/BackofficeApi";
import { normalizeImagePath } from "../../../redux/actions/ProductsApi";

const GpuTable = () => {
    const [isChange, setIsChange] = useState(false);

const [gpus, setGpus] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 25;
const [showModal, setShowModal] = useState(false);
const [editMode, setEditMode] = useState(false);
//TODO CAMBIARE
const [formData, setFormData] = useState({ gpuId: null, name: "", price: "", chipset: "", vram: "", tdp: "", pcieVersion: "", releaseYear: "", description: "", image: "", manufacturer: {} });
const [manufacturersList, setManufacturersList] = useState([]);


useEffect(() => {
    handleFetch()
}, [isChange]);


const handleFetch = async () => {
    const data = await GetAllComponentBackoffice("gpu")
    setGpus(data)
}

const handleFetchSupport = async ()=> {
    const manufacturers = await GetAllManufacturers("gpu");
    setManufacturersList(manufacturers)
}

const handleShowModal = (gpu = null) => {
    handleFetchSupport();
if (gpu) {
    setEditMode(true);
    setFormData({ gpuId: gpu.gpuId , name: gpu.name , price: gpu.price , chipset: gpu.chipset , vram: gpu.vram , tdp: gpu.tdp, pcieVersion: gpu.pcieVersion, releaseYear: gpu.releaseYear, description: gpu.description, image: gpu.image, manufacturer: gpu.manufacturer.id });
} else {
    setEditMode(false);
    //CAMBIARE
    setFormData({ gpuId: null, name: "", price: "", chipset: "", vram: "", tdp: "", pcieVersion: "", releaseYear: "", description: "", image: "", manufacturer: {} });
}
setShowModal(true);
};

const handleCloseModal = () => setShowModal(false);

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async(e) => {
    e.preventDefault()
const newformData = new FormData()
        newformData.append("Name", formData.name);
        newformData.append("ManufacturerId", formData.manufacturer);
        newformData.append("Chipset", formData.chipset);
        newformData.append("Vram", formData.vram);
        newformData.append("PcieVersion", formData.pcieVersion);
        newformData.append("Tdp", formData.tdp);
        newformData.append("ReleaseYear", formData.releaseYear);
        newformData.append("Price", formData.price.toString());
        newformData.append("Description", formData.description);
        newformData.append("Image", formData.image);

if (editMode) {
    await EditComponent("Gpu", formData.gpuId , newformData);
} else {
    await AddNewComponent("Gpu", newformData)
}
setShowModal(false);
setIsChange(!isChange)
};

const handleDelete = async(id) => {
    await DeleteComponent("Gpu",id)
    setIsChange(!isChange)
};

const totalPages = Math.ceil(gpus.length / itemsPerPage);
const displayedGpus = gpus.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <h5 className="text-light mb-0">GPU Management</h5>
    <Button size="sm" onClick={() => handleShowModal()}>+ Add GPU</Button>
    </Card.Header>
    <Card.Body>
    <Table striped bordered hover variant="dark" responsive>
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Maker</th>
            <th>Chipset</th>
            <th>VRam</th>
            <th>Pcie</th>
            <th>TDP</th>
            <th>Price</th>
            <th>Year of Release</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {displayedGpus.map((item, index) => (
            <tr key={index}>
            <td><img src={`${normalizeImagePath(item.image)}`} width={25}/></td>
            <td>{item.name}</td>
            <td>{item.manufacturer.name}</td>
            <td>{item.chipset}</td>
            <td>{item.vram} Gb</td>
            <td>{item.pcieVersion}</td>
            <td>{item.tdp}</td>
            <td>{item.price.toFixed(2)}</td>
            <td>{item.releaseYear}</td>
            <td>
                <Button size="sm" variant="outline-light" className="me-2" onClick={() => handleShowModal(item)}>
                Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(item.gpuId)}>
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
        <Modal.Title>{editMode ? "Edit GPU" : "Add GPU"}</Modal.Title>
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
                <Form.Label>Chipset</Form.Label>
                <Form.Control name="chipset" value={formData.chipset} onChange={handleChange} required/>
            </Form.Group>
            </Col> 
        </Row>
        <Row className="mb-3">
            <Col>
            <Form.Group>
                <Form.Label>Vram (GB)</Form.Label>
                <Form.Control name="vram" value={formData.vram} onChange={handleChange} step="1" type="number" required/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Pcie Version</Form.Label>
                <Form.Select name="pcieVersion" value={formData.pcieVersion} onChange={handleChange} required >
                <option value="">Choose...</option>
                <option value="1.0">1.0 Version</option>
                <option value="2.0">2.0 Version</option>
                <option value="3.0">3.0 Version</option>
                <option value="4.0">4.0 Version</option>
                <option value="5.0">5.0 Version</option>
                </Form.Select >
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
        <Button variant="primary" onClick={handleSubmit} >{editMode ? "Save Changes" : "Add GPU"}</Button>
    </Modal.Footer>
    </Modal>
</Card>
);
};

export default GpuTable;

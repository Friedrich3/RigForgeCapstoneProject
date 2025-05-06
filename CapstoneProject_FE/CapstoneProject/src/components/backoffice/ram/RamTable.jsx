// RamTable.jsx
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
import { AddNewComponent, DeleteComponent, EditComponent, GetAllComponentBackoffice, GetAllManufacturers, GetAllRamType } from "../../../redux/actions/BackofficeApi";
import { normalizeImagePath } from "../../../redux/actions/ProductsApi";

const RamTable = () => {
    const [isChange, setIsChange] = useState(false);

const [component, setComponent] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 25;
const [showModal, setShowModal] = useState(false);
const [editMode, setEditMode] = useState(false);
const [formData, setFormData] = useState({ ramId: null, name: "", price: "", capacity: "", modules: "", speed: "", releaseYear: "", description: "", image: "", manufacturer: "", ramType: "" });
const [manufacturersList, setManufacturersList] = useState([]);
const [ramTypeList, setRamTypeList] = useState([]);


useEffect(() => {
    handleFetch()
}, [isChange]);

const handleFetch = async () => {
    const data = await GetAllComponentBackoffice("ram")
    setComponent(data)
}
const handleFetchSupport = async ()=> {
    const manufacturers = await GetAllManufacturers("ram");
    setManufacturersList(manufacturers)
    const ramtypes = await GetAllRamType();
    setRamTypeList(ramtypes);

}


const handleShowModal = (ram = null) => {
    handleFetchSupport();
if (ram) {
    setEditMode(true);
    setFormData({ ramId: ram.ramId , name: ram.name , price: ram.price , capacity: ram.capacity , modules: ram.modules , speed: ram.speed , releaseYear: ram.releaseYear , description: ram.description , image: ram.image , manufacturer: ram.manufacturer.id, ramType: ram.ramType.id });
} else {
    setEditMode(false);
    //CAMBIARE
    setFormData({ ramId: null, name: "", price: "", capacity: "", modules: "", speed: "", releaseYear: "", description: "", image: "", manufacturer: "", ramType: "" });
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
    newformData.append("RamTypeId", formData.ramType);
    newformData.append("Capacity", formData.capacity);
    newformData.append("Modules", formData.modules);
    newformData.append("Speed", formData.speed);
    newformData.append("ReleaseYear", formData.releaseYear);
    newformData.append("Price", formData.price.toString());
    newformData.append("Description", formData.description);
    newformData.append("Image", formData.image);
if (editMode) {
    await EditComponent("Ram", formData.ramId , newformData);
} else {
    await AddNewComponent("Ram", newformData)
}
setShowModal(false);
setIsChange(!isChange)
};

const handleDelete = async(id) => {
    await DeleteComponent("Ram",id)
    setIsChange(!isChange)
};

const totalPages = Math.ceil(component.length / itemsPerPage);
const displayedRams = component.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <h5 className="text-light mb-0">RAM Management</h5>
    <Button size="sm" onClick={() => handleShowModal()}>+ Add RAM</Button>
    </Card.Header>
    <Card.Body>
    <Table striped bordered hover variant="dark" responsive>
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Maker</th>
            <th>Ram Type</th>
            <th>Ram Speed</th>
            <th>Modules</th>
            <th>Capacity</th>
            <th>Year of Release</th>
            <th>Price</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {displayedRams.map((item, index) => (
            <tr key={index}>
            <td><img src={`${normalizeImagePath(item.image)}`} width={25}/></td>
            <td>{item.name}</td>
            <td>{item.manufacturer.name}</td>
            <td>{item.ramType.name}</td>
            <td>{item.speed} Mhz</td>
            <td>{item.modules}</td>
            <td>{item.capacity / item.modules} Gb</td>
            <td>{item.releaseYear}</td>
            <td>{item.price.toFixed(2)}</td>
            <td>
                <Button size="sm" variant="outline-light" className="me-2" onClick={() => handleShowModal(item)}>
                Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(item.ramId)}>
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
        <Modal.Title>{editMode ? "Edit RAM" : "Add RAM"}</Modal.Title>
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
                <Form.Label>Memory Type</Form.Label>
                <Form.Select
                value={formData.ramType} 
                name="ramType" onChange={handleChange} required> 
                <option value="">Choose...</option>
                {ramTypeList.length >0 && ramTypeList.map((item,index) => (
                    <option value={item.id} key={index}>{item.name}</option>
                ))}
                </Form.Select>
            </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col>
            <Form.Group>
                <Form.Label>Ram Speed (Mhz)</Form.Label>
                <Form.Control name="speed" value={formData.speed} onChange={handleChange} step="100" type="number" required/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Modules</Form.Label>
                <Form.Control name="modules" value={formData.modules} onChange={handleChange} step="1" type="number" required/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Capacity (GB)</Form.Label>
                <Form.Control name="capacity" value={formData.capacity} onChange={handleChange} step="1" type="number" required/>
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
        <Button variant="primary" onClick={handleSubmit} >{editMode ? "Save Changes" : "Add RAM"}</Button>
    </Modal.Footer>
    </Modal>
</Card>
);
};

export default RamTable;

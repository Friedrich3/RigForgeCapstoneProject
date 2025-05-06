// StorageTable.jsx
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
import { AddNewComponent, DeleteComponent, EditComponent, GetAllComponentBackoffice, GetAllManufacturers, GetAllStorageType } from "../../../redux/actions/BackofficeApi";
import { normalizeImagePath } from "../../../redux/actions/ProductsApi";

const StorageTable = () => {
    const [isChange, setIsChange] = useState(false);
const [storages, setStorages] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 25;
const [showModal, setShowModal] = useState(false);
const [editMode, setEditMode] = useState(false);

const [formData, setFormData] = useState({ storageId: null, name: "", price: "", capacity: "", interface: "", formFactor: "", nvmeSupport: "", releaseYear: "", description: "", image: "", manufacturer: "", storageType: "" });
const [manufacturersList, setManufacturersList] = useState([]);
const [storageTypeList, setStorageTypeList] = useState([]);



useEffect(() => {
    handleFetch()
}, [isChange]);

const handleFetch = async () => {
    const data = await GetAllComponentBackoffice("storage")
    setStorages(data)
}

const handleFetchSupport = async ()=> {
    const manufacturers = await GetAllManufacturers("storage");
    setManufacturersList(manufacturers)
    const storages = await GetAllStorageType();
    setStorageTypeList(storages)
}

const handleShowModal = (storage = null) => {
    handleFetchSupport()
if (storage) {
    setEditMode(true);
    setFormData({ storageId: storage.storageId , name: storage.name , price: storage.price , capacity: storage.capacity , interface: storage.interface , formFactor: storage.formFactor , nvmeSupport: storage.nvmeSupport , releaseYear: storage.releaseYear , description: storage.description , image: storage.image , manufacturer: storage.manufacturer.id , storageType: storage.storageType.id });
} else {
    setEditMode(false);
    setFormData({ storageId: null, name: "", price: "", capacity: "", interface: "", formFactor: "", nvmeSupport: "", releaseYear: "", description: "", image: "", manufacturer: "", storageType: "" });
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
        newformData.append("StorageTypeId", formData.storageType);
        newformData.append("Capacity", formData.capacity);
        newformData.append("Interface", formData.interface);
        newformData.append("FormFactor", formData.formFactor);
        newformData.append("NvmeSupport", formData.nvmeSupport);
        newformData.append("ReleaseYear", formData.releaseYear);
        newformData.append("Price", formData.price.toString());
        newformData.append("Description", formData.description);
        newformData.append("Image", formData.image);

if (editMode) {
    await EditComponent("Storage", formData.storageId , newformData);
} else {
    await AddNewComponent("Storage", newformData)
}
setShowModal(false);
setIsChange(!isChange)
};

const handleDelete = async(id) => {
    await DeleteComponent("Storage",id)
    setIsChange(!isChange)
};

const totalPages = Math.ceil(storages.length / itemsPerPage);
const displayedStoragess = storages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <h5 className="text-light mb-0">Storage Management</h5>
    <Button size="sm" onClick={() => handleShowModal()}>+ Add Storage</Button>
    </Card.Header>
    <Card.Body>
    <Table striped bordered hover variant="dark" responsive>
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Maker</th>
            <th>Storage Type</th>
            <th>Capacity</th>
            <th>FormFactor</th>
            <th>Interface</th>
            <th>Price</th>
            <th>Nvme Support</th>
            <th>Year of Release</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {displayedStoragess.map((item, index) => (
            <tr key={index}>
            <td><img src={`${normalizeImagePath(item.image)}`} width={25}/></td>
            <td>{item.name}</td>
            <td>{item.manufacturer.name}</td>
            <td>{item.storageType.name}</td>
            <td>{item.capacity >= 1000 ? `${item.capacity/1000} TB`:`${item.capacity} GB`}</td>
            <td>{item.formFactor}</td>
            <td>{item.interface}</td>
            <td>{item.price.toFixed(2)}</td>
            <td>{item.nvmeSupport? "Yes" : "No"}</td>
            <td>{item.releaseYear}</td>
            <td>
                <Button size="sm" variant="outline-light" className="me-2" onClick={() => handleShowModal(item)}>
                Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(item.storageId)}>
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
        <Modal.Title>{editMode ? "Edit Storage" : "Add Storage"}</Modal.Title>
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
                <Form.Label>Storage Type</Form.Label>
                <Form.Select  
                value={ formData.storageType }
                name="storageType" onChange={handleChange} required >
                <option value="">Choose...</option>
                {storageTypeList.length >0 && storageTypeList.map((item,index) => (
                    <option value={item.id} key={index}>{item.name}</option>
                ))}
                </Form.Select>
            </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col>
            <Form.Group>
                <Form.Label>Capacity (GB)</Form.Label>
                <Form.Control name="capacity" value={formData.capacity} onChange={handleChange} step="50" type="number" required/>
            </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
        <Col>
            <Form.Group>
                <Form.Label>Interface</Form.Label>
                <Form.Control name="interface" value={formData.interface} onChange={handleChange} required/>
            </Form.Group>
            </Col>
        <Col>
            <Form.Group>
                <Form.Label>Form Factor</Form.Label>
                <Form.Control name="formFactor" value={formData.formFactor} onChange={handleChange} required/>
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
                        label="NVMe Support"
                        checked={formData.nvmeSupport}
                        onChange={(e) =>
                            setFormData({ ...formData, nvmeSupport: e.target.checked })
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
        <Button variant="primary" onClick={handleSubmit} >{editMode ? "Save Changes" : "Add Storage"}</Button>
    </Modal.Footer>
    </Modal>
</Card>
);
};

export default StorageTable;

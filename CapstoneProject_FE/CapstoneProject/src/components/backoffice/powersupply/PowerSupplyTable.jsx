// PowerSupplyTable.jsx
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

const EfficiecyList = [
    "80 +",
    "80 + Bronze",
    "80 + Silver",
    "80 + Gold",
    "80 + Platinum",
    "80 + Titanium",
];

const PowerSupplyTable = () => {
    const [isChange, setIsChange] = useState(false);

const [powersupplys, setPowersupplys] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 25;
const [showModal, setShowModal] = useState(false);
const [editMode, setEditMode] = useState(false);
//TODO CAMBIARE
const [formData, setFormData] = useState({ powerSupplyId: "", name: "", price: "", wattage: "", efficiencyRating: "",modular: "", releaseYear: "", description: "", image: "", manufacturer: {} });
const [manufacturersList, setManufacturersList] = useState([]);

useEffect(() => {
    handleFetch()
}, [isChange]);

const handleFetch = async () => {
    const data = await GetAllComponentBackoffice("powersupply")
    setPowersupplys(data)
}

const handleFetchSupport = async ()=> {
    const manufacturers = await GetAllManufacturers("powersupply");
    setManufacturersList(manufacturers)

}

const handleShowModal = (storage = null) => {
    handleFetchSupport();
if (storage) {
    setEditMode(true);
    setFormData({ powerSupplyId: storage.powerSupplyId , name: storage.name , price: storage.price , wattage: storage.wattage , efficiencyRating: storage.efficiencyRating ,modular: storage.modular , releaseYear: storage.releaseYear , description: storage.description , image: storage.image , manufacturer: storage.manufacturer.id });
} else {
    setEditMode(false);
    //CAMBIARE
    setFormData({ powerSupplyId: "" , name: "", price: "", wattage: "", efficiencyRating: "",modular: "", releaseYear: "", description: "", image: "", manufacturer: {} });
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
        newformData.append("Wattage", formData.wattage);
        newformData.append("EfficiencyRating", formData.efficiencyRating);
        newformData.append("Modular", formData.modular);
        newformData.append("ReleaseYear", formData.releaseYear);
        newformData.append("Price", formData.price.toString());
        newformData.append("Description", formData.description);
        newformData.append("Image", formData.image);

if (editMode) {
    await EditComponent("Powersupply", formData.powerSupplyId , newformData);
} else {
    await AddNewComponent("Powersupply", newformData)
}
setShowModal(false);
setIsChange(!isChange)
};

const handleDelete = async(id) => {
    await DeleteComponent("Powersupply",id)
    setIsChange(!isChange)
};

const totalPages = Math.ceil(powersupplys.length / itemsPerPage);
const displayedPowersupplys = powersupplys.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <h5 className="text-light mb-0">PowerSupply Management</h5>
    <Button size="sm" onClick={() => handleShowModal()}>+ Add PowerSupply</Button>
    </Card.Header>
    <Card.Body>
    <Table striped bordered hover variant="dark" responsive>
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Maker</th>
            <th>Wattage</th>
            <th>Efficiency Rating</th>
            <th>Modular</th>
            <th>Year of Release</th>
            <th>Price</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {displayedPowersupplys.map((item, index) => (
            <tr key={index}>
            <td><img src={`${normalizeImagePath(item.image)}`} width={25}/></td>
            <td>{item.name}</td>
            <td>{item.manufacturer.name}</td>
            <td>{item.wattage} W</td>
            <td>{item.efficiencyRating}</td>
            <td>{item.modular? "Yes" : "No"}</td>
            <td>{item.releaseYear}</td>
            <td>{item.price.toFixed(2)}</td>
            <td>
                <Button size="sm" variant="outline-light" className="me-2" onClick={() => handleShowModal(item)}>
                Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(item.powerSupplyId)}>
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
        <Modal.Title>{editMode ? "Edit PowerSupply" : "Add PowerSupply"}</Modal.Title>
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
        </Row>
        <Row className="mb-3">
            <Col>
            <Form.Group>
                <Form.Label>Wattage (W)</Form.Label>
                <Form.Control name="wattage" value={formData.wattage} onChange={handleChange} step="50" type="number" required/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Efficiecy Rating</Form.Label>
                <Form.Select  
                value={ formData.efficiencyRating }
                name="efficiencyRating" onChange={handleChange} required >
                <option value="">Choose...</option>
                {EfficiecyList.length >0 && EfficiecyList.map((item,index) => (
                    <option value={item} key={index}>{item}</option>
                ))}
                </Form.Select>
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
                        label="Modular"
                        checked={formData.modular}
                        onChange={(e) =>
                            setFormData({ ...formData, modular: e.target.checked })
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
        <Button variant="primary" onClick={handleSubmit} >{editMode ? "Save Changes" : "Add PowerSupply"}</Button>
    </Modal.Footer>
    </Modal>
</Card>
);
};

export default PowerSupplyTable;

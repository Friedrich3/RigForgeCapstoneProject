// CaseTable.jsx
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
import { AddNewComponent, DeleteComponent, EditComponent, GetAllComponentBackoffice, GetAllFormFactor, GetAllManufacturers } from "../../../redux/actions/BackofficeApi";
import { normalizeImagePath } from "../../../redux/actions/ProductsApi";

const colors = [
    "Black",
    "White",
    "Gray",
    "Silver",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Purple",
    "Pink",
    "Beige",
    "Gold",
    "Bronze",
    "Gunmetal",
    "Transparent",
    "RGB" // Per case con illuminazione RGB
];

const CaseTable = () => {
    const [isChange, setIsChange] = useState(false);

const [cases, setCases] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 25;
const [showModal, setShowModal] = useState(false);
const [editMode, setEditMode] = useState(false);
//TODO CAMBIARE
const [formData, setFormData] = useState({ caseId: "", name: "", price: "", color: "", fanSupportCount: "",hasGlassPanel: "", releaseYear: "", description: "", image: "", manufacturer: "", formFactor: "" });
const [manufacturersList, setManufacturersList] = useState([]);
const [formFactorList, setFormFactorList] = useState([]);


useEffect(() => {
    handleFetch()
}, [isChange]);

const handleFetch = async () => {
    const data = await GetAllComponentBackoffice("Case")
    setCases(data)
}
const handleFetchSupport = async ()=> {
    const manufacturers = await GetAllManufacturers("case");
    setManufacturersList(manufacturers)
    const formfactors = await GetAllFormFactor();
    setFormFactorList(formfactors);
}



const handleShowModal = (cases = null) => {
    handleFetchSupport()
if (cases) {
    setEditMode(true);
    setFormData({ caseId: cases.caseId , name: cases.name , price: cases.price , color: cases.color , fanSupportCount: cases.fanSupportCount ,hasGlassPanel: cases.hasGlassPanel , releaseYear: cases.releaseYear , description: cases.description , image: cases.image , manufacturer: cases.manufacturer.id , formFactor: cases.formFactor.id});
} else {
    setEditMode(false);
    setFormData({ caseId: "", name: "", price: "", color: "", fanSupportCount: "",hasGlassPanel: "", releaseYear: "", description: "", image: "", manufacturer: "", formFactor: "" });
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
        newformData.append("FormFactorId", formData.formFactor);
        newformData.append("Color", formData.color);
        newformData.append("FanSupportCount", formData.fanSupportCount);
        newformData.append("HasGlassPanel", formData.hasGlassPanel);
        newformData.append("ReleaseYear", formData.releaseYear);
        newformData.append("Price", formData.price.toString());
        newformData.append("Description", formData.description);
        newformData.append("Image", formData.image);

if (editMode) {
    await EditComponent("Case", formData.caseId , newformData);
} else {
    await AddNewComponent("Case", newformData)
}
setShowModal(false);
setIsChange(!isChange)
};

const handleDelete = async(id) => {
    await DeleteComponent("Case",id)
    setIsChange(!isChange)
};

const totalPages = Math.ceil(cases.length / itemsPerPage);
const displayedCases = cases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <h5 className="text-light mb-0">Case Management</h5>
    <Button size="sm" onClick={() => handleShowModal()}>+ Add Case</Button>
    </Card.Header>
    <Card.Body>
    <Table striped bordered hover variant="dark" responsive>
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Maker</th>
            <th>formFactor</th>
            <th>Color</th>
            <th>fanSupportCount</th>
            <th>hasGlassPanel</th>
            <th>Year of Release</th>
            <th>Price</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {displayedCases.map((item, index) => (
            <tr key={index}>
            <td><img src={`${normalizeImagePath(item.image)}`} width={25}/></td>
            <td>{item.name}</td>
            <td>{item.manufacturer.name}</td>
            <td>{item.formFactor.name}</td>
            <td>{item.color}</td>
            <td>{item.fanSupportCount}</td>
            <td>{item.hasGlassPanel? "Yes" : "No"}</td>
            <td>{item.releaseYear}</td>
            <td>{item.price.toFixed(2)}</td>
            <td>
                <Button size="sm" variant="outline-light" className="me-2" onClick={() => handleShowModal(item)}>
                Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(item.caseId)}>
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
        <Modal.Title>{editMode ? "Edit Case" : "Add Case"}</Modal.Title>
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
                <Form.Label>Color</Form.Label>
                <Form.Select  
                value={ formData.color }
                name="color" onChange={handleChange} required >
                <option value="">Choose...</option>
                {colors.length >0 && colors.map((item,index) => (
                    <option value={item} key={index}>{item}</option>
                ))}
                </Form.Select>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Max Fan Slots</Form.Label>
                <Form.Control name="fanSupportCount" value={formData.fanSupportCount} onChange={handleChange} step="1" type="number" required/>
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
                        label="Has Glass Panel"
                        checked={formData.hasGlassPanel}
                        onChange={(e) =>
                            setFormData({ ...formData, hasGlassPanel: e.target.checked })
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
        <Button variant="primary" onClick={handleSubmit} >{editMode ? "Save Changes" : "Add Case"}</Button>
    </Modal.Footer>
    </Modal>
</Card>
);
};

export default CaseTable;

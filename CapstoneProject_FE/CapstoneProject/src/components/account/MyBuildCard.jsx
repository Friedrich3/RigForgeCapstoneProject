import { Link } from "react-router-dom";
import { DeleteBuild, RenameBuild, SetActiveBuild } from "../../redux/actions/BuildApi";
import { Badge, Button, Card, Dropdown, Form } from "react-bootstrap";
import { Check, Check2All, Check2Square, CheckCircle, PencilSquare, Share, ShareFill, ThreeDotsVertical, Trash } from "react-bootstrap-icons";
import { useState } from "react";

import Modal from 'react-bootstrap/Modal';
import { RemoveOwnShare, ShareNewBuild } from "../../redux/actions/ShareBuildApi";

const categories = [
{ id: "cpu", icon: "cpu-dark.png" },
{ id: "cpucooler", icon: "cpu-cooler-dark.png" },
{ id: "motherboard", icon: "motherboard-dark.png" },
{ id: "ram", icon: "ram-dark.png" },
{ id: "gpu", icon: "gpu-dark.png" },
{ id: "storage", icon: "storage-dark.png" },
{ id: "powersupply", icon: "power-supply-dark.png" },
{ id: "case", icon: "case-dark.png" },
];

const MyBuildCard = ({ build, setIsChange, isChange }) => {
    const [show, setShow] = useState(false);
    const [buildName, setBuildName] = useState(build.name)

    const [showShare, setShowShare] = useState(false);

    const [shareDescription, setShareDescription] = useState("")
    const [shareImage, setShareImage]= useState();



const handleClose = () => {setShow(false); setBuildName(build.name)}
const handleShow = () => setShow(true);

const handleCloseShare = () => {setShowShare(false)}
const handleShowShare = () => setShowShare(true)

const changeBuildName = async () => {
    await RenameBuild(build.buildId, buildName)
    setShow(false);
}

const shareBuild = async (e) =>{
    e.preventDefault()
    const newFormdata = new FormData()
        newFormdata.append("Description", shareDescription)
        newFormdata.append("Image", shareImage)

    const result = await ShareNewBuild(build.buildId , newFormdata)
    if(result){
        handleCloseShare()
        handleChange()
    }
}


const handleChange = async () =>{
    await setIsChange(!isChange);
}

const EditModal = () =>{
    
    return (
        <>
        <Modal show={show} onHide={handleClose} className="" data-bs-theme="dark">
            <Modal.Header closeButton className="">
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#121225" }} className="">
            <Form onSubmit={(e) => {e.preventDefault()}}>
                <Form.Group className="mb-3">
                <Form.Label className="">Build Name</Form.Label>
                <Form.Control
                    type="text"
                    className=""
                    autoFocus
                    onChange={(e)=>{setBuildName(e.target.value)}}
                />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#121225" }} className="">
            <Button variant="secondary" type="button" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" type="button" onClick={changeBuildName}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

const ShareModal = () => {

    return(
        <>
        <Modal show={showShare} onHide={handleCloseShare} className="" data-bs-theme="dark">
            <Modal.Header closeButton className="">
            <Modal.Title>{build.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#121225" }} className="">
            <Form onSubmit={(e) => {e.preventDefault()}}>
                <Form.Group className="mb-3">
                <Form.Label className="">Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Describe your build..."
                    className=""
                    value={shareDescription}
                    autoFocus
                    onChange={(e)=>{setShareDescription(e.target.value)}}
                />
                </Form.Group>
                <Form.Group controlId="formFile">
                    <Form.Label>Immagine</Form.Label>
                    <Form.Control type="file" onChange={(e) => {
                        setShareImage(e.target.files[0]);
                    }}/>
                    <small className="text-secondary">Optional: if left empty, the case image will be used automatically</small>
        </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#121225" }} className="">
            <Button variant="secondary" type="button" onClick={handleCloseShare}>
                Close
            </Button>
            <Button variant="primary" type="button" onClick={shareBuild}>
                Share Build
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}




return (
<>
<>{EditModal()}</>
<>{ShareModal()}</>
    <Card
    className="border-0 shadow-lg h-100"
    style={{ backgroundColor: "#121225" }}
    >
    <Card.Header className=" bg-dark position-relative">
        <div className="d-flex custom-position">
        {build.isActive &&<Badge pill bg="success" className="me-1">Active</Badge>}
        {build.isShared &&<Badge pill bg="warning" className="">Shared</Badge>}
        </div>
        <Card.Title className="text-light  mb-0 mt-1" >{buildName}
        <div className="position-absolute top-0 end-0 mt-2 me-2">
            <Dropdown align="end">
            <Dropdown.Toggle
                variant="link"
                className="text-light p-0 no-arrow"
                id={`build-${build.id}-actions`}
            >
                <ThreeDotsVertical size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark border-secondary">
                <Dropdown.Item className="text-light" onClick={()=>{handleShow()}}>
                    <PencilSquare size={16} className="me-2" /> EditName
                </Dropdown.Item>
                <Dropdown.Divider className="border-secondary" />

                {build.isActive ?
                <Dropdown.Item className="text-success" disabled><CheckCircle size={16} className="me-2" /> Active </Dropdown.Item>
                :
                <Dropdown.Item className="text-light" onClick={async () => {await SetActiveBuild(build.buildId); handleChange() }}><Check2Square size={16} className="me-2" />Set Active</Dropdown.Item>
                }
                

                <Dropdown.Divider className="border-secondary" />
                {build.isShared ?
                <Dropdown.Item className="text-danger" onClick={async () => {await RemoveOwnShare(build.buildId);  handleChange()}}><CheckCircle size={16} className="me-2" /> Stop Sharing </Dropdown.Item>
                :
                <Dropdown.Item className="text-light" onClick={()=> { handleShowShare()}}><Check2Square size={16} className="me-2" />Share this build</Dropdown.Item>
                }

                <Dropdown.Divider className="border-secondary" />
                <Dropdown.Item
                onClick={() => {
                    DeleteBuild(build.buildId);
                    handleChange();
                }}
                className="text-danger"
                >
                <Trash size={16} className="me-2" /> Delete
                </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </div>
        </Card.Title>
    </Card.Header>

    <Card.Body className="d-flex flex-column">
        <div className="card-text text-light opacity-75 small mb-1">
        <ul className=" list-unstyled">
            {categories.map((item) => (
            <li key={item.id} className="pb-1">
                {build[item.id] ? (
                <>
                    <img
                    src={`../src/assets/img/${item.icon}`}
                    width={25}
                    className="me-1"
                    />
                    <span>{build[item.id].name}</span>
                </>
                ) : (
                    <>
                    <img
                    src={`../src/assets/img/${item.icon}`}
                    width={25}
                    className="me-1"
                    />
                    <span>N/A</span>
                    </>
                )}
            </li>
            ))}
        </ul>
        </div>

        <div className="mt-auto">
        <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-light fw-bold">
            ${build.totalPrice.toFixed(2)}
            </span>
        </div>
        <div className="d-flex">
        {build.isShared?
        <Button
        variant="primary"
        size="sm"
        className="w-100 mx-2"
        as={Link}
        to={`/Builds/${build.buildId}`}
        >
        View Build
    </Button>
        :
        <>
        <Button
        variant="success"
        disabled= {build.isActive}
        size="sm"
        className="w-50 mx-2"
        onClick={() => {SetActiveBuild(build.buildId); handleChange() }}
        >
        Set Active
    </Button>
        <Button
            variant="outline-light"
            size="sm"
            className="w-50 mx-2 d-flex justify-content-center align-items-center" 
            onClick={()=> {handleShowShare()}}
            >Share&nbsp;
            <ShareFill/> 
        </Button>
        </>
        }
        </div>
        </div>
    </Card.Body>
    </Card>
</>
);
};

export default MyBuildCard;

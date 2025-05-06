import { useEffect, useState } from "react";
import { GetAllManufacturers } from "../../../redux/actions/BackofficeApi";
import { Card, Pagination, Table } from "react-bootstrap";




const ManufacturerTable = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25;

useEffect(() => {
    handleFetch()
}, []);   
const handleFetch = async () => {
    const data = await GetAllManufacturers()
    setManufacturers(data)
}  
    
const totalPages = Math.ceil(manufacturers.length / itemsPerPage);
const displayedGpus = manufacturers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <h5 className="text-light mb-0">Manufacturer Management</h5>
    </Card.Header>
    <Card.Body>
    <Table striped bordered hover variant="dark" responsive>
        <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {displayedGpus.map((item, index) => (
            <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            </tr>
        ))}
        </tbody>
    </Table>
    {renderPagination()}
    </Card.Body>
</Card>
    );
}

export default ManufacturerTable;
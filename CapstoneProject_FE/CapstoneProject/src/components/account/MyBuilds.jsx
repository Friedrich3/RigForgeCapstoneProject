"use client"

import { useEffect, useState } from "react"
import { Card, Row, Col, Button, Form, } from "react-bootstrap"
import { Link } from "react-router-dom"
import {
  Grid,
  List,
  SortDown,
  Search,
} from "react-bootstrap-icons"
import { GetBearerToken } from "../../redux/actions/AccountApi"
import MyBuildCard from "./MyBuildCard"

const MyBuilds = () => {
  const [viewMode, setViewMode] = useState("grid")
  const [sortOption, setSortOption] = useState("recent")
  const [searchTerm, setSearchTerm] = useState("")
  const [isChange, setIsChange] = useState(true);

  const [userBuilds, setUserBuilds] = useState([])

  useEffect(()=>{
    fetchAllBuilds() 
  },[isChange])

  const fetchAllBuilds = async () => {
    const url = "https://localhost:7099/api/Build/getall";
    try {
      const response = await fetch(url,{
        method :"GET",
        headers:{
            "Authorization": "Bearer " + GetBearerToken()
        }
      })
      if(!response.ok){ throw new Error("Error While Fetching All Builds")}
      const data = await response.json()
      setUserBuilds(data.data)
    } catch (error) {
      console.log("Error", error)
    } 
  }

  // Filtra le build in base al termine di ricerca
  const filteredBuilds = userBuilds.filter(
    (build) =>
      build.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Ordina le build in base all'opzione selezionata
  const sortedBuilds = [...filteredBuilds].sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.name.localeCompare(b.name)
      case "price-low":
        return a.totalPrice - b.totalPrice
      case "price-high":
        return b.totalPrice - a.totalPrice
      case "recent":
      default:
        return new Date(b.updatedAt) - new Date(a.updatedAt)
    }
  })

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }
  
  return (
    <>
      <Card className="border-0 shadow-sm mb-4" style={{ backgroundColor: "#121225" }}>
        <Card.Header className="bg-dark border-0 d-flex justify-content-between align-items-center">
          <h5 className="text-light mb-0">My Builds</h5>
          <Button variant="primary" size="sm" as={Link} to="/builder">
            Create New Build
          </Button>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="mb-4">
            <Col md={6} className="mb-3 mb-md-0">
              <div className="position-relative">
                <Form.Control
                  type="search"
                  placeholder="Search builds..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="bg-dark text-light border-secondary ps-4"
                />
                <Search className="position-absolute top-50 start-0 translate-middle-y ms-2 text-light" />
              </div>
            </Col>
            <Col md={6} className="d-flex justify-content-md-end">
              <div className="d-flex align-items-center me-3">
                <Button
                  variant={viewMode === "grid" ? "primary" : "outline-light"}
                  size="sm"
                  className="me-2"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid size={16} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "primary" : "outline-light"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List size={16} />
                </Button>
              </div>
              <div className="d-flex align-items-center">
                <SortDown size={18} className="text-light me-2" />
                <Form.Select
                  size="sm"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="bg-dark text-light border-secondary"
                  style={{ width: "auto" }}
                >
                  <option value="recent">Most Recent</option>
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </Form.Select>
              </div>
            </Col>
          </Row>

          {filteredBuilds.length === 0 ? (
            <div className="text-center py-5">
              <h5 className="text-light mb-3">No builds found</h5>
              <p className="text-light opacity-75 mb-4">
                {searchTerm
                  ? "No builds match your search criteria."
                  : "You haven't created any builds yet. Start building your dream PC now!"}
              </p>
              <Button variant="primary" as={Link} to="/builder">
                Create Your First Build
              </Button>
            </div>
          ) : (
            <Row className={viewMode === "list" ? "" : "g-4"}>
              {sortedBuilds.map((build , index) => (
                <Col key={index} xs={12} md={viewMode === "list" ? 12 : 6} lg={viewMode === "list" ? 12 : 4}>
                  <MyBuildCard build={build} setIsChange={setIsChange} isChange={isChange}/>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </>
  )
}

export default MyBuilds

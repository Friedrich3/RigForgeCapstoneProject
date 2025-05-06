"use client"

import { Card, Button, Badge } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addComponent } from "../../redux/slices/pcBuilderSlice"
import StarRating from "../common/StarRating"
import { PlusCircle } from "react-bootstrap-icons"

const ProductCard = ({ product, viewMode = "grid", onClick }) => {
  const dispatch = useDispatch()

  const handleAddToBuild = (e) => {
    e.stopPropagation() // Prevent triggering the card click
    dispatch(addComponent({ category: product.category, component: product }))
  }

  if (viewMode === "list") {
    return (
      <Card
        className="border-0 shadow-sm h-100 product-card"
        style={{ backgroundColor: "#121225", cursor: "pointer" }}
        onClick={onClick}
      >
        <div className="d-flex">
          <div style={{ width: "150px", minWidth: "150px" }} className="p-3">
            <img
              src={product.image || `/placeholder.svg?height=150&width=150`}
              alt={product.name}
              className="img-fluid"
            />
          </div>

          <Card.Body className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h5 className="text-light mb-1">{product.name}</h5>
                <div className="d-flex align-items-center mb-2">
                  <StarRating rating={product.rating} showValue size="sm" />
                  <span className="text-muted ms-2">({product.reviews?.length || 0} reviews)</span>
                </div>
              </div>

              {product.stock === 0 ? (
                <Badge bg="danger">Out of Stock</Badge>
              ) : product.stock < 5 ? (
                <Badge bg="warning" text="dark">
                  Low Stock
                </Badge>
              ) : (
                <Badge bg="success">In Stock</Badge>
              )}
            </div>

            <p className="text-muted small mb-3">{product.specs}</p>

            <div className="mt-auto d-flex justify-content-between align-items-center">
              <h5 className="text-light mb-0">${product.price?.toFixed(2)}</h5>

              <div>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="me-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(`/products/compare?id=${product.id}`, "_blank")
                  }}
                >
                  Compare
                </Button>

                <Button variant="primary" size="sm" onClick={handleAddToBuild} disabled={product.stock === 0}>
                  <PlusCircle size={16} className="me-1" /> Add to Build
                </Button>
              </div>
            </div>
          </Card.Body>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className="border-0 shadow-sm h-100 product-card"
      style={{ backgroundColor: "#121225", cursor: "pointer" }}
      onClick={onClick}
    >
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={product.image || `/placeholder.svg?height=200&width=200`}
          alt={product.name}
          className="p-3"
        />

        {product.stock === 0 ? (
          <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
            Out of Stock
          </Badge>
        ) : product.stock < 5 ? (
          <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">
            Low Stock
          </Badge>
        ) : null}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-light mb-1" style={{ fontSize: "1rem" }}>
          {product.name}
        </Card.Title>

        <div className="d-flex align-items-center mb-2">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-muted ms-2 small">({product.reviews?.length || 0})</span>
        </div>

        <p
          className="text-muted small mb-3"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.specs}
        </p>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <h5 className="text-light mb-0">${product.price?.toFixed(2)}</h5>

          <Button variant="primary" size="sm" onClick={handleAddToBuild} disabled={product.stock === 0}>
            <PlusCircle size={16} className="me-1" /> Add
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard

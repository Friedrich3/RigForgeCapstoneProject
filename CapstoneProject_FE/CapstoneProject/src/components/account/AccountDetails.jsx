"use client"

import { useState } from "react"
import { Card, Row, Col, Form, Button, Alert } from "react-bootstrap"
import { Pencil, Check } from "react-bootstrap-icons"

const AccountDetails = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.username,
    email: userData.email,
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Qui andrebbe la logica per salvare i dati
    //  TODO LOGICA SAVE DATI

    setIsEditing(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <>
      <Card className="border-0 shadow-sm mb-4" style={{ backgroundColor: "#121225" }}>
        <Card.Header className="bg-dark border-0 d-flex justify-content-between align-items-center">
          <h5 className="text-light mb-0">Account Details</h5>
          {/* TODO : IMPLEMENTARE MODIFICA PROFILO UTENTE */}
          {/* <Button
            variant={isEditing ? "success" : "outline-light"}
            size="sm"
            onClick={() => (isEditing ? handleSubmit() : setIsEditing(true))}
          >
            {isEditing ? (
              <>
                <Check size={16} className="me-1" /> Save Changes
              </>
            ) : (
              <>
                <Pencil size={16} className="me-1" /> Edit Profile
              </>
            )}
          </Button> */}
        </Card.Header>
        <Card.Body className="p-4">
          {showSuccess && <Alert variant="success">Your profile has been updated successfully!</Alert>}

          <Form onSubmit={handleSubmit}>

            <Row className=" justify-content-center">
              <Col md={12} className="mb-3">
                <Form.Group controlId="name" className="d-flex justify-content-around">
                  <Form.Label className="text-light w-25 text-center">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="bg-dark text-light border-secondary w-50"
                    />
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group controlId="email" className="d-flex justify-content-around">
                  <Form.Label className="text-light w-25 text-center">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={true}
                    className="bg-dark text-light border-secondary w-50"
                    />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default AccountDetails

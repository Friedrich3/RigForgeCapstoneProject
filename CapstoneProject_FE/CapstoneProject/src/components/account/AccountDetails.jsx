"use client"

import { useEffect, useState } from "react"
import { Card, Row, Col, Form, Button, Alert } from "react-bootstrap"
import { ChangePassword, Logout } from "../../redux/actions/AccountApi"
import { useDispatch } from "react-redux"

const AccountDetails = ({ userData }) => {
  const dispatch = useDispatch()
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

  //PASSWORD HANDLERS
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [isButtonDisabled , setIsButtonDisabled] = useState(true)

  const[PswFormData , setPswFormData] = useState({
    OldPassword : "",
    NewPassword : "",
    ConfirmNewPassword : ""
  })
  const handleChangePsw = (e) =>{
    const {name , value} = e.target
    setPswFormData({
      ...PswFormData,
      [name]: value,
    })
  }

  const isChangePswDisabled = () =>{
    if(PswFormData.OldPassword && PswFormData.NewPassword && PswFormData.ConfirmNewPassword){
      setIsButtonDisabled(false)
    }else{
      setIsButtonDisabled(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Qui andrebbe la logica per salvare i dati
    //  TODO LOGICA SAVE DATI

    setIsEditing(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  //check in tempo reale dei campi compilati
  useEffect(()=>{
    isChangePswDisabled()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[PswFormData])

const HandleChangePassword = async () => {
  const initialPasswordObject = {
    OldPassword : "",
    NewPassword : "",
    ConfirmNewPassword : ""
  }
    console.log(PswFormData)
    setIsError(false);
      if(PswFormData.OldPassword === PswFormData.NewPassword){
        setIsError(true)
        setErrorMessage("Incorrect Password, Current and New Password Fields must not match")
        setPswFormData( initialPasswordObject) 
        return;
      }else if(PswFormData.NewPassword !== PswFormData.ConfirmNewPassword){
        setIsError(true)
        setErrorMessage("Incorrect Password, New and Confirm password fields must match")
        setPswFormData( initialPasswordObject)
        return;
      }else{
        const result = await ChangePassword(PswFormData)
        if (!result){
          setIsError(true)
          setErrorMessage("Attempt to change password failed")
          setPswFormData( initialPasswordObject)
        }else{
          dispatch(Logout())
        }
      }
}
const changePasswordCard = () =>{
  return (
    <>
            <Card className="border-0 shadow-sm mb-4" style={{ backgroundColor: "#121225" }}>
        <Card.Header className="bg-dark border-0 d-flex justify-content-between align-items-center">
          <h5 className="text-light mb-0">Password</h5>
        </Card.Header>
        <Card.Body className="p-4">
          <Form>
            <Row className=" justify-content-center">
              {/* OLDPSW */}
              <Col md={12} className="mb-3">
                <Form.Group controlId="OldPassword" className="d-flex justify-content-around align-items-center">
                  <Form.Label className="text-light w-25 text-center">Current Password</Form.Label>
                  <div className="position-relative w-50" >
                  <Form.Control
                    type={showOldPassword ? "text" : "password"}
                    name="OldPassword"
                    value={PswFormData.OldPassword}
                    onChange={handleChangePsw}
                    required
                    className="bg-dark text-light border-secondary"
                    />
                    <span
                          style={{
                            position: "absolute",
                            right: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#ccc"
                          }}
                          onClick={() => setShowOldPassword((prev) => !prev)}
                          tabIndex={0}
                          role="button"
                          aria-label={showOldPassword ? "Nascondi password" : "Mostra password"}
                        >
                          {showOldPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                        </span>
                    </div>
                </Form.Group>
              </Col>
              {/* NEWPSW */}
              <Col md={12} className="mb-3">
                <Form.Group controlId="NewPassword" className="d-flex justify-content-around align-items-center">
                  <Form.Label className="text-light w-25 text-center">New Password</Form.Label>
                  <div className="position-relative w-50" >
                  <Form.Control
                    type={showNewPassword ? "text" : "password"}
                    name="NewPassword"
                    value={PswFormData.NewPassword}
                    onChange={handleChangePsw}
                    required
                    className="bg-dark text-light border-secondary"
                    />
                    <span
                          style={{
                            position: "absolute",
                            right: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#ccc"
                          }}
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          tabIndex={0}
                          role="button"
                          aria-label={showNewPassword ? "Nascondi password" : "Mostra password"}
                        >
                          {showNewPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                        </span>
                    </div>
                </Form.Group>
              </Col>
              {/* CONFIRMPSW */}
              <Col md={12} className="mb-3">
                <Form.Group controlId="ConfirmNewPassword" className="d-flex justify-content-around align-items-center">
                  <Form.Label className="text-light w-25 text-center">Confirm New Password</Form.Label>
                  <div className="position-relative w-50" >
                  <Form.Control
                    type={showConfirmNewPassword ? "text" : "password"}
                    name="ConfirmNewPassword"
                    value={PswFormData.ConfirmNewPassword}
                    onChange={handleChangePsw}
                    required
                    className="bg-dark text-light border-secondary"
                    />
                    <span
                          style={{
                            position: "absolute",
                            right: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#ccc"
                          }}
                          onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                          tabIndex={0}
                          role="button"
                          aria-label={showConfirmNewPassword ? "Nascondi password" : "Mostra password"}
                        >
                          {showConfirmNewPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                        </span>
                    </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>{isError && <span className="text-center mb-2 text-danger">{errorMessage}</span>}</Row>
            <Row className="justify-content-center"> <Button variant="outline-danger w-25" disabled={isButtonDisabled} onClick={HandleChangePassword}>Change Password</Button> </Row>
          </Form>
        </Card.Body>
      </Card>

    </>
  )
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
      {
        (userData.isGoogleAccount !== "True" ) &&  changePasswordCard()
      }
    </>
  )
}

export default AccountDetails

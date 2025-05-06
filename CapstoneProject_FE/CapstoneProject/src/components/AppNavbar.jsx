"use client";

import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  Cpu,
  Memory,
  Motherboard,
  HddFill,
  LightningChargeFill,
  BoxFill,
  Fan,
  Headphones,
  Keyboard,
  Mouse,
  VolumeUp,
  Camera,
  Ethernet,
  Wifi,
  Window,
  Thermometer,
  UsbDrive,
  SpeakerFill,
  Disc,
  BatteryFull,
  Search,
  Person,
  GpuCard,
  PersonFill,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../redux/actions/AccountApi";

const AppNavbar = () => {
  const activeUser = useSelector((state) => state.profile.data);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false);

  const [showSecondaryComps] = useState(false);

  // Componenti principali che saranno attivi
  const mainComponents = [
    { id: "cpu", name: "CPU", icon: <Cpu size={20} />, path: `/products/cpu?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc` },
    {
      id: "cpucooler",
      name: "CPU Cooler",
      icon: <Fan size={20} />,
      path: `/products/cpucooler?page=1&pageSize=12&sortBy=price&sortDir=desc`,
    },
    {
      id: "motherboard",
      name: "Motherboard",
      icon: <Motherboard size={20} />,
      path: `/products/motherboard?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc`,
    },
    {
      id: "ram",
      name: "RAM",
      icon: <Memory size={20} />,
      path: `/products/ram?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc`,
    },
    {
      id: "gpu",
      name: "GPU",
      icon: <GpuCard size={20} />,
      path: `/products/gpu?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc`,
    },
    {
      id: "storage",
      name: "Storage",
      icon: <HddFill size={20} />,
      path: `/products/storage?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc`,
    },
    {
      id: "case",
      name: "Case",
      icon: <BoxFill size={20} />,
      path: `/products/case?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc`,
    },
    {
      id: "powersupply",
      name: "Power Supply",
      icon: <LightningChargeFill size={20} />,
      path: `/products/powersupply?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc`,
    },
  ];

  // Componenti secondari raggruppati per categoria
  const secondaryComponents = {
    Peripherals: [
      {
        id: "headphones",
        name: "Headphones",
        icon: <Headphones size={16} />,
        path: "/products/headphones",
      },
      {
        id: "keyboard",
        name: "Keyboard",
        icon: <Keyboard size={16} />,
        path: "/products/keyboard",
      },
      {
        id: "mouse",
        name: "Mouse",
        icon: <Mouse size={16} />,
        path: "/products/mouse",
      },
      {
        id: "speakers",
        name: "Speakers",
        icon: <SpeakerFill size={16} />,
        path: "/products/speakers",
      },
      {
        id: "webcam",
        name: "Webcam",
        icon: <Camera size={16} />,
        path: "/products/webcam",
      },
    ],
    Expansion: [
      {
        id: "sound-card",
        name: "Sound Card",
        icon: <VolumeUp size={16} />,
        path: "/products/sound-card",
      },
      {
        id: "wired-network",
        name: "Wired Network",
        icon: <Ethernet size={16} />,
        path: "/products/wired-network",
      },
      {
        id: "wireless-network",
        name: "Wireless Network",
        icon: <Wifi size={16} />,
        path: "/products/wireless-network",
      },
    ],
    Accessories: [
      {
        id: "case-fan",
        name: "Case Fan",
        icon: <Fan size={16} />,
        path: "/products/case-fan",
      },
      {
        id: "thermal-compound",
        name: "Thermal Compound",
        icon: <Thermometer size={16} />,
        path: "/products/thermal-compound",
      },
      {
        id: "ups",
        name: "UPS",
        icon: <BatteryFull size={16} />,
        path: "/products/ups",
      },
      {
        id: "optical-drive",
        name: "Optical Drive",
        icon: <Disc size={16} />,
        path: "/products/optical-drive",
      },
      {
        id: "external-storage",
        name: "External Storage",
        icon: <UsbDrive size={16} />,
        path: "/products/external-storage",
      },
      {
        id: "operating-system",
        name: "Operating System",
        icon: <Window size={16} />,
        path: "/products/operating-system",
      },
    ],
  };

  useEffect(() => {
  }, [activeUser])

  const logoutAccount = () =>{
    dispatch(Logout())
    navigate("/Account/Login")
  }

  const handleNavigate = (component) =>{
    setShowDropdown(false);
    navigate(component.path);
  }


  return (
    <Navbar
      variant="dark"
      expand="lg"
      className="border-bottom border-dark py-2"
      style={{ backgroundColor: "#0a0a14" }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="../src/assets/img/iconv3.png"
            alt="PC Builder"
            height="50"
            className="me-2"
          />
          <span className="fw-bold" style={{ color: "#64889F" }}>
            RigForge
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/builder" className="mx-2">
              Builder
            </Nav.Link>

            {/* Modern Products Dropdown */}
            <div className="position-relative mx-2 ">
              <Nav.Link
                className="dropdown-toggle"
                onMouseEnter={() => setShowDropdown(true)}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Products
              </Nav.Link>

              {showDropdown && (
                <div
                  className="modern-dropdown position-absolute start-0 py-4 px-3 shadow-lg"
                  style={{
                    backgroundColor: "#0a0a14",
                    top: "100%",
                    zIndex: 1000,
                    borderTop: "1px solid #2c2c44",
                    borderBottom: "1px solid #2c2c44",
                    width: "800px",
                    left: "-200px",
                  }}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div className="container-fluid">
                    {/* Componenti principali */}
                    <div className="row mb-4">
                      <div className="col-12">
                        <h6 className="text-light mb-3 border-bottom border-secondary pb-2 fw-bold">
                          Essential Components
                        </h6>
                        <div className="row">
                          {mainComponents.map((component) => (
                            <div key={component.id} className="col-md-3 mb-3">
                              <a
                                //to={component.path}
                                onClick={()=>{handleNavigate(component)}}
                                className="d-flex flex-column align-items-center text-decoration-none text-light main-component-item p-2 custom-link"
                              >
                                <div
                                  className="mb-2 d-flex align-items-center justify-content-center"
                                  style={{
                                    width: "48px",
                                    height: "48px",
                                    backgroundColor: "#1a1a35",
                                    borderRadius: "12px",
                                  }}
                                >
                                  {component.icon}
                                </div>
                                <span className="text-center">
                                  {component.name}
                                </span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Componenti secondari */}
                    {showSecondaryComps && (
                      <div className="row">
                        {Object.entries(secondaryComponents).map(
                          ([category, items]) => (
                            <div key={category} className="col-md-4 mb-3">
                              <h6 className="text-muted mb-2 small fw-bold">
                                {category}
                              </h6>
                              <ul className="list-unstyled">
                                {items.map((item) => (
                                  <li key={item.id} className="mb-1">
                                    <Link
                                      to={item.path}
                                      className="d-flex align-items-center text-decoration-none text-muted secondary-component-item py-1"
                                    >
                                      <span className="me-2">{item.icon}</span>
                                      <small>{item.name}</small>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Nav.Link as={Link} to="/Builds" className="mx-2">
              UserBuilds
            </Nav.Link>
          </Nav>
          <Nav>
            {!activeUser.role ? (
              <>
              <Nav.Link
                  as={Link}
                  to="/Account/login"
                  className="d-flex align-items-center text-light opacity-75 border-2 border-secondary border-end"
                >
                  <span className="fw-bold">Login</span>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/Account/register"
                  className="d-flex align-items-center text-light opacity-75 border-2 border-secondary  border-end"
                >
                  <span className="fw-bold">Signup</span>
                </Nav.Link>
                
              </>
            ) : (
              <>
              <Nav.Link
                  as={Link}
                  to="/Account/mybuilds"
                  className="d-flex align-items-center text-light opacity-75 border-2 border-secondary border-end"
                >
                  <span className="fw-bold">My Builds</span>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/Account/profile"
                  className="d-flex align-items-center text-light opacity-75 border-2 border-secondary border-end"
                >
                  <span className="fw-bold">My Account</span>
                </Nav.Link>
                <Nav.Link
                  onClick={logoutAccount}
                  className="d-flex align-items-center text-light opacity-75 border-2 border-secondary border-end"
                >
                  <span className="fw-bold">Logout</span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

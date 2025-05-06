import { Button, Card, Col, Form } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";
import CpuFilters from "./FiltersBody/CpuFilters";
import CoolerFilters from "./FiltersBody/CoolerFilters";
import MoboFilters from "./FiltersBody/MoboFilters";
import RamFilters from "./FiltersBody/RamFilters";
import GpuFilters from "./FiltersBody/GpuFilters";
import StorageFilters from "./FiltersBody/StorageFilters";
import CaseFilters from "./FiltersBody/CaseFilters";
import PsuFilters from "./FiltersBody/PsuFilters";
import { useEffect, useState } from "react";
import PriceSlider from "./FiltersBody/Sliders/PriceSlider";
import { debounce } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";

const ProductFilters = ({ category , showFilters , setShowFilters }) => {
  const navigate = useNavigate()
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [manufacturers , setManufacturers] = useState([])
  const [manufacturersId , setManufacturersId] = useState(params.get("manufacturer") || "")
  

  const renderFilterBody = (category) => {
    switch (category) {
      case 'cpu':
        return <CpuFilters />;
      case 'cpucooler':
        return <CoolerFilters />;
      case 'motherboard':
        return <MoboFilters />;
        case 'ram':
        return <RamFilters />;
        case 'gpu':
        return <GpuFilters />;
        case 'storage':
        return <StorageFilters />;
        case 'case':
        return <CaseFilters />;
        case 'powersupply':
        return <PsuFilters />;
      
      default:
        return <></>;
    }
}
    useEffect(()=>{
        fetchSupportTables(category)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

      const updatePriceQuery = debounce((minprice, maxprice) => {
        
        params.set("minPrice", minprice);
        params.set("maxPrice", maxprice);
        navigate({
          pathname: location.pathname,
          search: params.toString(),
        });
      }, 1500); // 1s delay

    const fetchSupportTables = async (cat) => {
      try {
        if(cat === "cpucooler"){
          cat = "cooler"
        }
        const url = `https://localhost:7099/api/Support/manufacturers?category=${cat}`;
        const response = await fetch(url)
        if(!response.ok){throw new Error("Error while fetching manufacturers")}
        const data = await response.json()
        setManufacturers(data)

      } catch (error) {
        console.log(error)
      }
    }

    const handleManufacturerChange = (e) =>{
      const value = e.target.value;
      setManufacturersId(value)

      if (value) {
        params.set("manufacturer", value);
        } else {
          params.delete("manufacturer"); // Rimuovi manufacturer dalla url se viene selezionato ALL
        }
        navigate({
        pathname: location.pathname,
        search: params.toString(),
        });
    }

  const resetAllFilters =() =>{
    navigate(`/products/${category}?page=1&pageSize=12&sortBy=releaseyear&sortDir=desc`)
  }

    return ( 
        <>
        <Col
                lg={3}
                className={`mb-4 ${
                  showFilters ? "d-block" : "d-none d-lg-block"
                }`}
              >
                <Card
                  className="border-0 shadow-sm"
                  style={{ backgroundColor: "#121225" }}
                >
                  <Card.Header className="d-flex justify-content-between align-items-center bg-dark border-0">
                    <h5 className="mb-0 text-light">Filters</h5>
                    <div className="d-flex">
                      <Button
                        variant="link"
                        className="text-light p-0 d-lg-none"
                        onClick={() => setShowFilters(false)}
                      >
                        <XCircleFill size={20} />
                      </Button>
                      
                    </div>
                  </Card.Header>
                  <Card.Body>
                  <Button
                      variant="outline-danger"
                      size="sm"
                      className="w-100"
                      onClick={resetAllFilters}
                      >
                      Clear All Filters
                    </Button>

                    {/* Price Range Filter */}
                    <div className="mb-3 pb-2 border-bottom border-secondary">
                        <div className="d-flex justify-content-between align-items-center py-2">
                        <h5 className="mb-0 text-light">Price Range</h5>
                      </div>
                      <PriceSlider onChange={updatePriceQuery} />
                    </div>


                    {/* Brand Filter */}
                    <div className="mb-3 pb-2 border-bottom border-secondary">
                      <h5 className="text-light mb-2">Manufacturer</h5>

                      <div
                        className="mt-2"
                        style={{ maxHeight: "220px", overflowY: "scroll" }}
                        >
                          <Form.Check
                          type="radio"
                          name="manufacturer"
                          label="All"
                          value=""
                          checked={manufacturersId === ""}
                          onChange={handleManufacturerChange}
                          className="mb-2 text-light styled-radio"
                          />
                        {manufacturers.map((item,index) => (
                          <Form.Check
                          key={index}
                          type="radio"
                          name="manufacturer"
                          label={item.name}
                          value={item.id}
                          checked={manufacturersId === item.id.toString()}
                          onChange={handleManufacturerChange}
                          className="mb-2 text-light styled-radio"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Rating Filter */}
                    {/* <div className="mb-4">
                      <h6 className="text-light mb-2">Rating</h6>
                      
                      <div className="mt-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <Form.Check
                        key={rating}
                        type="checkbox"
                        id={`rating-${rating}`}
                        label={
                          <div className="d-flex align-items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                            key={i}
                            className={
                              i < rating ? "text-warning" : "text-muted"
                              }
                              >
                              ★
                              </span>
                              ))}
                              {rating === 5 && (
                                <span className="ms-1 text-light">& Up</span>
                                )}
                                </div>
                                }
                                className="mb-2"
                                />
                                ))}
                                </div>
                                </div> */}

                    {/* Features Filter */}

                      <div className="mt-2">
                          {renderFilterBody(category)}
                      </div>
                  
                  </Card.Body>
                </Card>
              </Col>
        </>
  );
}

export default ProductFilters;
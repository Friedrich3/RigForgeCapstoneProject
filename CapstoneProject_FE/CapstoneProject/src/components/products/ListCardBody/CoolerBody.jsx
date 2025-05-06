import { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import { AddComponent, AddComponentApi } from "../../../redux/actions/BuildApi";
import { useDispatch, useSelector } from "react-redux";

const CoolerBody = ({ product }) => {
  const currentUser = useSelector((state) => state.profile.data);
  const navigate = useNavigate();
  const { category } = useParams();
  const dispatch = useDispatch()
  const [socketList, setSocketList] = useState([]);

  useEffect(()=>{
    setSocketList(product.socket)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const handleNavigate = async () => {
    if (currentUser.role) {
      await AddComponentApi(product.id, category);
    } else {
      await dispatch(AddComponent(category, product));
    }
    navigate("/builder");
  };
  

    return (
        <>
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h5 className="text-light mb-1 fs-4 fw-bold" onClick={()=>{navigate(`/products/${category}/${product.id}`)}}>{product.name}</h5>
             <div className="d-flex  row">
                <div className="col-6"><span className="text-light opacity-75">Type:</span>{" "}<span className="text-light fw-bold">{product.type === 0?"Air" : "Liquid"}</span></div>
                <div className="col-6"><span className="text-light opacity-75">Tdp:</span>{" "}<span className="text-light fw-bold">{product.tdp} W</span></div>
                <div className="col-12"><span className="text-light opacity-75">Socket:</span>{" "}
                <ul className="text-light fw-bold d-flex row">
                    {socketList.map((item, index)=> 
                (
                    <li key={index} className="col-12 col-sm-6 p-0">{item}</li>
                ))
                }</ul></div>
                
             </div>
            </div>
            <h5 className="text-light mb-0">${product.price.toFixed(2)}</h5>
          </div>
          <div className="mt-auto d-flex justify-content-end align-items-center">

            <div className="">
              <Button
                variant="primary"
                size="sm"
                onClick={handleNavigate}
              >
                Add to Build
              </Button>
            </div>
          </div>
        </Card.Body>
    </> 
    );
}
 
export default CoolerBody;
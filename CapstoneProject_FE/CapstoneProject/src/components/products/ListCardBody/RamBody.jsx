import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AddComponent, AddComponentApi } from "../../../redux/actions/BuildApi";
import { useDispatch, useSelector } from "react-redux";


const RamBody = ({ product }) => {
  const currentUser = useSelector((state) => state.profile.data);
  const navigate = useNavigate();
  const { category } = useParams()
  const dispatch = useDispatch()

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
             <div className="d-flex  row row-cols-2">
                <div><span className="text-light opacity-75">Ram Type:</span>{" "}<span className="text-light fw-bold">{product.ramType}</span></div>
                <div><span className="text-light opacity-75">Speed:</span>{" "}<span className="text-light fw-bold">{product.speed} MHz</span></div>
                <div><span className="text-light opacity-75">Modules:</span>{" "}<span className="text-light fw-bold">{product.modules} x {product.capacity / product.modules} Gb</span></div>
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

export default RamBody;
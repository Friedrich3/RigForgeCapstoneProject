import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { normalizeImagePath } from "../../redux/actions/ProductsApi";
import { AddComponent, AddComponentApi } from "../../redux/actions/BuildApi";
import { useDispatch, useSelector } from "react-redux";

const ProductGridCard = ({product}) => {
  const currentUser = useSelector((state) => state.profile.data);
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()


  // const normalizeImagePath = (imagePath) => {
  //   imagePath.replace(/\\/g, '/');
  //   return imagePath = `http://localhost:5059/${imagePath}`
  // }
   
  const handleNavigate = async()=>{
    if(currentUser.role){
      await AddComponentApi(product.id, category);
    }else{
      await dispatch(AddComponent(category, product))
    }
    navigate("/builder")
  }
   
    return ( 
        <>
        <Card
        className="border-0 shadow-sm h-100 product-card"
        style={{ backgroundColor: "#121225", cursor: "pointer" }}
      >
        <div className="position-relative" >
          <Card.Img
            variant="top"
            src={normalizeImagePath(product.image)}
            alt={product.name}
            onClick={()=>{navigate(`/products/${category}/${product.id}`)}}
            className="p-3"
          />
        </div>

        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-light mb-1" style={{ fontSize: "1.5rem" }} onClick={()=>{navigate(`/products/${category}/${product.id}`)}}>
            {product.name}
          </Card.Title>
{/*       
SEZIONE RATING NON IMPLEMENTATA YET
          <div className="d-flex align-items-center mb-2">
            <div className="text-warning me-1">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-muted ms-2 small">({product.rating})</span>
          </div> */}
            <h5 className="text-light mb-3">${product.price.toFixed(2)}</h5>
          <div className="mt-auto d-flex justify-content-between align-items-center">
          <Button variant="outline-light" size="sm" onClick={()=>{navigate(`/products/${category}/${product.id}`)}}>
              Details
            </Button>
            <Button variant="primary" size="sm" onClick={handleNavigate}>
              Add
            </Button>
          </div>
        </Card.Body>
      </Card>
        </>
     );
}
 
export default ProductGridCard;
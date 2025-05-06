import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CpuBody from "./ListCardBody/cpuBody";
import CoolerBody from "./ListCardBody/CoolerBody";
import MoboBody from "./ListCardBody/MoboBody";
import RamBody from "./ListCardBody/RamBody";
import GpuBody from "./ListCardBody/GpuBody";
import StorageBody from "./ListCardBody/StorageBody";
import CaseBody from "./ListCardBody/CaseBody";
import PsuBody from "./ListCardBody/PsuBody";
import { normalizeImagePath } from "../../redux/actions/ProductsApi";

const ProductListCard = ( {product} ) => {
    const navigate = useNavigate();
    const { category } = useParams();


    // const normalizeImagePath = (imagePath) => {
    //     imagePath.replace(/\\/g, '/');
    //     return imagePath = `http://localhost:5059/${imagePath}`
    //   }

      const renderProductBody = (category, product) => {
        switch (category) {
          case 'cpu':
            return <CpuBody product={product} />;
          case 'cpucooler':
            return <CoolerBody product={product} />;
          case 'motherboard':
            return <MoboBody product={product} />;
            case 'ram':
            return <RamBody product={product} />;
            case 'gpu':
            return <GpuBody product={product} />;
            case 'storage':
            return <StorageBody product={product} />;
            case 'case':
            return <CaseBody product={product} />;
            case 'powersupply':
            return <PsuBody product={product} />;
          
          default:
            return <></>;
        }
    }

    return ( 
    <>
    <Card
          className="border-0 border-bottom rounded-0 shadow-sm h-100 product-card mb-3"
          style={{ backgroundColor: "#121225", cursor: "pointer" }}
        >
          <div className="d-flex">
            <div style={{ width: "150px", minWidth: "150px" }} className="p-3">
              <img
                src={normalizeImagePath(product.image)}
                alt={product.name}
                onClick={()=>{navigate(`/products/${category}/${product.id}`)}}
                className="img-fluid"
              />
            </div>
            {renderProductBody(category, product)}
          </div>
        </Card>
    </> 
    );
}
 
export default ProductListCard;
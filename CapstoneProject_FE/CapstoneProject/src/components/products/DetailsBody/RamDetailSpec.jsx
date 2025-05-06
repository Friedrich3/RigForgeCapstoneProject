const RamDetailSpec = ({product}) => {
    return ( <>
    <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Manufacturer
        </td>
        <td className="text-light">{product.manufacturer}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Memory Type
        </td>
        <td className="text-light">{product.ramType}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Memory Speed
        </td>
        <td className="text-light">{product.speed}</td>
      </tr>
      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Modules
        </td>
        <td className="text-light">{product.modules} x {product.capacity / 2 } GB</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Year of Release
        </td>
        <td className="text-light">{product.releaseYear}</td>
      </tr>
    </> );
}
 
export default RamDetailSpec;
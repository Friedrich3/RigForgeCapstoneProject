const PsuDetailSpec = ({product}) => {
    return ( <>
    <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Manufacturer
        </td>
        <td className="text-light">{product.manufacturer}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Efficiency
        </td>
        <td className="text-light">{product.efficiencyRating}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
        Wattage
        </td>
        <td className="text-light">{product.wattage} W</td>
      </tr>
      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Modular
        </td>
        <td className="text-light">{product.modular? "Yes":"No"}</td>
      </tr>
      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Year of release
        </td>
        <td className="text-light">{product.releaseYear}</td>
      </tr>
    </> );
}
 
export default PsuDetailSpec;
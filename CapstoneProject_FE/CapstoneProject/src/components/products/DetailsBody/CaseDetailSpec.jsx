const CaseDetailSpec = ({product}) => {
    return ( <>
    <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Manufacturer
        </td>
        <td className="text-light">{product.manufacturer}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Form Factor
        </td>
        <td className="text-light">{product.formFactor}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Color
        </td>
        <td className="text-light">{product.color}</td>
      </tr>
      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Fan Slots
        </td>
        <td className="text-light">{product.fanSupportCount}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
        Glass Panel
        </td>
        <td className="text-light">{product.hasGlassPanel? "Yes":"No"}</td>
      </tr>
      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
        Year of release
        </td>
        <td className="text-light">{product.releaseYear}</td>
      </tr>
    </> );
}
 
export default CaseDetailSpec;
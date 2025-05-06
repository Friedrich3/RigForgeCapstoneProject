const MoboDetailSpec = ({product}) => {
    return ( <>
    <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Manufacturer
        </td>
        <td className="text-light">{product.manufacturer}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Socket
        </td>
        <td className="text-light">{product.socket}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Chipset
        </td>
        <td className="text-light">{product.chipset}</td>
      </tr>
      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Form Factor
        </td>
        <td className="text-light">{product.formFactor}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Memory Type
        </td>
        <td className="text-light">{product.ramType}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Max Memory
        </td>
        <td className="text-light">{product.maxRam} GB</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Max Memory Slots
        </td>
        <td className="text-light">{product.ramSlots}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
        Pcie Slots
        </td>
        <td className="text-light">{product.pcieSlots}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
        M.2 Slots
        </td>
        <td className="text-light">{product.m2Slots}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Year of Release
        </td>
        <td className="text-light">{product.releaseYear}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
        Wireless Networking
        </td>
        <td className="text-light">{product.wifiIncluded? "Yes":"No"}</td>
      </tr>

    </> );
}
 
export default MoboDetailSpec;
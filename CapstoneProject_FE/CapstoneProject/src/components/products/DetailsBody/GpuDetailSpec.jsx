const GpuDetailSpec = ({product}) => {
    return ( <>
    <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Manufacturer
        </td>
        <td className="text-light">{product.manufacturer}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Chipset
        </td>
        <td className="text-light">{product.chipset}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Memory
        </td>
        <td className="text-light">{product.vram} Gb</td>
      </tr>
      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Tdp
        </td>
        <td className="text-light">{product.tdp} W</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Interface
        </td>
        <td className="text-light">Pcie Version {product.pcieVersion}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Year of Release
        </td>
        <td className="text-light">{product.releaseYear}</td>
      </tr>
    </> );
}
 
export default GpuDetailSpec;
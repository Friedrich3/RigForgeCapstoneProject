const StorageDetailSpec = ({product}) => {
    return ( <>
    <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Manufacturer
        </td>
        <td className="text-light">{product.manufacturer}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Capacity
        </td>
        <td className="text-light">{product.capacity >= 1000 ? `${product.capacity/1000} TB`:`${product.capacity} GB`}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Type
        </td>
        <td className="text-light">{product.storageType}</td>
      </tr>
      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Form Factor
        </td>
        <td className="text-light">{product.formFactor}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Interface
        </td>
        <td className="text-light">{product.interface}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
        NVME
        </td>
        <td className="text-light">{product.nvmeSupport? "Yes":"No"}</td>
      </tr>
      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
        Year of release
        </td>
        <td className="text-light">{product.releaseYear}</td>
      </tr>
    </> );
}
 
export default StorageDetailSpec;
import { useEffect, useState } from "react";

const CoolerDetailSpec = ({ product }) => {
  const [socketList, setSocketList] = useState([]);

  useEffect(() => {
    setSocketList(product.compatibleSockets);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Manufacturer
        </td>
        <td className="text-light">{product.manufacturer}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Type
        </td>
        <td className="text-light">{product.type === 0 ? "Air" : "Liquid"}</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Tdp
        </td>
        <td className="text-light">{product.tdp} W</td>
      </tr>

      <tr>
        <td className="text-light opacity-75" style={{ width: "30%" }}>
          Compatible Sockets
        </td>
        <td className="text-light">
          <ul className="mb-0 ps-0 list-unstyled ">
            {socketList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </td>
      </tr>
    </>
  );
};

export default CoolerDetailSpec;

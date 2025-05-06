const CpuDetailSpec = ({ product }) => {
    return ( 
    <>

                      <tr >
                        <td className="text-light opacity-75" style={{ width: "30%" }}>Manufacturer</td>
                        <td className="text-light">{product.manufacturer}</td>
                      </tr>

                      <tr >
                        <td className="text-light opacity-75" style={{ width: "30%" }}>Socket</td>
                        <td className="text-light">{product.socket}</td>
                      </tr>

                      <tr >
                        <td className="text-light opacity-75" style={{ width: "30%" }}>Cores</td>
                        <td className="text-light">{product.cores}</td>
                      </tr>

                      <tr >
                        <td className="text-light opacity-75" style={{ width: "30%" }}>Threads</td>
                        <td className="text-light">{product.threads}</td>
                      </tr>

                      <tr >
                        <td className="text-light opacity-75" style={{ width: "30%" }}>Core Clock</td>
                        <td className="text-light">{product.baseClock} GHz</td>
                      </tr>

                      <tr >
                        <td className="text-light opacity-75" style={{ width: "30%" }}>Boost Clock</td>
                        <td className="text-light">{product.boostClock} GHz</td>
                      </tr>
                      <tr >
                        <td className="text-light opacity-75" style={{ width: "30%" }}>TDP</td>
                        <td className="text-light">{product.tdp} W</td>
                      </tr>

                      <tr >
                        <td className="text-light opacity-75" style={{ width: "30%" }}>Integrated Graphic</td>
                        <td className="text-light">{product.integratedGraphics? "Yes" : "No"}</td>
                      </tr>

                       <tr >
                        <td className="text-light opacity-75" style={{ width: "30%" }}>Year of release</td>
                        <td className="text-light">{product.releaseYear}</td>
                      </tr> 



    </> );
}
 
export default CpuDetailSpec;
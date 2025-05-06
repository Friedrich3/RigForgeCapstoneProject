import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const CpuFilters = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const newParams = new URLSearchParams(location.search);

    const [sockets, setSockets] = useState([]);

    const [cpuSocket, setCpuSocket] = useState(newParams.get("socket") || "")



    useEffect(() => {
    fetchCpuSupport();
    }, []);

    const handleSocketChange = (e) => {
        const value = e.target.value;
        setCpuSocket(value);
            if (value) {
            newParams.set("socket", value);
            } else {
            newParams.delete("socket"); // Rimuovi socket dalla url se viene selezionato ALL
            }
            navigate({
            pathname: location.pathname,
            search: newParams.toString(),
            });
        };

    const fetchCpuSupport = async () => {
    try {
        const url = "https://localhost:7099/api/Support/socket";
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error("Error while fetching");
        }
        const data = await response.json();
        setSockets(data);
    } catch (error) {
        console.log(error);
    }
    };

    return (
    <>
        <div className="mb-3 pb-2 border-bottom border-secondary">
        <h5 className="text-light mb-2">Sockets</h5>

        <div
            className="mt-2"
            style={{ maxHeight: "250px", overflowY: "scroll" }}
        >
            <Form.Check
                type="radio"
                label="All"
                name="cpuSocket"
                value=""
                checked={cpuSocket === ""}
                onChange={handleSocketChange}
                className="mb-2 text-light styled-radio"
            />
            {sockets.map((item, index) => (
            <Form.Check
                key={index}
                type="radio"
                label={item.name}
                name="cpuSocket"
                value={item.id}
                checked={cpuSocket === item.id.toString()}
                onChange={handleSocketChange}
                className="mb-2 text-light styled-radio"
            />
            ))}
        </div>
        </div>
    </>
    );
};

export default CpuFilters;

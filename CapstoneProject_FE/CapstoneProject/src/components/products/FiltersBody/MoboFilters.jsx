import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const MoboFilters = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [sockets, setSockets] = useState([]);
    const [ramTypes, setRamTypes] = useState([]);
    const [formFactors, setFormFactors] = useState([]);

    const [moboSocket, setMoboSocket] = useState(params.get("socket") || "")
    const [moboRamTypes, setMoboRamTypes] = useState(params.get("ramtype") || "")
    const [moboFormFactors, setMoboFormFactors] = useState(params.get("formfactor") || "")

    useEffect(() => {
        fetchMoboSocket();
        fetchMoboRamType();
        fetchMoboFormFactors();
    }, []);

    const fetchMoboSocket = async () => {
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
    const fetchMoboRamType = async () => {
        try {
        const url = "https://localhost:7099/api/Support/ramtype";
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error while fetching");
        }
        const data = await response.json();
        setRamTypes(data);
        } catch (error) {
        console.log(error);
        }
    };
    const fetchMoboFormFactors = async () => {
        try {
        const url = "https://localhost:7099/api/Support/formfactor";
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error while fetching");
        }
        const data = await response.json();
        setFormFactors(data);
        } catch (error) {
        console.log(error);
        }
    };

    const handleSocketChange = (e) => {
        const value = e.target.value;
        setMoboSocket(value);
            if (value) {
                params.set("socket", value);
            } else {
                params.delete("socket"); // Rimuovi socket dalla url se viene selezionato ALL
            }
            navigate({
            pathname: location.pathname,
            search: params.toString(),
            });
        };
    const handleRamTypeChange = (e) => {
        const value = e.target.value;
        setMoboRamTypes(value);
            if (value) {
                params.set("ramtype", value);
            } else {
                params.delete("ramtype"); // Rimuovi ramtype dalla url se viene selezionato ALL
            }
            navigate({
            pathname: location.pathname,
            search: params.toString(),
            });
        };
    const handleFormFactorsChange = (e) => {
        const value = e.target.value;
        setMoboFormFactors(value);
            if (value) {
                params.set("formfactor", value);
            } else {
                params.delete("formfactor"); // Rimuovi formfactor dalla url se viene selezionato ALL
            }
            navigate({
            pathname: location.pathname,
            search: params.toString(),
            });
        };
    return (
        <>
        <div className="mb-3 pb-2 border-bottom border-secondary">
            <h6 className="text-light mb-2">Sockets</h6>

            <div
            className="mt-2"
            style={{ maxHeight: "250px", overflowY: "scroll" }}
            >
                <Form.Check
                type="radio"
                label="All"
                name="moboSocket"
                value=""
                checked = {moboSocket === ""}
                onChange={handleSocketChange}
                className="mb-2 text-light styled-radio"
                />
            {sockets.map((item, index) => (
                <Form.Check
                key={index}
                type="radio"
                name="moboSocket"
                label={item.name}
                value={item.id}
                checked = {moboSocket === item.id.toString()}
                onChange={handleSocketChange}
                className="mb-2 text-light styled-radio"
                />
            ))}
            </div>
        </div>
        <div className="mb-3 pb-2 border-bottom border-secondary">
            <h6 className="text-light mb-2">Ram Types</h6>

            <div
            className="mt-2"
            style={{ maxHeight: "150px", overflowY: "scroll" }}
            >
                <Form.Check
                type="radio"
                label="All"
                name="moboRamType"
                value=""
                checked = {moboRamTypes === ""}
                onChange={handleRamTypeChange}
                className="mb-2 text-light styled-radio"
                />
            {ramTypes.toReversed().map((item, index) => (
                <Form.Check
                key={index}
                type="radio"
                name="moboRamType"
                label={item.name}
                value={item.id}
                checked = {moboRamTypes === item.id.toString()}
                onChange={handleRamTypeChange}
                className="mb-2 text-light styled-radio"
                />
            ))}
            </div>
        </div>
        <div className="mb-3 pb-2 border-bottom border-secondary">
            <h6 className="text-light mb-2">Form Factor</h6>

            <div
            className="mt-2"
            style={{ maxHeight: "200px", overflowY: "scroll" }}
            >
                <Form.Check
                type="radio"
                label="All"
                name="moboFormFactor"
                value=""
                checked = {moboFormFactors === ""}
                onChange={handleFormFactorsChange}
                className="mb-2 text-light styled-radio"
                />
            {formFactors.map((item, index) => (
                <Form.Check
                key={index}
                type="radio"
                name="moboFormFactor"
                label={item.name}
                value={item.id}
                checked = {moboFormFactors === item.id.toString()}
                onChange={handleFormFactorsChange}
                className="mb-2 text-light styled-radio"
                />
            ))}
            </div>
        </div>
        </>
    );
    };
    export default MoboFilters;

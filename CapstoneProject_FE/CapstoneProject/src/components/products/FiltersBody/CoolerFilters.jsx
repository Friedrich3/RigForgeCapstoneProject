import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const CoolerFilters = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [type] = useState(["Air","Liquid"]);

    const [coolerType, setCoolerType] = useState(params.get("type") || "")

    useEffect(() => {
    
    }, []);

    const handleTypeChange = (e) =>{
        const value = e.target.value;
        setCoolerType(value)
    
            if (value) {
            params.set("type", value);
            } else {
                params.delete("type"); // Rimuovi manufacturer dalla url se viene selezionato ALL
            }
            navigate({
            pathname: location.pathname,
            search: params.toString(),
            });
        }


    return (
    <>
        <div className="mb-3 pb-2 border-bottom border-secondary">
        <h6 className="text-light mb-2">Type</h6>

        <div
            className="mt-2"
            style={{ maxHeight: "200px", overflowY: "scroll" }}
        >
            <Form.Check
                type="radio"
                label="All"
                name="coolerType"
                value=""
                checked={coolerType === ""}
                onChange={handleTypeChange}
                className="mb-2 text-light styled-radio"
            />
            {type.map((item, index) => (
            <Form.Check
                key={index}
                type="radio"
                name="coolerType"
                label={item}
                value={item}
                checked={coolerType === item}
                onChange={handleTypeChange}
                className="mb-2 text-light styled-radio"
            />
            ))}
        </div>
        </div>
    </>
    );
};
export default CoolerFilters;
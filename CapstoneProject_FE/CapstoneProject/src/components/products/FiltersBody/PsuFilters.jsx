import { useEffect, useState } from "react";
import PsuWattageSlider from "./Sliders/PsuWattageSlider";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const PsuFilters = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [psuModular, setPsuModular] = useState(params.get("modulartype") || "")

    useEffect(() => {
    }, []);

    const handleModularChange = (e) => {
        const value = e.target.value;
        setPsuModular(value);
            if (value) {
                params.set("modulartype", value);
            } else {
                params.delete("modulartype"); // Rimuovi socket dalla url se viene selezionato ALL
            }
            navigate({
            pathname: location.pathname,
            search: params.toString(),
            });
        };

    const updateWattageQuery = debounce((minWattage, maxWattage) => {
                    
        params.set("minWattage", minWattage);
        params.set("maxWattage", maxWattage);
        navigate({
            pathname: location.pathname,
            search: params.toString(),
        });
        }, 1500); // 1.5s delay

    return (
    <>
    <div className="mb-3 pb-2 border-bottom border-secondary">
        <h5 className="text-light mb-2">Wattage</h5> 
        <PsuWattageSlider onChange={updateWattageQuery}/>
        </div> 
        <div className="mb-3 pb-2 border-bottom border-secondary">
        <h6 className="text-light mb-2">Modular</h6>

        <div
            className="mt-2"
            style={{ maxHeight: "200px", overflowY: "scroll" }}
        >
            <Form.Check
                name="modular"
                type="radio"
                label="All"
                value=""
                checked={psuModular === ""}
                onChange={handleModularChange}
                className="mb-2 text-light styled-radio"
            />
            <Form.Check
            
                name="modular"
                type="radio"
                label="Yes"
                value={true}
                checked={psuModular === "true"}
                onChange={handleModularChange}
                className="mb-2 text-light styled-radio"
            />
            <Form.Check
                name="modular"
                type="radio"
                label="No"
                value={false}
                checked={psuModular === "false"}
                onChange={handleModularChange}
                className="mb-2 text-light styled-radio"
            />
        </div>
        </div>

        
    </>
    );
};
export default PsuFilters;
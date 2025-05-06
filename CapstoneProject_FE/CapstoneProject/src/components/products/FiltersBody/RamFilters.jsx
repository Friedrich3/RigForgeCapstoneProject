import { useEffect, useState } from "react";
import RamCapacitySlider from "./Sliders/RamCapacitySlider";
import RamFrequencySlider from "./Sliders/RamFrequencySlider";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const RamFilters = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [ramType, setRamType] = useState([]);

    const [ramTypes, setRamTypes] = useState(params.get("ramtype") || "")

    useEffect(() => {
        fetchRamTypeSupport();
    }, []);

    const fetchRamTypeSupport = async () => {
    try {
        const url = "https://localhost:7099/api/Support/ramtype";
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error("Error while fetching");
        }
        const data = await response.json();
        setRamType(data);
    } catch (error) {
        console.log(error);
    }
    };

    const handleRamTypeChange = (e) => {
        const value = e.target.value;
        setRamTypes(value);
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

        const updateFrequencyQuery = debounce((minspeed, maxspeed) => {
        
            params.set("minSpeed", minspeed);
            params.set("maxSpeed", maxspeed);
            navigate({
                pathname: location.pathname,
                search: params.toString(),
            });
          }, 1500); // 1.5s delay

        const updateCapacityQuery = debounce((mincapacity, maxcapacity) => {
        
            params.set("minCapacity", mincapacity);
            params.set("maxCapacity", maxcapacity);
            navigate({
                pathname: location.pathname,
                search: params.toString(),
            });
          }, 1500); // 1.5s delay

    return (
    <>
        <div className="mb-3 pb-2 border-bottom border-secondary">
        <h6 className="text-light mb-2">Memory Type</h6>

        <div
            className="mt-2"
            style={{ maxHeight: "200px", overflowY: "scroll" }}
        >
            <Form.Check
                type="radio"
                name="memorytype"
                label="All"
                value=""
                checked = {ramTypes === ""}
                onChange={handleRamTypeChange}
                className="mb-2 text-light styled-radio"
            />
            {ramType.toReversed().map((item, index) => (
            <Form.Check
                key={index}
                type="radio"
                name="memorytype"
                label={item.name}
                value={item.id}
                checked = {ramTypes === item.id.toString()}
                onChange={handleRamTypeChange}
                className="mb-2 text-light styled-radio"
            />
            ))}
        </div>
        </div>

        <div className="mb-3 pb-2 border-bottom border-secondary">
        <h5 className="text-light mb-2">Memory Frequency</h5> 
        <RamFrequencySlider onChange={updateFrequencyQuery} />
        </div> 

        <div className="mb-3 pb-2 border-bottom border-secondary">
        <h5 className="text-light mb-2">Capacity</h5> 
        <RamCapacitySlider onChange={updateCapacityQuery} />
        </div> 

    </>
    );
};
export default RamFilters;
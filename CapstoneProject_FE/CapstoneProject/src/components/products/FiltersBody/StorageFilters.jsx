import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import StorageCapacitySlider from "./Sliders/StorageCapacitySlider";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const StorageFilters = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [storageType, setStorageType] = useState([]);

    const [storageTypeId, setStorageTypeId] = useState(params.get("storagetype") || "")


    useEffect(() => {
        fetchStorageSupport();
    }, []);

    const fetchStorageSupport = async () => {
    try {
        const url = "https://localhost:7099/api/Support/storagetype";
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error("Error while fetching");
        }
        const data = await response.json();
        setStorageType(data);
    } catch (error) {
        console.log(error);
    }
    };

    const handleStorageTypeChange = (e) => {
        const value = e.target.value;
        setStorageTypeId(value);
            if (value) {
            params.set("storagetype", value);
            } else {
                params.delete("storagetype"); // Rimuovi storagetype dalla url se viene selezionato ALL
            }
            navigate({
            pathname: location.pathname,
            search: params.toString(),
            });
        };

        const updateCapacityQuery = debounce((minStorage, maxStorage) => {
                
                    params.set("minStorage", minStorage);
                    params.set("maxStorage", maxStorage);
                    navigate({
                        pathname: location.pathname,
                        search: params.toString(),
                    });
                  }, 1500); // 1.5s delay



    return (
    <>
        <div className="mb-3 pb-2 border-bottom border-secondary">
        <h6 className="text-light mb-2">Storage Type</h6>

        <div
            className="mt-2"
            style={{ maxHeight: "220px", overflowY: "scroll" }}
        >
            <Form.Check
            type="radio"
            label="All"
            name="storageType"
            value=""
            checked={storageTypeId === ""}
            onChange={handleStorageTypeChange}
            className="mb-2 text-light styled-radio"
            />
            {storageType.map((item, index) => (
            <Form.Check
                key={index}
                type="radio"
                name="storageType"
                label={item.name}
                value={item.id}
                checked={storageTypeId === item.id.toString()}
                onChange={handleStorageTypeChange}
                className="mb-2 text-light styled-radio"
            />
            ))}
        </div>
        </div>

        <div className="mb-3 pb-2 border-bottom border-secondary">
        <h5 className="text-light mb-2">Capacity</h5> 
        <StorageCapacitySlider onChange={updateCapacityQuery}/>
        </div> 
    </>
    );
};

export default StorageFilters;
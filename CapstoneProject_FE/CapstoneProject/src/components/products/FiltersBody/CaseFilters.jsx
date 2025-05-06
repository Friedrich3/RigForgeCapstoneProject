import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";


const CaseFilters = () => {
    const colors = [
        "Black",
        "White",
        "Gray",
        "Silver",
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Orange",
        "Purple",
        "Pink",
        "Beige",
        "Gold",
        "Bronze",
        "Gunmetal",
        "Transparent",
        "RGB" // Per case con illuminazione RGB
    ];
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [formFactor, setFormFactor] = useState([]);
    const [caseColors] = useState(colors);

    const [caseFormFactor, setCaseFormFactor] = useState(params.get("formfactor") || "")
    const [caseColorsQuery, setCaseColorsQuery] = useState(params.get("color") || "")
    const [caseGlassPanel, setCaseGlassPanel] = useState(params.get("glasspanel") || "")


    useEffect(() => {
    fetchCpuSupport();
    }, []);

    const fetchCpuSupport = async () => {
    try {
        const url = "https://localhost:7099/api/Support/formfactor";
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error("Error while fetching");
        }
        const data = await response.json();
        setFormFactor(data);
    } catch (error) {
        console.log(error);
    }
    };

    const handleFormFactorsChange = (e) => {
        const value = e.target.value;
        setCaseFormFactor(value);
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
    const handleColorChange = (e) => {
        const value = e.target.value;
        setCaseColorsQuery(value);
            if (value) {
                params.set("color", value);
            } else {
                params.delete("color"); // Rimuovi color dalla url se viene selezionato ALL
            }
            navigate({
            pathname: location.pathname,
            search: params.toString(),
            });
        };
        const handleGlassPanelChange = (e) => {
            const value = e.target.value;
            setCaseGlassPanel(value);
                if (value) {
                    params.set("glasspanel", value);
                } else {
                    params.delete("glasspanel"); // Rimuovi glasspanel dalla url se viene selezionato ALL
                }
                navigate({
                pathname: location.pathname,
                search: params.toString(),
                });
            }








    return (
    <>
        <div className="mb-3 pb-2 border-bottom border-secondary">
        <h6 className="text-light mb-2">Form Factors</h6>

        <div
            className="mt-2"
            style={{ maxHeight: "200px", overflowY: "scroll" }}
        >
            <Form.Check
            type="radio"
            label="All"
            name="caseFormFactor"
            value=""
            checked={caseFormFactor === ""}
            onChange={handleFormFactorsChange}
            className="mb-2 text-light styled-radio"
            />
            {formFactor.map((item, index) => (
            <Form.Check
                key={index}
                type="radio"
                name="caseFormFactor"
                label={item.name}
                value={item.id}
                checked={caseFormFactor === item.id.toString()}
                onChange={handleFormFactorsChange}
                className="mb-2 text-light styled-radio"
            />
            ))}
        </div>
        </div>
        <div className="mb-3 pb-2 border-bottom border-secondary">
        <h6 className="text-light mb-2">Colors</h6>

        <div
            className="mt-2"
            style={{ maxHeight: "220px", overflowY: "scroll" }}
        >
            <Form.Check
            type="radio"
            label="All"
            name="caseColor"
            value=""
            checked={caseColorsQuery === ""}
            onChange={handleColorChange}
            className="mb-2 text-light styled-radio"
            />
            {caseColors.map((item, index) => (
            <Form.Check
                key={index}
                type="radio"
                name="caseColor"
                label={item}
                value={item}
                checked={caseColorsQuery === item.toString()}
                onChange={handleColorChange}
                className="mb-2 text-light styled-radio"
            />
            ))}
        </div>
        </div>
        <div className="mb-3 pb-2 border-bottom border-secondary">
        <h6 className="text-light mb-2">Has Glass Panel</h6>

        <div
            className="mt-2"
            style={{ maxHeight: "200px", overflowY: "scroll" }}
        >
            <Form.Check
            type="radio"
            label="All"
            name="caseGlassPanel"
            value=""
            checked={caseGlassPanel === ""}
            onChange={handleGlassPanelChange}
            className="mb-2 text-light styled-radio"
            />
            <Form.Check
                type="radio"
                name="caseGlassPanel"
                label="Yes"
                value={true}
                checked={caseGlassPanel === "true"}
                onChange={handleGlassPanelChange}
                className="mb-2 text-light styled-radio"
            />
            <Form.Check
                type="radio"
                name="caseGlassPanel"
                label="No"
                value={false}
                checked={caseGlassPanel === "false"}
                onChange={handleGlassPanelChange}
                className="mb-2 text-light styled-radio"
            />
        </div>
        </div>
    </>
    );
};
export default CaseFilters;
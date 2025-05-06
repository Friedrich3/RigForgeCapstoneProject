    import { Alert } from "react-bootstrap";

    const SuccessAlert = ({ message }) => {
    if (!message) return null;

    return (
        <Alert variant="success" className="position-relative mt-3">
        {message}
        </Alert>
    );
    };

    export default SuccessAlert;
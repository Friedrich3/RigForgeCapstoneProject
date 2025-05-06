import { Col, Row } from "react-bootstrap";

const LoadingScreen = ({message}) => {
    return ( 
    <Row className="py-5 text-center">
        <Col>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-light mt-3">{ message }</p>
        </Col>
      </Row> );
}

export default LoadingScreen;
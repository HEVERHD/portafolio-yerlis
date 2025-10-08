import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  SiVercel,
  SiMacos,
  SiPycharm,
  SiSwagger,
  SiFigma,
  SiGithub,
  SiGooglechrome,
  SiReadthedocs,
} from "react-icons/si";
import { VscJson } from "react-icons/vsc";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {/* Originales */}
      <Col xs={4} md={2} className="tech-icons">
        <SiMacos title="macOS" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode title="VS Code" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostman title="Postman" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiSlack title="Slack" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVercel title="Vercel" />
      </Col>

      {/* Nuevas */}
      <Col xs={4} md={2} className="tech-icons">
        <SiPycharm title="PyCharm" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGooglechrome title="Chrome DevTools" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiSwagger title="Swagger" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiReadthedocs title="API Docs" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <VscJson title="JSON" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFigma title="Figma" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGithub title="GitHub" />
      </Col>
    </Row>
  );
}

export default Toolstack;

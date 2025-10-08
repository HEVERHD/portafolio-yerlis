import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiPython, DiGit } from "react-icons/di";
import { SiSelenium, SiMysql, SiJira, SiAndroidstudio } from "react-icons/si";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <DiPython title="Python" />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiSelenium title="Selenium WebDriver" />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiMysql title="SQL / MySQL" />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiJira title="Jira" />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiAndroidstudio title="Android Studio" />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <DiGit title="Git" />
      </Col>
    </Row>
  );
}

export default Techstack;

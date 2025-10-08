import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import { ImPointRight } from "react-icons/im";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Conoce quién <strong className="purple">SOY</strong>
            </h1>
            <Aboutcard />
          </Col>

          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>

        {/* Skillset Section */}
        <h1 className="project-heading">
          <strong className="purple">Lenguajes</strong> y Tecnologías
        </h1>
        <p style={{ textAlign: "center" }}>
          Estas son algunas de las herramientas con las que trabajo:
        </p>

        <Techstack />

        {/* Tools Section */}
        <h1 className="project-heading">
          <strong className="purple">Herramientas</strong> que utilizo
        </h1>
        <p style={{ textAlign: "center" }}>
          Mi entorno de trabajo QA incluye herramientas modernas para asegurar calidad y eficiencia.
        </p>

        <Toolstack />

        {/* Featured Projects Section */}
        <h1 className="project-heading">
          🚀 Proyectos <strong className="purple">Destacados</strong>
        </h1>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={8} style={{ textAlign: "justify" }}>
            <ul style={{ listStyle: "none", paddingLeft: "0" }}>
              <li style={{ marginBottom: "15px" }}>
                <ImPointRight />{" "}
                <b className="purple">Urban Routes Testing</b> – Automatización
                E2E del flujo de solicitud de taxi.
                <br />
                <small>Python · Selenium · Postman · SQL</small>
              </li>

              <li style={{ marginBottom: "15px" }}>
                <ImPointRight />{" "}
                <b className="purple">Suite de Pruebas API</b> – Postman + Newman
                con reportes HTML para endpoints críticos.
                <br />
                <small>API · Autenticación · Validación de respuestas</small>
              </li>

              <li style={{ marginBottom: "15px" }}>
                <ImPointRight />{" "}
                <b className="purple">Pruebas Móviles Android</b> – Casos de
                prueba funcionales y de regresión en app Android.
                <br />
                <small>Android Studio · QA Móvil · Casos Manuales</small>
              </li>
            </ul>

            <p style={{ textAlign: "center", marginTop: "30px" }}>
              👉 Mira todos mis proyectos en{" "}
              <a
                href="https://github.com/Yerlis24"
                target="_blank"
                rel="noreferrer"
                className="purple"
              >
                github.com/yerlisdimas
              </a>
            </p>
          </Col>
        </Row>

        {/* GitHub Section */}
        <Github />
      </Container>
    </Container>
  );
}

export default About;

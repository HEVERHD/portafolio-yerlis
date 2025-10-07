import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatarPROFILE.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              DÉJAME <span className="purple"> PRESENTARME </span>
            </h1>

            <p className="home-about-body">
              Soy <b className="purple">QA Engineer</b> con experiencia en pruebas
              manuales y automatizadas, apasionada por garantizar la calidad del
              software y la satisfacción del usuario final. Durante mi formación
              intensiva en <b className="purple">Tripleten</b> completé
              <b> 9 proyectos prácticos</b>, aplicando pruebas funcionales, de
              regresión, automatizadas y de API en escenarios reales.
              <br />
              <br />
              🔧 He trabajado con herramientas como{" "}
              <b className="purple">Selenium, Postman, SQL, Jira</b> y{" "}
              <b className="purple">Android Studio</b>, validando aplicaciones web,
              móviles y APIs. Esto me ha permitido detectar defectos críticos de
              forma temprana, optimizar procesos de QA y reducir tiempos de
              validación en proyectos.
              <br />
              <br />
              📦 Actualmente me desempeño como{" "}
              <b className="purple">Auxiliar Administrativa y Logística</b>, donde
              aplico habilidades de atención al detalle, control de calidad en
              entregas, gestión de tiempos y cumplimiento de procesos. Esta
              experiencia refuerza mi capacidad para asegurar productos confiables y
              con altos estándares de calidad.
              <br />
              <br />
              🚀 Me destaco por mi <b className="purple">capacidad analítica</b>,
              <b> orientación al detalle</b> y{" "}
              <b className="purple">compromiso con la mejora continua</b>, cualidades
              clave para aportar valor en equipos ágiles y multidisciplinarios.
              <br />
              <br />
              🎯 Busco una oportunidad como{" "}
              <b className="purple">
                QA Engineer, Tester Junior o Analista QA (Manual y Automatizado)
              </b>
              , donde pueda aplicar mis conocimientos, crecer profesionalmente y
              contribuir al desarrollo de software de alta calidad.
            </p>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="home-about-social">
            <h1>ENCUÉNTRAME EN</h1>
            <p>
              Siéntete libre de <span className="purple">conectar</span> conmigo
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/yerlis-dimas-puello/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://github.com/Yerlis24"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>

            </ul>
          </Col>
        </Row>
      </Container>
    </Container>

  );
}
export default Home2;

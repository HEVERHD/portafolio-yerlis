import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const hasVideo = !!props.videoPath || (!!props.demoLink && props.demoLink.endsWith(".mp4"));
  const videoSrc = props.videoPath || (props.demoLink?.endsWith(".mp4") ? props.demoLink : null);

  return (
    <>
      <Card className="project-card-view">
        <Card.Img variant="top" src={props.imgPath} alt="card-img" />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>
            {props.description}
          </Card.Text>

          {/* Botón GitHub / Blog */}
          {props.ghLink && (
            <Button variant="primary" href={props.ghLink} target="_blank">
              <BsGithub /> &nbsp;
              {props.isBlog ? "Blog" : "GitHub"}
            </Button>
          )}

          {"\n"}
          {"\n"}

          {hasVideo ? (
            <Button
              variant="primary"
              style={{ marginLeft: props.ghLink ? 10 : 0 }}
              onClick={() => setShow(true)}
            >
              <CgWebsite /> &nbsp; Demo
            </Button>
          ) : (
            !props.isBlog && props.demoLink && (
              <Button
                variant="primary"
                href={props.demoLink}
                target="_blank"
                style={{ marginLeft: props.ghLink ? 10 : 0 }}
              >
                <CgWebsite /> &nbsp; Demo
              </Button>
            )
          )}
        </Card.Body>
      </Card>

      {/* Modal de video */}
      {hasVideo && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          centered
          size="xl"
          fullscreen={fullscreen}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.title || "Demo"}</Modal.Title>
            <div className="ms-auto d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setFullscreen((f) => !f)}
              >
                {fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
              </Button>
            </div>
          </Modal.Header>
          <Modal.Body style={{ padding: 0 }}>
            <div style={{ width: "100%", background: "black" }}>
              <video
                src={videoSrc}
                controls
                autoPlay
                playsInline
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default ProjectCards;

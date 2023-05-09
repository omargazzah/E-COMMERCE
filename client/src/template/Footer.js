import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyle";
function Footer() {
  return (
    <footer className="mt-auto  bg-dark">
      <div className="container d-flex justify-content-center">
        <Box>
          <Container>
            <Row>
              <Column>
                <Heading>About Us</Heading>
                <FooterLink href="#">Mentions légales</FooterLink>
                <FooterLink href="#">Quality</FooterLink>
                <FooterLink href="#">FAQ</FooterLink>
              </Column>
              <Column>
                <Heading>Services</Heading>
                <FooterLink href="#">Writing</FooterLink>
                <FooterLink href="#">Internships</FooterLink>
                <FooterLink href="#">Coding</FooterLink>
                <FooterLink href="#">Teaching</FooterLink>
              </Column>
              <Column>
                <Heading>Contact Us</Heading>
                <FooterLink href="#">Sousse</FooterLink>
                <FooterLink href="#">Tunis</FooterLink>
                <FooterLink href="#">Sfax</FooterLink>
                <FooterLink href="#">Monastir</FooterLink>
              </Column>
              <Column>
                <Heading>Social Media</Heading>
                <FooterLink href="#">
                  <i className="fab fa-facebook-f">
                    <span style={{ marginLeft: "10px" }}>Facebook</span>
                  </i>
                </FooterLink>
                <FooterLink href="#">
                  <i className="fab fa-instagram">
                    <span style={{ marginLeft: "10px" }}>Instagram</span>
                  </i>
                </FooterLink>
                <FooterLink href="#">
                  <i className="fab fa-twitter">
                    <span style={{ marginLeft: "10px" }}>Twitter</span>
                  </i>
                </FooterLink>
                <FooterLink href="#">
                  <i className="fab fa-youtube">
                    <span style={{ marginLeft: "10px" }}>Youtube</span>
                  </i>
                </FooterLink>
              </Column>
            </Row>
          </Container>
        </Box>
      </div>
      <div style={{ textAlign: "center" }}>
        <span className="text-muted">Copyright &copy; RENTCAR 2022</span>
      </div>
    </footer>
  );
}

export default Footer;

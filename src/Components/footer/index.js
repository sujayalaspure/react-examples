import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Container>
      <a href="https://alaspuresujay.github.io/" target="_blank" rel="noopener noreferrer">
        Designed & Built by Sujay Alaspure
      </a>
      <Legal>
        The source code for this website is
        <a href="https://github.com/alaspuresujay/react-examples"> available on GitHub </a>
        under the
        <a href="http://opensource.org/licenses/mit-license.html"> MIT license.</a>
      </Legal>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1rem 0;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const Legal = styled.p`
  margin-top: 1rem;
  font-size: 0.6rem;
  opacity: 0.7;
  a {
    font-size: inherit;
    color: var(--accent);
    /* padding: 5; */
  }
`;

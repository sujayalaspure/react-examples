import React from "react"
import styled, { keyframes } from "styled-components"

function Footer() {
  return (
    <Container>
      <a href="https://sujayalaspure.github.io/" target="_blank" rel="noopener noreferrer">
        Designed & Built by Sujay Alaspure
      </a>
      <Legal>
        The source code for this website is
        <a href="https://github.com/sujayalaspure/react-examples"> available on GitHub </a>
        under the
        <a href="http://opensource.org/licenses/mit-license.html"> MIT license.</a>
      </Legal>
    </Container>
  )
}

export default Footer

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const Container = styled.div`
  position: fixed;
  /* top: 100%; */
  bottom: 0;
  width: 100%;
  padding: 1rem 0;
  background-color: #fdbcb4;
  display: flex;
  flex-direction: column;
  transform: translateY(80%);
  transition: transform 0.5s ease-in-out, background 0.5s ease-in-out;
  /* justify-content: center; */
  align-items: center;
  background: linear-gradient(
    252deg,
    #25221e,
    #8c1105,
    #f90c71,
    #f292ed,
    #f7c0ec,
    #caefd7,
    #a8e6cf,
    #dcedc1,
    #f9efd7,
    #f7d6bf,
    #f9b1ac,
    #f98ca7
  );
  background-size: 500% 500%;
  animation: ${gradientAnimation} 30s ease infinite;
  :hover {
    background: linear-gradient(252deg, #d3cce3, #e9e4f0, #c9d6ff);
    transform: translateY(0%);
  }
`

const Legal = styled.p`
  margin-top: 1rem;
  font-size: 0.6rem;
  opacity: 0.7;
  a {
    font-size: inherit;
    color: var(--accent);
    /* padding: 5; */
  }
`

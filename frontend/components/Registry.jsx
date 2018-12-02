import styled from "styled-components";
import colors from "../styles/colors";

const RegistryWrapper = styled.div`
  display: flex;
  color: ${colors.lightGreen};
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 280px;

  img {
    margin-top: 2rem;
    max-width: 25%;
    max-height: 15%;
    @media only screen and (max-width: 600px) {
      max-width: 50%;
      max-height: 25%;
    }
  }
`;

export default function Registry() {
  return (
    <RegistryWrapper>
      <h1>We are registered at...</h1>
      <br />
      <a target="_blank" href="http://tgt.gifts/JJGonzalesWedding">
        <img src="../static/target.png" />
      </a>
      <a
        target="_blank"
        href="https://www.amazon.com/wedding/share/JJGonzalesWedding"
      >
        <img src="../static/amazon.png" />
      </a>
      <a
        target="_blank"
        href="https://www.williams-sonoma.com/registry/lzf2wm9wpb/registry-list.html"
      >
        <img src="../static/william-sonoma.png" />
      </a>
    </RegistryWrapper>
  );
}

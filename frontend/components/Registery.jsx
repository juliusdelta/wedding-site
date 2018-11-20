import styled from 'styled-components';
import colors from '../styles/colors';

const RegistryWrapper = styled.div`
  display: flex;
  color: ${colors.lightGreen};
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;

  img {
    margin-top: 2rem;
    max-width: 25%;
    max-height: 15%;
  }
`;

export default function Registry() {
  return (
    <RegistryWrapper>
      <h1>We are registered at...</h1>
      <br />
      <img src="../static/amazon.png" />
      <img src="../static/william-sonoma.png" />
      <img src="../static/target.png" />
    </RegistryWrapper>
  )
}
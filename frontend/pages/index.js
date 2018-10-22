import styled from 'styled-components'
import Flowers from '../components/Flowers';
import colors from '../styles/colors'

const HomeWrapper = styled.div`
  width: 100vw;
  height: 50rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const DetailsWrapper = styled.div`
  width: 100vw;
  margin-top: 0;
  height: 50rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const H1 = styled.div`
  font-size: 2rem;
  color: ${colors.lightGreen};
`
const Home = () => (
  <div>
    <HomeWrapper>
      <H1>Jonathan & Julie</H1>
      <H1>Gonzales</H1>
    </HomeWrapper>
    <DetailsWrapper>
      <H1>Janurary 12th, 2019</H1>
    </DetailsWrapper>
    <Flowers />
  </div>
);

export default Home;
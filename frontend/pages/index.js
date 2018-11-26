import styled from 'styled-components';
import ScrollAnim from 'rc-scroll-anim';
import colors from '../styles/colors';
import Flowers from '../components/Flowers';
import MainInfo from '../components/MainInfo';
import Photos from '../components/Photos';
import Reservation from '../components/Reservation';
import NewReservation from '../components/NewReservation';
import Registry from '../components/Registery';

const MainWrapper = styled.div`
  width: 100vw;
  max-width: 100%;
`;

const Copy = styled.div`
  height: 35rem;
  color: ${colors.yellow};
  font-size: 1rem;
  margin-top: 25rem;
  margin-bottom: 25rem;
  text-align: center;
`;

const ScrollParallax = ScrollAnim.Parallax;
const ScrollElement = ScrollAnim.Element;

const Home = () => (
  <React.Fragment>
    <Flowers />
    <MainWrapper>
      <MainInfo />
      <ScrollElement style={{ height: '100%' }}>
        <ScrollParallax
          animation={{ translateY: 0, opacity: 1, ease: 'linear' }}
          style={{ transform: 'translateY(380px) scale(1)', opacity: 0, color: '#fff' }}>
        </ScrollParallax>
        <ScrollParallax
          animation={{ translateY: 0, opacity: 1, ease: 'linear' }}
          style={{ transform: 'translateY(380px) scale(1)', opacity: 0, color: '#fff' }}>
          <Photos />
        </ScrollParallax>
        <ScrollParallax
          animation={{ translateY: 0, opacity: 1, ease: 'linear' }}
          style={{ transform: 'translateY(380px) scale(1)', opacity: 0, color: '#fff' }}>
          <NewReservation />
        </ScrollParallax>
        <ScrollParallax
          animation={{ translateY: 0, opacity: 1, ease: 'linear' }}
          style={{ transform: 'translateY(380px) scale(1)', opacity: 0, color: '#fff' }}>
          <Registry />
        </ScrollParallax>
      </ScrollElement>
      <Copy>
        Thank you for making our special day
      </Copy>
    </MainWrapper>
  </React.Fragment>
);

export default Home;
import styled from 'styled-components';
import { Spring } from 'react-spring';

const ImageWrapper = styled.div`
  img {
    max-width: 40%;
    max-height: 50%;
    position: fixed;
    z-index: 1;

    @media only screen and (max-width: 600px) {
      max-width: 90%;
      max-height: 80%;
    }
  }

  .bottom-left {
    bottom: 0%;
    left: 0;
  }

  .bottom-right {
    bottom: 0%;
    right: 0;
  }

  .top-left {
    top: 0%;
    left: 0;
  }

  .top-right {
    top: 0%;
    right: 0;
  }
`;

export default class Flowers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageWrapper>
        <Spring config={{ delay: 200, tension: 100, friction: 100 }} from={{ transform: 'translate(0px, 0px)' }} to={{ transform: 'translate(-120px, 120px)' }}>
          {props => (
            <img style={props} className="bottom-left" src="../static/flowers-bottomleft.png" />
          )}
        </Spring>
        <Spring config={{ delay: 200, tension: 100, friction: 100 }} from={{ transform: 'translate(0px, 0px)' }} to={{ transform: 'translate(120px, 120px)' }}>
          {props => (
            <img style={props} className="bottom-right" src="../static/flowers-bottomright.png" />
          )}
        </Spring>
        <Spring config={{ delay: 200, tension: 100, friction: 100 }} from={{ transform: 'translate(0px, 0px)' }} to={{ transform: 'translate(-120px, -120px)' }}>
          {props => (
            <img style={props} className="top-left" src="../static/flowers-topleft.png" />
          )}
        </Spring>
        <Spring config={{ delay: 200, tension: 100, friction: 100 }} from={{ transform: 'translate(0px, 0px)' }} to={{ transform: 'translate(120px, -120px)' }}>
          {props => (
            <img style={props} className="top-right" src="../static/flowers-topright.png" />
          )}
        </Spring>
      </ImageWrapper>
    );
  }
}
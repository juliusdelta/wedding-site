import styled from 'styled-components';

const ImageWrapper = styled.div`
  .bottom-left {
    max-width: 40%;
    max-height: 50%;
    position: fixed;
    bottom: 0%;
    left: 0;
  }
  .bottom-right {
    max-width: 40%;
    max-height: 50%;
    position: fixed;
    bottom: 0%;
    right: 0;
  }
  .top-left {
    max-width: 40%;
    max-height: 50%;
    position: fixed;
    top: 0%;
    left: 0;
  }
  .top-right {
    max-width: 40%;
    max-height: 50%;
    position: fixed;
    top: 0%;
    right: 0;
  }
`
export default class Flowers extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    e.preventDefault();

    const scale = (num, in_min, in_max, out_min, out_max) => {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    // 0...527 offsetY value
    // translate top right translate(120px, -120px)
    // translate top left translate(-120px, -120px)
    // translate bottom left translate(-120px, 120px)
    // translate bottom right translate(120px, 120px)

  }

  render() {
    return (
      <ImageWrapper>
        <img className="bottom-left" src="../static/flowers-bottomleft.png" />
        <img className="bottom-right" src="../static/flowers-bottomright.png" />
        <img className="top-left" src="../static/flowers-topleft.png" />
        <img className="top-right" src="../static/flowers-topright.png" />
      </ImageWrapper>
    );
  }
}
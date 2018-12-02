import React, { Component } from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';
import Countdown from './Countdown';
import colors from '../styles/colors';

const HomeWrapper = styled.div`
  margin-top: 25%;
  padding-top: 15%;
  height: 10rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    margin-top: 50%;
    padding-top: 25%;
  }
`;

const H1 = styled.div`
  font-size: 2rem;
  color: ${colors.lightGreen};
`

export default class MainInfo extends Component {
  onClick = () => {
    window.scroll({}, 2500);
  }
  render() {
    return (
      <HomeWrapper>
        <Spring config={{ delay: 200, tension: 140, friction: 20 }} from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => <H1 style={props}>Jonathan Gonzales & Julie Morrison</H1>}
        </Spring>
        <Spring config={{ delay: 300, tension: 140, friction: 20 }} from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => <H1 style={{ ...props, color: colors.yellow }}>Janurary 12th, 2019, 5:00pm</H1>}
        </Spring>
        <Spring config={{ delay: 300, tension: 140, friction: 20 }} from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => <p style={{ ...props, color: colors.yellow, marginTop: '4px', marginBottom: '4px' }}>Hidden Pines Chapel, Hurst, Texas</p>}
        </Spring>
        <Spring config={{ delay: 500, tension: 140, friction: 20 }} from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => <div style={props}>
            <Countdown date={new Date(2019, 0, 12, 17)} />
          </div>}
        </Spring>
      </HomeWrapper>
    )
  }
}
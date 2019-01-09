import React, { Component } from "react";
import styled from 'styled-components';
import colors from'../styles/colors';

const TimeLineWrapper = styled.div`
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

const H1 = styled.h1`
  font-size: 1rem;
  color: ${colors.lightGreen};
  span {
    color: ${colors.yellow};
  }
`;

export default class TimeLine extends Component {
  render() {
    return (
      <TimeLineWrapper>
	<H1><span>5:00pm - 5:30pm</span> Ceremony</H1>
	<H1><span>5:30pm - 6:00pm</span> Cocktail Hour</H1>
	<H1><span>6:00pm - 10:00pm</span> Reception (at same location)</H1>
      </TimeLineWrapper>
    );
  }
}

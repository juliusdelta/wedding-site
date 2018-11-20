import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';


const PictureWrapper = styled.div`
  margin-top: 10rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    margin-top: 10%;
  }

  img {
    border: 50px solid ${colors.yellow};
    max-width: 80%;
    max-height: 100%;
    right: 0;
  }
`;

export default function Photos() {
  return (
    <PictureWrapper>
      <img src="../static/img1.jpg" />
    </PictureWrapper>
  )
}
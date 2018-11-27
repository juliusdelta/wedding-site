import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';
import colors from '../styles/colors';

const ErrorWrapper = styled.div`
  border: 2px solid ${colors.yellow};
  padding: 1rem 1rem;
  font-size: .7rem;
  margin-top: 1rem;
  color: red;
`;

export default function Error(props) {
  const error = props.errorMessage;
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {props =>
        <ErrorWrapper style={props}>
          {error}
        </ErrorWrapper>
      }
    </Spring>
  );
}


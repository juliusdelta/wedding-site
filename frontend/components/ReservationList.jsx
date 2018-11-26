import React, { Component } from "react";
import styled from "styled-components";
import colors from "../styles/colors";

const CheckLabel = styled.div`
  margin-top: 2rem;
  background-color: ${colors.yellow};
  color: ${colors.white};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  @media only screen and (max-width: 600px) {
    font-size: 0.8rem;
  }

  p {
    margin-left: 1rem;
  }

  input {
    margin-left: 5%;
    background-color: ${colors.white};
  }
`;

export default function ResrvationList(props) {
  const { person, handleAccept, handleDecline } = props;
  return (
    <CheckLabel>
        <input type="radio" value="isAccepting" label={`${person.name} is able to attend`} />
        <input type="radio" value="isDeclining" label={`${person.name} is not able to attend`} />
      {/* <input
        key={person.firstName}
        type="checkbox"
        id={person.firstName}
        name="accepted"
        disabled={person.reserved}
        onChange={handleAccept(person.id)}
      />
      <input
        type="checkbox"
        id={person.firstName}
        name="declined"
        disabled={person.reserved}
        onChange={handleDecline(person.id)}
      /> */}
      <span />
      <p>
        {person.firstName} {person.lastName}
        {person.reserved ? " has already reserved their spot" : null}
      </p>
    </CheckLabel>
  );
}

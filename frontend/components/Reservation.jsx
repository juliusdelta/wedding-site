import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

const H1 = styled.div`
  font-size: 2rem;
  color: ${colors.lightGreen};
`
const ReservationWrapper = styled.div`
  height: 35rem;
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colors.yellow};
  text-align: center;

  form {
    width: 50%;
    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }

  label {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    width: 100%;

    input {
      border: none;
      outline: none;
      font-size: 1rem;
      margin-top: 15px;
      text-align: center;
      color: ${colors.darkGreen};
      background-color: ${colors.white};
      border-bottom: 3px solid ${colors.yellow};
      width: 50%;
      ::inner-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
      }
      :focus {
        border: none;
        border-bottom: 3px solid ${colors.lightGreen};
        transition: border-bottom 500ms ease-in;
      }
    }
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const CheckLabel = styled.div`
  margin-top: 2rem;
  background-color: ${colors.yellow};
  color: ${colors.white};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  @media only screen and (max-width: 600px) {
    font-size: .8rem;
  }
  
  p {
    margin-left: 1rem;
  }

  input {
    margin-left: 5%;
    background-color: ${colors.white};
  }
`;

export default class Reservation extends Component {
  state = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    family: [
      {
        firstName: 'Julie',
        lastName: 'Gonzales',
        phoneNumber: '8177267945'
      },
      {
        firstName: 'Celeste',
        lastName: 'Gonzales',
        phoneNumber: '8177267945'
      }
    ]
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <ReservationWrapper>
        <H1>Make Your Resrvation</H1>
        <form>
          <label htmlFor="firstName">
            First Name
              <input type="text" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleChange} required />
          </label>
          <label htmlFor="lastName">
            Last Name
              <input type="text" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleChange} required />
          </label>
          <label htmlFor="phoneNumber">
            Phone Number
              <input type="number" id="phoneNumber" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} required />
          </label>
        </form>
        <form>
          {this.state.family.map(person => (
            <CheckLabel key={person.name}>
              <input type="checkbox" id={person.name} name={person.name} value={person.name}/>
              <span className="checkmark"></span>
              <p>{person.firstName} {person.lastName} will be attending with me.</p>
            </CheckLabel>
          ))}
        </form>
      </ReservationWrapper>
    );
  }
}
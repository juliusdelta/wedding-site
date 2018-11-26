import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import Input from "./Input";
import ReservationList from "./ReservationList";
import colors from "../styles/colors";

const H1 = styled.div`
  font-size: 2rem;
  color: ${colors.lightGreen};
`;
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

const Button = styled.button`
  border: none;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: ${colors.lightGreen};
  border-radius: 5%;
  color: ${colors.white};
  cursor: pointer;
  :hover {
    color: ${colors.yellow};
  }
`;

const GET_FAMILY_QUERY = gql`
  query GET_FAMILY_QUERY(
    $firstName: String!
    $lastName: String!
    $phoneNumber: String
  ) {
    persons(
      where: {
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
      }
    ) {
      id
      firstName
      lastName
      reserved
      reservedAt
      family {
        id
        members {
          id
          firstName
          lastName
          reserved
          reservedAt
        }
      }
    }
  }
`;

const UPDATE_PERSON_MUTATION = gql`
  mutation UPDATE_PERSON_MUTATION(
    $id: ID!
    $date: DateTime!
    $email: String
    $reserved: Boolean
    $phoneNumber: String
  ) {
    updatePerson(
      id: $id
      reserved: $reserved
      reservedAt: $date
      email: $email
      phoneNumber: $phoneNumber
    ) {
      firstName
      lastName
      id
    }
  }
`;

export default class Reservation extends Component {
  state = {
    firstName: "jonathan",
    lastName: "gonzales",
    phoneNumber: "8177347453",
    email: "jd_gonzales@icloud.com",
    family: [],
    currentUserId: null,
    currentUserReserved: false,
    idsToUpdate: [],
    idsAccepted: [],
    idsDeclined: [],
    loading: false,
    submitted: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  };

  handleAcceptCheckChange = (id) => {
    const currentIds = this.state.idsAccepted;
    currentIds.push(id);
    const declinedIds = this.state.idsDeclined;
    const updatedDeclinedIds = declinedIds.filter(declinedId => declinedId !== id);
    this.setState({ idsAccepted: currentIds, idsDeclined: updatedDeclinedIds });
  };

  handleDeclineCheckChange = (id) => {
    const currentIds = this.state.idsDeclined;
    currentIds.push(id);
    const acceptedIds = this.state.idsAccepted
    const updatedAcceptedIds = acceptedIds.filter(acceptedId => acceptedId !== id)
    this.setState({ idsAccepted: updatedAcceptedIds, idsDeclined: currentIds });
  };

  onSubmit = e => {
    e.preventDefault;
  };

  buttonText = () => {
    if (this.state.currentUserReserved) {
      return "Reserve Their Spot";
    }
    if (this.state.idsToUpdate.length > 1) {
      return "Reserve Our Spot";
    }
    return "Reserve My Spot";
  };

  informationText = () => {
    if (this.state.family.length && this.state.currentUserReserved) {
      return `You can reserve for up to ${this.state.family.length -
        1} family members or guests`;
    }

    if (this.state.family.length > 1 && !this.state.currentUserReserved) {
      return `You can reserve for you and ${this.state.family.length -
        1} family members or guests.`;
    }

    return "You can reserve 1 spot for yourself";
  };

  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <ReservationWrapper>
              {!this.state.submitted && (
                <Fragment>
                  <H1>Find Your Resrvation</H1>
                  <form
                    onSubmit={async e => {
                      e.preventDefault();
                      const { firstName, lastName, phoneNumber } = this.state;
                      const { data, loading, error } = await client.query({
                        query: GET_FAMILY_QUERY,
                        variables: { firstName, lastName, phoneNumber },
                        fetchPolicy: "network-only"
                      });
                      const { id, reserved, family } = data.persons[0];
                      this.setState({
                        currentUserId: id,
                        currentUserReserved: reserved,
                        loading: loading,
                        family: family.members
                      });
                      if (!reserved) {
                        this.setState({ idsToUpdate: [id] });
                      }
                    }}
                  >
                    <Input
                      htmlFor="firstName"
                      id="firstName"
                      name="firstName"
                      disabled={this.state.loading || this.state.submitted}
                      value={this.state.firstName}
                      text="First Name"
                      onChange={this.handleChange}
                      required
                    />
                    <Input
                      htmlFor="lastName"
                      id="lastName"
                      name="lastName"
                      disabled={this.state.loading || this.state.submitted}
                      value={this.state.lastName}
                      text="Last Name"
                      onChange={this.handleChange}
                      required
                    />
                    <Input
                      htmlFor="phoneNumber"
                      id="phoneNumber"
                      name="phoneNumber"
                      disabled={this.state.loading || this.state.submitted}
                      value={this.state.phoneNumber}
                      text="Phone Number"
                      onChange={this.handleChange}
                    />
                    <Input
                      htmlFor="Email"
                      id="email"
                      name="email"
                      disabled={this.state.loading || this.state.submitted}
                      value={this.state.email}
                      text="Email"
                      onChange={this.handleChange}
                    />
                    <Button type="submit">Find Reservation</Button>
                  </form>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      this.state.idsToUpdate.forEach(async id => {
                        const date = new Date();
                        const { data, loading, error } = await client.mutate({
                          mutation: UPDATE_PERSON_MUTATION,
                          variables: { id, date }
                        });
                      });
                      this.setState({
                        submitted: true,
                        family: [],
                        idsToUpdate: [],
                        firstName: "",
                        lastname: "",
                        phoneNumber: "",
                        email: ""
                      });
                    }}
                  >
                    {!!this.state.currentUserId && this.informationText()}
                    {this.state.currentUserReserved ? (
                      <p>
                        It looks like you've already made a reservation for
                        yourself. You may continue to reserve another guest
                      </p>
                    ) : null}
                    {this.state.family &&
                      this.state.family.map(person => (
                        <ReservationList
                          key={person.firstName}
                          person={person}
                          handleAccept={this.handleAcceptCheckChange}
                          handleDecline={this.handleDeclineCheckChange}
                        />
                      ))}
                    {!!this.state.idsToUpdate.length && (
                      <Button type="submit">{this.buttonText()}</Button>
                    )}
                  </form>
                </Fragment>
              )}
              {this.state.submitted && (
                <Fragment>
                  <H1>Thank you for reserving and</H1>
                  <H1>being apart of our special day. 👰🤵</H1>
                </Fragment>
              )}
            </ReservationWrapper>
          );
        }}
      </ApolloConsumer>
    );
  }
}

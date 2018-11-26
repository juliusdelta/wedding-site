import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { ReadioGroup, RadioButton, RadioGroup } from "react-radio-buttons";
import Input from "./Input";
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
    $submitted: Boolean
  ) {
    updatePerson(
      id: $id
      reserved: $reserved
      reservedAt: $date
      email: $email
      phoneNumber: $phoneNumber
      submitted: $submitted
    ) {
      firstName
      lastName
      id
    }
  }
`;

export default class NewReservation extends Component {
  state = {
    submitted: false,
    error: null,
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    family: [],
    acceptedIds: [],
    declinedIds: []
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  };

  handleRadio = (id, e) => {
    const { acceptedIds, declinedIds } = this.state;
    if (e == "accept" && !acceptedIds.includes(id)) {
      acceptedIds.push(id);
      const declined = declinedIds.filter(declinedId => declinedId !== id);
      this.setState({ acceptedIds, declinedIds: declined });
    }

    if (e == "decline" && !declinedIds.includes(id)) {
      declinedIds.push(id);
      const accepted = acceptedIds.filter(acceptedId => acceptedId !== id);
      this.setState({ acceptedIds: accepted, declinedIds });
    }
  };

  nameDisplay = person => {
    if (person.firstName == "guest") {
      return `Guest of ${this.state.firstName}`;
    }

    return `${person.firstName} ${person.lastName}`;
  };

  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <ReservationWrapper>
              {!this.state.submitted && (
                <Fragment>
                  <H1>Find Your Reservation</H1>
                  <form
                    onSubmit={async e => {
                      e.preventDefault();
                      const { firstName, lastName } = this.state;
                      const { data, loading, error } = await client.query({
                        query: GET_FAMILY_QUERY,
                        variables: { firstName, lastName },
                        fetchPolicy: "network-only"
                      });
                      const { id, reserved, family } = data.persons[0];
                      this.setState({ family: family.members });
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
                      const date = new Date();
                      const submitted = true;
                      this.state.declinedIds.forEach(async id => {
                        const reserved = false;
                        const { data, loading, error } = await client.mutate({
                          mutation: UPDATE_PERSON_MUTATION,
                          variables: { id, date, reserved, submitted }
                        });
                        if (error) {
                          this.setState({ error });
                        }
                      });
                      this.state.acceptedIds.forEach(async id => {
                        const reserved = true;
                        const { data, loading, error } = await client.mutate({
                          mutation: UPDATE_PERSON_MUTATION,
                          variables: { id, date, reserved, submitted }
                        });
                        if (error) {
                          this.setState({ error });
                        }
                      });
                      this.setState({ submitted: true });
                    }}
                  >
                    {this.state.family.length > 0 &&
                      this.state.family.map(person => (
                        <label key={person.id}>
                          <p style={{ fontWeight: "bold" }}>
                            {this.nameDisplay(person)}
                          </p>
                          {person.reserved && (
                            <p style={{ color: colors.darkGreen }}>
                              {person.firstName} has already reserved their
                              spot.
                            </p>
                          )}
                          <RadioGroup
                            onChange={e => this.handleRadio(person.id, e)}
                          >
                            <RadioButton
                              disabled={person.reserved}
                              rootColor={colors.yellow}
                              pointColor={colors.lightGreen}
                              value="accept"
                              padding={5}
                              disabledColor="#C4C3B9"
                            >
                              Will be able to attend
                            </RadioButton>
                            <RadioButton
                              disabled={person.reserved}
                              rootColor={colors.yellow}
                              pointColor={colors.lightGreen}
                              value="decline"
                              padding={5}
                              disabledColor="#C4C3B9"
                            >
                              Will not be able to attend
                            </RadioButton>
                          </RadioGroup>
                        </label>
                      ))}
                    {this.state.family.some(
                      person => person.reserved == false
                    ) && <Button type="submit">Submit Reservation</Button>}
                    <p style={{ fontSize: ".7rem", color: colors.lightGreen }}>
                      For issues, incorrect information, or questions please
                      contact{" "}
                      <a
                        style={{ color: "inherit", textDecoration: "none" }}
                        href="mailto:jonathan@gonzaleswedding.com"
                      >
                        jonathan@gonzaleswedding.com
                      </a>
                      .
                    </p>
                  </form>
                </Fragment>
              )}
              {this.state.submitted && (
                <Fragment>
                  <H1>Thanks! You've successfully submitted your response!</H1>
                  <H1>👰🤵</H1>
                </Fragment>
              )}
            </ReservationWrapper>
          );
        }}
      </ApolloConsumer>
    );
  }
}

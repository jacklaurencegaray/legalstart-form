import React, { Component } from "react"
import styled, { css } from "styled-components"
import { Formik, Field, ErrorMessage } from "formik"
import isInvalidPassport from "../helpers/passportValidator"
import { isEmail, isEmpty } from "validator"
import { isEmpty as isObjectEmpty } from "lodash"
import Tooltip from "./Tooltip"

const validators = {
  email: value =>
    !isEmail(value)
      ? "The email address provided is invalid."
      : isEmpty(value, { ignore_whitespace: true })
      ? "You must supply an email."
      : undefined,
  firstName: value =>
    isEmpty(value, { ignore_whitespace: true })
      ? "You must supply a first name."
      : value.length < 2
      ? "The first name is too short."
      : undefined,
  lastName: value =>
    isEmpty(value, { ignore_whitespace: true })
      ? "You must supply a last name."
      : value.length < 2
      ? "The last name is too short"
      : undefined,
  passportId: (passportId, country) => {
    console.log(passportId + " from ", country)
    if (isEmpty(passportId, { ignore_whitespace: true })) {
      return "You must supply a passport."
    }
    let err = isInvalidPassport(passportId, country)
    return err
  },
  title: value =>
    value !== "mr" && value !== "ms" && value !== "mrs"
      ? "Invalid name title."
      : undefined,
  country: value =>
    value !== "brazil" && value !== "france" ? "Invalid country." : undefined
}

class Form extends Component {
  render() {
    return (
      <StyledForm>
        <Title>Sign up with LegalStart</Title>
        <Fields>
          <Formik
            initialValues={{
              title: "mr",
              firstName: "",
              lastName: "",
              passportId: "",
              email: "",
              country: "france"
            }}
            render={({
              isSubmitting,
              errors,
              handleSubmit,
              values,
              touched
            }) => (
              <>
                <Hint>
                  {(touched.passportId &&
                    errors.passportId &&
                    (values.country === "france" &&
                      "A valid passport ID contains 9 digits of unambiguous letters or numbers.")) ||
                    (values.country === "brazil" &&
                      "A valid passport ID contains 8 digits whose first 2 are unambiguous letters and the rest are numbers.")}
                </Hint>
                <form onSubmit={handleSubmit}>
                  <FirstRow>
                    <FieldGroup>
                      <Label>Title</Label>
                      <StyledField
                        component="select"
                        name="title"
                        className="extended"
                        validate={validators.title}
                        haserrors={touched.title && errors.title}
                      >
                        <option value="ms">Ms.</option>
                        <option value="mr">Mr.</option>
                        <option value="mrs">Mrs.</option>
                      </StyledField>
                    </FieldGroup>
                    <FieldGroup>
                      <Label>First Name</Label>
                      <StyledField
                        component="input"
                        name="firstName"
                        haserrors={touched.firstName && errors.firstName}
                        validate={validators.firstName}
                        placeholder="First Name"
                      />
                      <ErrorMessageContainer>
                        <ErrorMessage name="firstName" />
                      </ErrorMessageContainer>
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Last Name</Label>
                      <StyledField
                        component="input"
                        name="lastName"
                        haserrors={touched.lastName && errors.lastName}
                        validate={validators.lastName}
                        placeholder="Last Name"
                      />
                      <ErrorMessageContainer>
                        <ErrorMessage name="lastName" />
                      </ErrorMessageContainer>
                    </FieldGroup>
                  </FirstRow>
                  <SecondRow>
                    <FieldGroup>
                      <Label>Country</Label>
                      <StyledField
                        component="select"
                        name="country"
                        className="extended"
                        haserrors={touched.country && errors.country}
                        validate={validators.country}
                      >
                        <option value="france">France</option>
                        <option value="brazil">Brazil</option>
                      </StyledField>
                      <ErrorMessageContainer>
                        <ErrorMessage name="country" />
                      </ErrorMessageContainer>
                    </FieldGroup>
                    <FieldGroup>
                      <Label>
                        Passport ID
                        <Tooltip>
                          The following are unambiguous letters: C, F, G, H, J,
                          K, L, M, N, P, R, T, V, W, X, Y, Z
                        </Tooltip>
                      </Label>
                      <StyledField
                        component="input"
                        name="passportId"
                        className="uppercase"
                        placeholder={
                          values.country === "brazil" ? "XXXXXXXXX" : "XXXXXXXX"
                        }
                        validate={() =>
                          validators.passportId(
                            values.passportId,
                            values.country
                          )
                        }
                        haserrors={touched.passportId && errors.passportId}
                      />
                      <ErrorMessageContainer>
                        <ErrorMessage name="passportId" />
                      </ErrorMessageContainer>
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Email Address</Label>
                      <StyledField
                        component="input"
                        name="email"
                        validate={validators.email}
                        haserrors={touched.email && errors.email}
                        placeholder="example@email.com"
                      />
                      <ErrorMessageContainer>
                        <ErrorMessage name="email" />
                      </ErrorMessageContainer>
                    </FieldGroup>
                  </SecondRow>
                  <ThirdRow>
                    <StyledButton
                      type="submit"
                      isDisabled={!isObjectEmpty(errors) || isSubmitting}
                    >
                      {isSubmitting ? "Done!" : "Register"}
                    </StyledButton>
                  </ThirdRow>
                </form>
              </>
            )}
          />
        </Fields>
      </StyledForm>
    )
  }
}

export default Form

const ErrorMessageContainer = styled.span`
  display: block;
  font-size: 10px !important;
  color: red;
`

const StyledButton = styled.button`
  background: #6362fe;
  border-radius: 8px;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: -0.21px;
  text-align: center;
  width: 140px;
  height: 50px;
  font-weight: bold;
  font-family: inherit;
  transition: 1s all ease;
  cursor: pointer;

  ${props =>
    props.isDisabled &&
    css`
      background-color: #9191ff;
    `}

  @media (max-width: 686px) {
    width: 100%;
  }

  &:hover {
    background: #9191ff;
  }

  &:focus {
    outline: none;
    border: 0;
  }
`

const ThirdRow = styled.div`
  margin-top: 25px;
  text-align: right;
`

const SecondRow = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: minmax(100px, 10fr) minmax(120px, 12fr) minmax(
      200px,
      20fr
    );
  grid-column-gap: 25px;

  @media (max-width: 686px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-row-gap: 15px;
  }
`

const StyledField = styled(Field)`
  background: #fdfdfd;
  border-radius: 8px;
  height: 40px;
  border: 0;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.17);
  font-family: inherit;
  font-size: 14px;
  padding: 0 12px;
  width: calc(100% - 24px);
  margin: 2px;
  box-sizing: border-box;

  ${props =>
    props.haserrors &&
    css`
      border: 2px solid red;
    `}

  &.uppercase {
    text-transform: uppercase;
  }

  &.extended {
    width: 100%;
  }

  &:focus {
    outline: none;
    border: 2px solid #252a62;
  }

  @media (max-width: 686px) {
    width: 100%;
  }
`

const Label = styled.div`
  padding-bottom: 5px;
  letter-spacing: -0.1px;
  font-size: 14px;
`

const FieldGroup = styled.div``

const FirstRow = styled.div`
  display: grid;
  grid-template-columns: minmax(80px, 8fr) minmax(170px, 17fr) minmax(
      170px,
      17fr
    );
  grid-column-gap: 25px;

  @media (max-width: 686px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-row-gap: 15px;
  }
`

const Fields = styled.div`
  font-weight: bold;
  font-size: 16px;
`

const Hint = styled.div`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.18px;
  margin-bottom: 50px;
  margin-top: 5px;
  color: rgba(32, 42, 99, 0.6);
`

const Title = styled.span`
  font-weight: bold;
  font-size: 24px;
  letter-spacing: -0.31px;
  margin-bottom: 24px;
`

const StyledForm = styled.div`
  padding: 70px 60px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  background-color: #eeefff;

  @media (max-width: 980px) {
    border-top-right-radius: 0px;
    border-bottom-left-radius: 12px;
  }

  @media (max-width: 686px) {
    padding: 50px 40px;
  }
`

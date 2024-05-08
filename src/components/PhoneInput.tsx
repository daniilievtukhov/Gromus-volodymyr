import {
  createPolymorphicComponent,
  Divider,
  Input,
  InputProps,
  InputWrapperProps,
  PolymorphicComponentProps,
  Select,
  Stack,
} from "@mantine/core";
import { IMaskInput } from "react-imask";
import styled from "styled-components";
import { countries } from 'countries-list';
import { useState } from "react";
import create from 'zustand';

export const PhoneInput = ({

  label,
  error,
  ...rest
}: PolymorphicComponentProps<"input", InputProps> & InputWrapperProps) => {
  const countryOptions = Object.values(countries).map(country => ({
    name: country.name,
    dialCode: `+${country.phone}`,
  }));

  const [selectedCountry, setSelectedCountry] = useState({ name: countryOptions[0].name, dialCode: countryOptions[0].dialCode });
  const handleCountryChange = (country: any) => {
    const foundCountry = countryOptions.find(c => c.name === country);
    const code = foundCountry ? foundCountry.dialCode : '';
    localStorage.setItem('selectedCountry', code);
    setSelectedCountry({ name: country, dialCode: code });
  };

  return (
    <Input.Wrapper label={label} error={error}>
      <Wrapper>
        <StyledSelect tabIndex={-1} data={countryOptions.map(country => country.name)} onChange={handleCountryChange} />
        <Divider mx={16} />
        <StyledInput
          leftSection={selectedCountry.dialCode}
          placeholder="(00) 000-0000"
          mask="(00) 000-0000"
          component={IMaskInput}
          {...rest}
        />
      </Wrapper>
    </Input.Wrapper>
  );
};

const Wrapper = styled(Stack)`
  gap: 0;
  background-color: var(--mantine-color-dark-7);
  border: calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-dark-4);
  margin-bottom: calc(var(--mantine-spacing-xs) / 2);
`;

const StyledInput = createPolymorphicComponent<"input", InputProps>(styled(Input).attrs({
  variant: "unstyled",
  size: "lg",
})`
  margin-bottom: 0;

  .mantine-Input-input {
    padding-left: 48px;
    padding-right: calc(var(--input-height) / 3);
  }
`);

const StyledSelect = styled(Select)`
  .mantine-Input-input {
    border: none;
    border-radius: 0;
  }
`;


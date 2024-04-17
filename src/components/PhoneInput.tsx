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

export const PhoneInput = ({
  label,
  error,
  ...rest
}: PolymorphicComponentProps<"input", InputProps> & InputWrapperProps) => {
  return (
    <Input.Wrapper label={label} error={error}>
      <Wrapper>
        <StyledSelect tabIndex={-1} data={["Canada", "USA"]} />
        <Divider mx={16} />
        <StyledInput
          leftSection="+1"
          placeholder="(000) 000-0000"
          mask="(000) 000-0000"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
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

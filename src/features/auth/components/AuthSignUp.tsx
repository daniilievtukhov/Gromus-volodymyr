import {
  Button,
  Card,
  Checkbox,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";

import { PhoneInput } from "../../../components/PhoneInput";
import { Environment } from "../../../core/environment";
import { ApiAuth } from "../../../requests/account/auth";
import { notify } from "../../notification";
import { useAuthStore } from "../store/auth";
import { IAuthState } from "../types";
import { Info } from "./Info";

interface IProps {
  onChange: (state: IAuthState) => void;
}

export const AuthSignUp = ({ onChange }: IProps) => {
  const setUserName = useAuthStore((state) => state.setUserName);

  const mutation = useMutation({
    mutationFn: (data: IForm) =>
      ApiAuth.signUp({
        ...data,
        phoneNumber: data.phone.replace(/\D/g, ""),
        returnUrl: Environment.feDomain,
      }),
    onSuccess: async (_, form) => {
      setUserName(form.email);
      onChange("confirm");
    },
    onError: (e: { response: { data: string } }) => {
      notify.error(e.response.data);
    },
  });
  const form = useForm({
    initialValues: initialForm,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        if (value.length < 6) return "Must have at least 6 letters";
        if (!/[^a-zA-Z\d\s:]/.test(value)) return "Must have at least 1 special character";
        if (!/\d/.test(value)) return "Must have at least 1 digit";
        if (!/(?=.*[A-Z])/.test(value)) return "Must have at least 1 capital letter";

        return null;
      },
      passwordConfirm: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
      firstName: (value) => (value.length < 2 ? "Must have at least 2 letters" : null),
      lastName: (value) => (value.length < 2 ? "Must have at least 2 letters" : null),
      phone: (value) => (value.replace(/\D/g, "").length !== 10 ? "Invalid phone" : null),
      termsOfService: (value) => (value === false ? "Required" : null),
    },
  });

  return (
    <Card py={25} px={20} radius={0}>
      <form onSubmit={form.onSubmit((v) => mutation.mutate(v))}>
        <Stack gap={16}>
          <Info
            title="Adventure starts here 🚀"
            description="Make your app management easy and fun!"
            onClose={() => onChange("methods")}
          />
          <TextInput
            label="Email"
            placeholder="john@example.com"
            size="lg"
            {...form.getInputProps("email")}
          />
          <PasswordInput label="Password" size="lg" {...form.getInputProps("password")} />
          <PasswordInput
            label="Password confirm"
            size="lg"
            {...form.getInputProps("passwordConfirm")}
          />
          <Group wrap="nowrap" align="start">
            <TextInput
              label="First name"
              placeholder="John"
              size="lg"
              wrapperProps={{ style: { width: "100%" } }}
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Last name"
              placeholder="Doe"
              size="lg"
              wrapperProps={{ style: { width: "100%" } }}
              {...form.getInputProps("lastName")}
            />
          </Group>
          <PhoneInput label="Phone number" {...form.getInputProps("phone")} />
          <Checkbox
            label={
              <Text fz="xs">
                I have read and accept the Terms of Service and the Privacy Notice
              </Text>
            }
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />
          <Button
            variant="white"
            color="black"
            size="lg"
            fz="sm"
            type="submit"
            loading={mutation.isPending}
          >
            Sign-up
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

interface IForm {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  phone: string;
  termsOfService: boolean;
}

const initialForm: IForm = {
  email: "",
  password: "",
  passwordConfirm: "",
  firstName: "",
  lastName: "",
  phone: "",
  termsOfService: false,
};

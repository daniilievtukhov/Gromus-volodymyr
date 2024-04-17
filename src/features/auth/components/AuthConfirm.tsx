import { Button, Card, Stack } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Environment } from "../../../core/environment";
import { ApiAuth } from "../../../requests/account/auth";
import { useAuthStore } from "../store/auth";
import { Info } from "./Info";

export const AuthConfirm = () => {
  const userName = useAuthStore((state) => state.userName);

  const [countDown, setCountDown] = useState(60);

  const mutation = useMutation({
    mutationFn: () => {
      setCountDown(60);

      return ApiAuth.resendConfirm({ userName, returnUrl: Environment.feDomain });
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card py={25} px={20} miw={430} radius={0}>
      <Stack gap={16}>
        <Info
          title="Welcome to Gromus 👋"
          description="Confirmation message was sent to your email. Please follow it."
        />
        <Button
          variant="white"
          color="black"
          size="lg"
          fz="sm"
          onClick={() => mutation.mutate()}
          leftSection={countDown > 0 ? `${countDown}s` : undefined}
          disabled={countDown > 0}
        >
          Resend
        </Button>
      </Stack>
    </Card>
  );
};

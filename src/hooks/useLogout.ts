import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ApiAuth } from "../requests/account/auth";

export const useLogout = (userName: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => ApiAuth.logout({ userName }),
    onSuccess: () => {
      localStorage.removeItem("BEARER_TOKEN");
      navigate("/auth");
      
    },
  });
};

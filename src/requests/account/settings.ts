import axios from "axios";

import { getToken } from "../../core/helpers/getToken";
import { Links } from "../../core/links";

export namespace ApiAccount {
  const link = `${Links.api}/Account`;

  export const deactivate = async () => {
    const token = getToken();

    const res = await axios.get(`${link}/Deactivate`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  };
}

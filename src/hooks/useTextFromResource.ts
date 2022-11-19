import { useQuery } from "react-query";

export const useTextFromResource = (url: string) => {
  return useQuery<{ data: string } | undefined>(
    ["useResource", url],
    async () => {
      if (typeof url !== "string" || url === "") {
        return undefined;
      }

      if (url.endsWith(".pdf")) {
        return (await fetch(`/api/pdf-extract?url=${url}`)).json();
      }

      return (await fetch(`/api/html-extract?url=${url}`)).json();
    }
  );
};

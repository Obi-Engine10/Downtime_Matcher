import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type DowntimeCodeInput } from "@shared/routes";
import { z } from "zod";

export function useDowntimeCodes(search?: string) {
  const queryKey = [api.downtimeCodes.list.path, search].filter(Boolean);
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      const url = search 
        ? `${api.downtimeCodes.list.path}?search=${encodeURIComponent(search)}`
        : api.downtimeCodes.list.path;
        
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch downtime codes");
      
      const data = await res.json();
      return api.downtimeCodes.list.responses[200].parse(data);
    },
  });
}

export function useCreateDowntimeCode() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: DowntimeCodeInput) => {
      const validated = api.downtimeCodes.create.input.parse(data);
      const res = await fetch(api.downtimeCodes.create.path, {
        method: api.downtimeCodes.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.downtimeCodes.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create downtime code");
      }
      
      return api.downtimeCodes.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.downtimeCodes.list.path] });
    },
  });
}

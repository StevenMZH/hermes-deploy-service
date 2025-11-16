import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Factory para hooks GET
export function makeQueryHook(client, endpoint, makeKey) {
  return function useGenericQuery(req, pathParams, options) {
    return useQuery({
      queryKey: makeKey(req, pathParams),
      queryFn: () => client.call(endpoint, { pathParams, data: req }),
      enabled: options?.enabled ?? true,
      ...options,
    });
  };
}

// Factory para hooks de escritura (POST/PUT/DELETE/PATCH)
// afterSuccess: (qc, data, vars) => void  (opcional)
export function makeMutationHook(client, endpoint, { afterSuccess } = {}) {
  return function useGenericMutation() {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: ({ req, pathParams, config }) =>
        client.call(endpoint, { pathParams, data: req, config }),
      onSuccess: (data, vars, ctx) => {
        if (afterSuccess) afterSuccess(qc, data, vars, ctx);
      },
    });
  };
}

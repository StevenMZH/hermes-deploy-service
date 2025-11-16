import { ApiClient } from "../../../core/http";
import { makeCrudHooks } from "../../../core/crudHooks";
import { LIVESTOCK_API_URL } from "../../../config/services";
import { LocationModel } from "./model";

const api = new ApiClient(LIVESTOCK_API_URL);

export const {
  useList:   useLocations,      // -> data: [{ value, label }]
  useDetail: useLocation,       // -> data: { value, label } (si asOptions=true)
  useCreate: useCreateLocation,
  useUpdate: useUpdateLocation,
  useDelete: useDeleteLocation,
} = makeCrudHooks({
  client: api,
  basePath: "/locations",
  resource: "locations",
  mapOne: (raw) => LocationModel.fromAPI(raw), // red -> dominio
  // mapMany por defecto usa mapOne
  asOptions: true, // 👈 esto hace que los hooks expongan value/label
});

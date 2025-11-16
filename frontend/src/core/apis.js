import { ACCOUNTS_API_URL, LIVESTOCK_API_URL, ANALYSIS_API_URL } from "../config/services";
import { ApiClient } from "./http";

export const accountsApi  = new ApiClient(ACCOUNTS_API_URL);
export const livestockApi = new ApiClient(LIVESTOCK_API_URL);
export const analysisApi  = new ApiClient(ANALYSIS_API_URL);

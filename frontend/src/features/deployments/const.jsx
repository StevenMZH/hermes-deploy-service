import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export function useCloudProviders() {
  const { t } = useTranslation();
  return useMemo(() => ([
    { value: "gcloud", label: t("gcloud")},
    { value: "aws", label: t("aws")},
    { value: "azure", label: t("azure")},
  ]), [t]);
}


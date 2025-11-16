import { useState } from "react";
import { useTranslation } from "react-i18next";
import TableCRUD from "../../components/TableCRUD";

export function RepositoriesPage() {
  const { t } = useTranslation();

  const repositories = [
    { name: "Repo 1", url: "https://github.com/user/repo1" },
    { name: "Repo 2", url: "https://github.com/user/repo2" },

    { name: "backend-service", url: "https://github.com/company/backend-service" },
    { name: "frontend-web", url: "https://github.com/company/frontend-web" },
    { name: "auth-service", url: "https://github.com/company/auth-service" },
    { name: "payment-worker", url: "https://github.com/company/payment-worker" },
    { name: "analytics-engine", url: "https://github.com/company/analytics-engine" },
    { name: "notification-service", url: "https://github.com/company/notification-service" },
    { name: "db-sync-repo", url: "https://github.com/company/db-sync-repo" },
    { name: "cache-repo", url: "https://github.com/company/cache-repo" },
    { name: "monitoring-dashboard", url: "https://github.com/company/monitoring-dashboard" },
    { name: "log-parser", url: "https://github.com/company/log-parser" }
  ];


  const [data, setData] = useState(repositories);

  return (
    <div className="full-view flex column-left gap20">
      <TableCRUD
        id="repositories"
        table_name="repositories"
        addFormName="addRepository"
        searchKeys={["name", "url", "branch", "app"]}
        columns={[
          { key: "name", header: t("name"), sortable: true, width: "25%" },
          { key: "url", header: t("url"), sortable: true, width: "40%" },
        ]}
        data={data}
        setData={setData}
      />
    </div>
  );
}

export default RepositoriesPage;

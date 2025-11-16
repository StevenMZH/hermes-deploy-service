import { useState } from "react";
import { useTranslation } from "react-i18next";
import TableCRUD from "../../components/TableCRUD";

export function ImagesPage() {
  const { t } = useTranslation();

  const images = [
    { 
      name: "Image 1", 
      version: "v0.2.1", 
      url: "https://example.com/image1", 
      repository: "Repo 1" 
    },
    { 
      name: "Image 2", 
      version: "v1.22.1", 
      url: "https://example.com/image2", 
      repository: "Repo 2" 
    },
    {
      name: "Backend API",
      version: "v1.5.3",
      url: "https://example.com/backend-api",
      repository: "backend-service"
    },
    {
      name: "Auth Service",
      version: "v2.0.0",
      url: "https://example.com/auth-image",
      repository: "auth-repo"
    },
    {
      name: "Payment Worker",
      version: "v3.1.4",
      url: "https://example.com/payment-worker",
      repository: "payment-repo"
    },
    {
      name: "Frontend Web",
      version: "v12.0.0",
      url: "https://example.com/frontend-web",
      repository: "frontend-repo"
    },
    {
      name: "Analytics Engine",
      version: "v0.9.8",
      url: "https://example.com/analytics-engine",
      repository: "analytics-repo"
    },
    {
      name: "Notification Service",
      version: "v4.2.0",
      url: "https://example.com/notify",
      repository: "notify-repo"
    },
    {
      name: "Database Sync",
      version: "v1.0.7",
      url: "https://example.com/db-sync",
      repository: "db-sync-repo"
    },
    {
      name: "Cache Manager",
      version: "v2.3.5",
      url: "https://example.com/cache-manager",
      repository: "cache-repo"
    }
  ];


  const [data, setData] = useState(images);

  return (
    <div className="full-view flex column-left gap20">
      <TableCRUD
        id="images"
        table_name="images"
        addFormName="addImage"
        searchKeys={["name", "url", "app"]}
        columns={[
          { key: "name", header: t("name"), sortable: true, width: "25%" },
          { key: "version", header: t("version"), sortable: true, width: "10%" },
          { key: "url", header: t("url"), sortable: true, width: "40%" },
          { key: "repository", header: t("source"), sortable: true, width: "25%" },
        ]}
        data={data}
        setData={setData}
      />
    </div>
  );
}

export default ImagesPage;

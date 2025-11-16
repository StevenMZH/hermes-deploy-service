import { useState } from "react";
import { useTranslation } from "react-i18next";
import TableCRUD from "../../components/TableCRUD";

export function AppsPage() {
  const { t } = useTranslation();

  const apps = [
    {
      name: "App 1",
      servers: "Server 1, Server 2",
      domain: "app1.example.com",
      status: "on",
      repository: "Repo 1",
      image: "Image 1",
    },
    {
      name: "App 2",
      servers: "Server 3",
      domain: "app2.example.com",
      status: "off",
      repository: "Repo 2",
      image: "Image 2",
    },
    {
      name: "App 3",
      servers: "Server 1",
      domain: "dashboard.example.com",
      status: "on",
      repository: "Repo 3",
      image: "Image 5",
    },
    {
      name: "Billing Service",
      servers: "Server 4, Server 5",
      domain: "billing.example.com",
      status: "on",
      repository: "billing-api",
      image: "billing-image:v2",
    },
    {
      name: "Auth Service",
      servers: "Server 2",
      domain: "auth.example.com",
      status: "off",
      repository: "auth-service",
      image: "auth-image:v1.3",
    },
    {
      name: "Notification Worker",
      servers: "Server 6",
      domain: "notify.example.com",
      status: "on",
      repository: "notify-worker",
      image: "notify:v4",
    },
    {
      name: "Admin Panel",
      servers: "Server 7, Server 1",
      domain: "admin.example.com",
      status: "on",
      repository: "admin-panel",
      image: "admin:v3",
    },
    {
      name: "Analytics",
      servers: "Server 8",
      domain: "analytics.example.com",
      status: "off",
      repository: "analytics-service",
      image: "analytics:v1.0",
    },
    {
      name: "E-Commerce API",
      servers: "Server 3, Server 9",
      domain: "api.shop.example.com",
      status: "on",
      repository: "shop-api",
      image: "shop-api:v7",
    },
    {
      name: "Frontend Web",
      servers: "Server 10",
      domain: "www.example.com",
      status: "on",
      repository: "frontend",
      image: "frontend:v12",
    },
  ];


  const [data, setData] = useState(apps);

  const statusCell = {
    key: "status",
    header: "",
    sortable: false,
    cell: (row) => (
      <div className="full-w flex-center">
        <div className={`center server-status ${row.status === "on" ? "on" : "off"}`}></div>
      </div>
    ),
    width: "50px",
  };

  return (
    <div className="full-view flex column-left gap20">
      <TableCRUD
        id="apps"
        table_name="apps"
        addFormName="addApp"
        searchKeys={["name", "servers", "domain", "repository", "image"]}
        columns={[
          statusCell,
          { key: "name", header: t("name"), sortable: true, width: "20%" },
          { key: "domain", header: t("domain"), sortable: true, width: "25%" },
          { key: "servers", header: t("servers"), sortable: true, width: "35%" },
          { key: "image", header: t("image"), sortable: true, width: "20%" },
        ]}
        data={data}
        setData={setData}
        buttonName="create"
      />
    </div>
  );
}

export default AppsPage;

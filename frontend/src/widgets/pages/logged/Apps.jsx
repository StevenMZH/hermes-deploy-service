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

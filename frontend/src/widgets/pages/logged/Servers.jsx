import { useState } from "react";
import { useTranslation } from "react-i18next";
import TableCRUD from "../../components/TableCRUD";

export function ServersPage() {
  const { t } = useTranslation();

  const servers = [
    { name: "host-server", email: "server1@example.com", region: "us-central1-a", ip: "192.168.1.1", status: "on", user: "User 1" },
    { name: "smooth-server", email: "server2@example.com", region: "us-central1-a", ip: "192.168.1.1", status: "off", user: "User 2" },
  ];

  const [data, setData] = useState(servers);

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

  // Provider
  return (
    <div className="full-view flex column-left gap20">
      <TableCRUD
        id="servers"
        table_name="servers"
        addFormName="addServer"
        searchKeys={["name", "email", "region", "ssh", "user"]}
        columns={[
          statusCell,
          { key: "name", header: t("name"), sortable: true, width: "20%" },
          { key: "region", header: t("region"), sortable: true, width: "20%" },
          { key: "ip", header: t("ipAddress"), sortable: true, width: "20%" },
          { key: "email", header: t("email"), sortable: true, width: "20%" },
          { key: "user", header: t("username"), sortable: true, width: "20%" },
        ]}
        data={data}
        setData={setData}
      />
    </div>
  );
}

export default ServersPage;

import { useState } from "react";
import { useTranslation } from "react-i18next";
import TableCRUD from "../../components/TableCRUD";

export function ServersPage() {
  const { t } = useTranslation();

  const servers = [
    { name: "host-server", email: "server1@example.com", region: "us-central1-a", ip: "192.168.1.1", status: "on", user: "User 1" },
    { name: "smooth-server", email: "server2@example.com", region: "us-central1-a", ip: "192.168.1.2", status: "off", user: "User 2" },

    { name: "alpha-node", email: "alpha@example.com", region: "us-east1-b", ip: "192.168.2.1", status: "on", user: "User 3" },
    { name: "beta-node", email: "beta@example.com", region: "us-east1-c", ip: "192.168.2.2", status: "on", user: "User 4" },
    { name: "gamma-host", email: "gamma@example.com", region: "europe-west1-a", ip: "10.0.0.1", status: "off", user: "User 5" },
    { name: "delta-host", email: "delta@example.com", region: "europe-west1-b", ip: "10.0.0.2", status: "on", user: "User 6" },
    { name: "epsilon-server", email: "epsilon@example.com", region: "asia-south1-a", ip: "172.16.0.1", status: "on", user: "User 7" },
    { name: "zeta-server", email: "zeta@example.com", region: "asia-south1-b", ip: "172.16.0.2", status: "off", user: "User 8" },
    { name: "theta-node", email: "theta@example.com", region: "southamerica-east1-a", ip: "192.168.3.1", status: "on", user: "User 9" },
    { name: "iota-node", email: "iota@example.com", region: "southamerica-east1-b", ip: "192.168.3.2", status: "on", user: "User 10" }
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

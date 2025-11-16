import { useState } from "react";
import { useTranslation } from "react-i18next";
import TableCRUD from "../../components/TableCRUD";

export function RepositoriesPage() {
  const { t } = useTranslation();

  const repositories = [
    { name: "Repo 1", url: "https://github.com/user/repo1" },
    { name: "Repo 2", url: "https://github.com/user/repo2"},
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

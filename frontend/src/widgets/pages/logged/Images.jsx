import { useState } from "react";
import { useTranslation } from "react-i18next";
import TableCRUD from "../../components/TableCRUD";

export function ImagesPage() {
  const { t } = useTranslation();

  const images = [
    { name: "Image 1", version: "v0.2.1", url: "https://example.com/image1", repository: "Repo 1" },
    { name: "Image 2", version: "v1.22.1", url: "https://example.com/image2", repository: "Repo 2" },
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

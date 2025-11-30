import { useTranslation } from "react-i18next";
import CustomInput from "./CustomInput.jsx";
import { useAppState } from "../../../context/AppStateContext.jsx";

export default function EditForm({ title, inputList, onSubmit, onRequestClose, onDelete }) {
  const { t } = useTranslation();
  const { formObject, setFormObject } = useAppState();

  const handleChange = (key, value) => {
    setFormObject((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit?.(formObject); // envía el objeto actualizado
    onRequestClose?.();
  };

  const onDeleteFlow = (e) => {
    e.preventDefault(); // evita submit accidental
    onDelete?.(formObject); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="full-view column-left gap20 editForm"

      // 🟦 NUEVO: ENTER para enviar el formulario
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();  // evita submit doble o refresco
          handleSubmit(e);     // dispara el submit manualmente
        }
      }}
    >
      <p className="h3 full-w">
        {`${t(title)} (${formObject?.name || ""})`}
      </p>

      <div className="full-view column-left gap10">
        {inputList.map(({ label, valueKey }) => (
          <CustomInput
            key={valueKey}
            label={t(label)}
            placeholder={t(label)}
            value={formObject?.[valueKey] || ""}
            onChange={(v) => handleChange(valueKey, v)}
          />
        ))}
      </div>

      <div className="full-w row-right gap10">
        <button type="submit" className="hl1 h5">
          {t("update")}
        </button>
      </div>
    </form>
  );
}

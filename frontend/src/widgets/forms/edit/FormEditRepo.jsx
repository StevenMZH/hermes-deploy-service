// src/views/deployments/forms/FormEditRepo.jsx
import { useAppState } from "../../../context/AppStateContext.jsx";
import {
  useUpdateRepo,
} from "../../../features/deployments/repos/hooks.js";
import EditForm from "../components/EditForm.jsx";

export default function FormEditRepo({ onRequestClose }) {
  const { formObject } = useAppState();

  const updateRepo = useUpdateRepo();

  const inputList = [
    { label: "name", valueKey: "name", validations: { required: true, minLength: 3 } },
    { label: "url", valueKey: "url", validations: { required: true, type: "url" } },
  ];

  const handleSubmit = () => {
    if (!formObject?.id) return;

    updateRepo.mutate(
      {
        pathParams: { id: formObject.id },
        req: formObject, // viene de la tabla, ya es un objeto plano
      },
      {
        onSuccess: () => {
          onRequestClose?.();
        },
      }
    );
  };

  return (
    <EditForm
      title="repository"
      inputList={inputList}
      onSubmit={handleSubmit}
      onRequestClose={onRequestClose}
    />
  );
}

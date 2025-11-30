// src/views/deployments/forms/FormEditApp.jsx
import { useAppState } from "../../../context/AppStateContext.jsx";
import {
  useUpdateApp,
} from "../../../features/deployments/apps/hooks.js";
import EditForm from "../components/EditForm.jsx";

export default function FormEditApp({ onRequestClose }) {
  const { formObject } = useAppState();

  const updateApp = useUpdateApp();

  const inputList = [
    { label: "name", valueKey: "name", validations: { required: true, minLength: 3 } },
    { label: "domain", valueKey: "domain", validations: { required: true } },
    { label: "image", valueKey: "image", validations: { required: true } },
    // locations las podríamos manejar más adelante con UI dedicada
  ];

  const handleSubmit = () => {
    if (!formObject?.id) return;

    updateApp.mutate(
      {
        pathParams: { id: formObject.id },
        req: formObject,
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
      title="app"
      inputList={inputList}
      onSubmit={handleSubmit}
      onRequestClose={onRequestClose}
    />
  );
}

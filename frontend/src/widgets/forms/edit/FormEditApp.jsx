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
    { label: "name", valueKey: "name" },
    { label: "domain", valueKey: "domain" },
    { label: "server", valueKey: "locations.server" },
    { label: "port", valueKey: "locations.port" },
    { label: "image", valueKey: "image" },
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

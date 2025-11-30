import { useAppState } from "../../../context/AppStateContext.jsx";
import { useUpdateServer } from "../../../features/deployments/servers/hooks.js";
import EditForm from "../components/EditForm.jsx";

export default function FormEditServer({ onRequestClose }) { 
  const { formObject, setFormObject } = useAppState();

  const updateServer = useUpdateServer();

  const inputList = [
    { label: "name", valueKey: "name", validations: { required: true, minLength: 3 } },
    { label: "ipAddress", valueKey: "ip", validations: { required: true, pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" } },
    { label: "region", valueKey: "region", validations: { required: true } },
    { label: "email", valueKey: "email", validations: { type: "email", required: true } },
    { label: "projectId", valueKey: "project", validations: { required: true } },
  ];

  const handleSubmit = () => {
    if (!formObject?.id) return;

    updateServer.mutate({
      pathParams: { id: formObject.id },
      req: formObject,
    }, {
      onSuccess: () => {
        onRequestClose?.();
      }
    });
  };

  return (
    <EditForm
      title="server"
      inputList={inputList}
      onSubmit={handleSubmit}
      onRequestClose={onRequestClose}
    />
  );
}

import { useAppState } from "../../../context/AppStateContext.jsx";
import { useUpdateServer } from "../../../features/deployments/servers/hooks.js";
import EditForm from "../components/EditForm.jsx";

export default function FormEditServer({ onRequestClose }) { 
  const { formObject, setFormObject } = useAppState();

  const updateServer = useUpdateServer();

  const inputList = [
    { label: "name", valueKey: "name" },
    { label: "ipAddress", valueKey: "ip" },
    { label: "region", valueKey: "region" },
    { label: "email", valueKey: "email" },
    { label: "projectId", valueKey: "project" },
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

// src/views/deployments/forms/FormEditImage.jsx
import { useAppState } from "../../../context/AppStateContext.jsx";
import {
  useUpdateImage,
} from "../../../features/deployments/images/hooks.js";
import EditForm from "../components/EditForm.jsx";

export default function FormEditImage({ onRequestClose }) {
  const { formObject } = useAppState();

  const updateImage = useUpdateImage();

  const inputList = [
    { label: "name", valueKey: "name" },
    { label: "version", valueKey: "version" },
    { label: "url", valueKey: "url" },
    { label: "repository", valueKey: "repository" },
    { label: "branch", valueKey: "branch"},
  ];

  const handleSubmit = () => {
    if (!formObject?.id) return;

    updateImage.mutate(
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
      title="image"
      inputList={inputList}
      onSubmit={handleSubmit}
      onRequestClose={onRequestClose}
    />
  );
}

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
    { label: "name", valueKey: "name", validations: { required: true, minLength: 3 } },
    { label: "version", valueKey: "version", validations: { required: false } },
    { label: "url", valueKey: "url", validations: { required: true, type: "url" } },
    { label: "repository", valueKey: "repository", validations: { required: false } },
    { label: "branch", valueKey: "branch", validations: { required: false } },
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

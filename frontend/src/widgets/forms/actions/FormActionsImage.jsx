import { useAppState } from "../../../context/AppStateContext.jsx";
import ActionsForm from "../components/ActionsForm.jsx";
import { useDeleteImage } from "../../../features/deployments/images/hooks";

export default function FormActionsImage({ onRequestClose }) {
  const { formObject, setAdvancedForm } = useAppState();
  const deleteImage = useDeleteImage();

  const handleDelete = () => {
    if (!formObject?.id) return;

    deleteImage.mutate(
      { pathParams: { id: formObject.id } },
      {
        onSuccess: () => {
          console.log("Image deleted:", formObject.id);
          onRequestClose?.();
        },
        onError: (err) => {
          console.error("Error deleting image:", err);
        },
      }
    );
  };

  const actions = [
    {
      label: "delete",
      onClick: handleDelete,
      icon: "actions/delete.svg",
      color: "",
    },
    {
      label: "edit",
      onClick: () => setAdvancedForm("editImage", formObject),
      icon: "actions/edit.svg",
      color: "",
    },
    {
      label: "buildImage",
      onClick: () => setAdvancedForm("editImage", formObject),
      icon: "nav/images.svg",
      color: "",
    },

  ];

  return <ActionsForm actions={actions} />;
}

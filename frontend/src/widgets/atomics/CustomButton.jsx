import {Button} from "@heroui/react";

export default function CustomButton({
  children,
  onClick,
  type = "button",
  variant = "solid",
  color = "primary",
  className = "",
  isDisabled = false,
}) {
  return (
    <Button
      type={type}
      onPress={onClick}
      variant={variant}
      color={color}
      className={className}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
}

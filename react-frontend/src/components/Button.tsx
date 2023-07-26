import { ReactNode } from "react";
import cn from "classnames";

import type { BasicObject } from "@app/common/types";

export enum ButtonType {
  default = "default",
  primary = "primary",
}

interface Props {
  buttonType?: ButtonType;
  label?: string;
  className?: string;
  children: ReactNode;
  [key: string]: any;
}

const btnClass: BasicObject = {
  [ButtonType.default]: "btn-default",
  [ButtonType.primary]: "btn-primary",
};

const Button = ({
  buttonType = ButtonType.default,
  label,
  className,
  children,
  ...rest
}: Props) => {
  const typeClass = btnClass[buttonType];

  return (
    <button className={cn("btn", { [typeClass]: true }, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;

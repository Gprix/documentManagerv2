export type ButtonAppearance = "solid" | "outline" | "transparent";

/**
 * Button component props.
 *
 * @param {React.ReactNode} children - Button content.
 * @param {string} className - Custom className.
 * @param {React.ReactNode} leftIcon - Left icon.
 * @param {React.ReactNode} rightIcon - Right icon.
 * @param {() => void} onClick - Callback to close the modal.
 * @param {ButtonAppearance} type - Button type.
 * @param {string} textStyle - Custom text className.
 * @param {string} iconStyle - Custom icon className.
 * @param {boolean} disabled - Is button disabled.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  appearance?: ButtonAppearance;
  textStyle?: string;
  iconStyle?: string;
  disabled?: boolean;
  isLoading?: boolean;
  htmlType?: HTMLButtonElement["type"];
}

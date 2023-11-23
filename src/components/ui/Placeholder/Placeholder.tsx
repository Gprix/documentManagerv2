import { jn } from "@/utils/common.utils";
import { PlaceholderProps as Props } from "./Placeholder.types";

const Placeholder = (props: Props) => {
  const { className, children, variant = "default" } = props;
  const { pulse = true, shine = true, rounded = true } = props;

  const variantClassName = jn(
    variant === "default" ? "bg-surf-semi-contrast" : "",
    // TODO: review this color
    variant === "alt" ? "bg-highlight/50" : ""
  );
  const animationClassName = jn(
    pulse ? "animate-pulse" : "",
    shine ? "animate-shine" : ""
  );
  const placeholderClassName = jn(
    variantClassName,
    animationClassName,
    rounded ? "rounded-2xl" : ""
  );

  return (
    <div className={jn("Placeholder", placeholderClassName, className)}>
      {children}
    </div>
  );
};

export default Placeholder;

import { jn } from "@/utils/common.utils";

export interface EmptyStateProps {
  className?: string;
  title?: string;
  description?: string;
}

const EmptyState = (props: EmptyStateProps) => {
  const { className, title, description } = props;

  return (
    <div className={jn("EmptyState", className)}>
      {title ? (
        <p className={jn("text-center text-txt font-medium mb-2")}>{title}</p>
      ) : null}
      {description ? (
        <p className={jn("text-center text-txt text-sm opacity-80")}>
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default EmptyState;

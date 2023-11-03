import Placeholder from "../ui/Placeholder/Placeholder";

const WorkspaceListPlaceholder = () => {
  const placeholderClassName = "w-56 h-5 mb-2";

  return (
    <div className="px-12 mt-8">
      <Placeholder className="w-64 h-6" />
      <div className="flex w-full justify-between items-start gap-2 mt-6">
        <div className="flex flex-col gap-2 justify-start">
          <Placeholder className={placeholderClassName} />
          <Placeholder className={placeholderClassName} />
          <Placeholder className={placeholderClassName} />
        </div>
        <div className="flex flex-col gap-2 justify-start">
          <Placeholder className={placeholderClassName} />
          <Placeholder className={placeholderClassName} />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceListPlaceholder;

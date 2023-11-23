// import Image from "next/image";
import WorkspaceSetup from "@/components/workspace/WorkspaceSetup/WorkspaceSetup";
// @ts-ignore
import WavesSVG from "images/waves.svg?inline";

const WorkspacePage = () => {
  return (
    <section className="bg-gradient-to-bl from-bck/80 to-surf relative flex w-full">
      <WorkspaceSetup />
      <div className="absolute left-0 right-0 bottom-0 w-full pointer-events-none">
        <WavesSVG />
      </div>
    </section>
  );
};

export default WorkspacePage;

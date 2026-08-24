import Navbar from "@/app/(protected)/documents/[documentId]/Navbar";
import Editor from "./Editor";
import ToolBar from "./ToolBar";
import { Room } from "@/app/(protected)/documents/[documentId]/Room";

interface DocDetailsProps {
  params: Promise<{ documentId: string }>;
}
async function DocDetails({ params }: DocDetailsProps) {
  const { documentId } = await params;

  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 gap-y-2 fixed top-0 left-0 right-0 bg-[#FAFBFD] print:hidden z-30">
          <Navbar />
          <ToolBar />
        </div>
        <div className="pt-28.5 print:pt-0">
          <Editor />
        </div>
      </div>
    </Room>
  );
}

export default DocDetails;

import Editor from "./Editor";
import ToolBar from "./ToolBar";

interface DocDetailsProps {
  params: Promise<{ documentId: string }>;
}
async function DocDetails({ params }: DocDetailsProps) {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <ToolBar />
      <Editor />
    </div>
  );
}

export default DocDetails;

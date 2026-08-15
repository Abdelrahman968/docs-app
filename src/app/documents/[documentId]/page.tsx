import Editor from "./editor";

interface DocDetailsProps {
  params: Promise<{ documentId: string }>;
}
async function DocDetails({ params }: DocDetailsProps) {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Editor />
    </div>
  );
}

export default DocDetails;

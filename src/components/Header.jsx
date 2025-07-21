import { useContext, useRef } from "react";
import Context from "../context/ContextProvider";
import { printHandler } from "../utils/printUtils";
import FileInput from "./FileInput";

function Header() {
  const { text } = useContext(Context);
  const fileInputRef = useRef(null);

  const onConvert = () => {
    printHandler();
    window.print();
  };

  const onChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleMarkdownSave = () => {
    const isConfirmed = confirm("Do you want to download the markdown?");
    if (!isConfirmed) return;
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "markdown.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-1 bg-secondary px-1 py-1 sm:px-4 print:hidden">
      <h3 className="min-w-fit text-lg font-bold">MD2PDF</h3>
      <div className="flex gap-1">
        <button
          className="flex items-center gap-2 rounded-sm border border-black px-3 py-1"
          onClick={handleMarkdownSave}
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg"
            alt="markdown"
            className="size-6"
          />
          Save
        </button>
        <button
          className="rounded-sm border border-black px-3 py-1"
          onClick={onChooseFile}
        >
          📁 Open
        </button>
        <button
          className="rounded-sm border border-black px-3 py-1"
          onClick={onConvert}
        >
          🎉 PDF
        </button>
      </div>

      <FileInput fileInputRef={fileInputRef} />
    </header>
  );
}

export default Header;

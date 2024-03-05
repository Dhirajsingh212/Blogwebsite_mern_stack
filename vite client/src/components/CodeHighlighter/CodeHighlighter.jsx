import React, { useEffect } from "react";
import Prism from "prismjs";
import "./CodeHighlighter.css";

export default function CodeHighligher({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  if (!code && !language) {
    return null;
  }
  return (
    <div className="language-javascript">
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}

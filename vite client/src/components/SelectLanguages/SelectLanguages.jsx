import React, { useEffect, useState } from "react";
import Prism from "prismjs";

export default function SelectLanguages({ language, changeLanguage }) {
  const [keyData, setKeyData] = useState([]);
  useEffect(() => {
    for (const key in Prism.languages) {
      setKeyData((prev) => {
        return [...prev, key];
      });
    }
  }, []);
  return (
    <div>
      <select
        value={language}
        required
        onChange={changeLanguage}
        className="select w-full max-w-xs overflow-scroll"
      >
        <option value="" selected>
          Select Language
        </option>
        {keyData.map((e, index) => {
          return (
            <option value={e} key={index}>
              {e}
            </option>
          );
        })}
      </select>
    </div>
  );
}

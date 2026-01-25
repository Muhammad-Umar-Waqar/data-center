// src/components/DataCenterSelect.jsx (adapted)
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

export default function DataCenterSelect({ value = "", onChange, className = "" }) {
  // const {  = [], loading } = useSelector((s) => s.DataCenter || {});
  const { DataCenters = [], loading = {} } = useSelector((s) => s.DataCenter || {});
  const isLoading = Boolean(loading.fetch || loading.fetchAll);
  

  const [selected, setSelected] = useState(value ?? "");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => setSelected(value ?? ""), [value]);
  useEffect(() => {
    function outside(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  useEffect(() => {
    // if parent didn't set value and list loaded, pick nothing here (Dashboard orchestration picks)
    if ((!selected || selected === "") && DataCenters && DataCenters.length > 0 && value === undefined) {
      // do nothing — let orchestration pick. (We purposely avoid auto-select here)
    }
  }, [DataCenters]);

  const handleSelect = (id) => {
    setSelected(String(id));
    if (typeof onChange === "function") onChange(String(id));
    setOpen(false);
  };

  const selectedLabel = isLoading ? "Loading..." : (DataCenters.find(d => String(d._id) === String(selected))?.name || "Data Center");

  return (
    <div className={className} ref={ref}>
      <div role="button" onClick={() => setOpen((s) => !s)} className="px-4 py-2 border rounded-full bg-white cursor-pointer">
        <span className="truncate">{selectedLabel}</span>
      </div>

      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border rounded-md shadow-lg max-h-56 overflow-auto">
          {DataCenters && DataCenters.length > 0 ? DataCenters.map((d) => {
            const id = String(d._id);
            return <div key={id} onClick={() => handleSelect(id)} className={`px-4 py-2 cursor-pointer ${selected === id ? "bg-gray-50" : ""}`}>{d.name || id}</div>;
          }) : <div className="px-4 py-2 text-sm text-gray-500">No Data Centers</div>}
        </div>
      )}
    </div>
  );
}

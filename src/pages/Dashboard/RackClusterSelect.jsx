// src/components/RackClusterSelect.jsx
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

export default function RackClusterSelect({ value = "", onChange, className = "", disabled = false }) {
  // const { clusters = [], loading } = useSelector((s) => s.rackCluster || {});

const { clusters = [], loading = {} } = useSelector((s) => s.rackCluster || {});
const isLoading = Boolean(loading.fetch || loading.fetchByDc);

const [selected, setSelected] = useState(value ?? "");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => setSelected(value ?? ""), [value]);

  useEffect(() => {
    function outside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  const handleSelect = (id) => {
    setSelected(id);
    setOpen(false);
    if (typeof onChange === "function") onChange(id);
  };

  // const label = loading ? "Loading clusters..." : (clusters.find((c) => String(c._id) === String(selected))?.name || "Rack Cluster");

  const label = isLoading
  ? "Loading clusters..."
  : clusters.find((c) => String(c._id) === String(selected))?.name || "Rack Cluster";

  
  return (
    <div className={className} ref={ref}>
      <div className="relative">
        <div
          role="button"
          onClick={() => !disabled && setOpen((s) => !s)}
          className={`px-4 py-2 border cursor-pointer bg-white select-none rounded-full ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <span className="truncate">{label}</span>
        </div>

        {open && (
          <div className="absolute z-20 mt-2 w-full bg-white border rounded-md shadow-lg max-h-56 overflow-auto">
            {isLoading  ? (
              <div className="px-4 py-3 text-sm text-gray-500">Loading...</div>
            ) : clusters && clusters.length > 0 ? (
              clusters.map((c) => {
                const id = String(c._id);
                return (
                  <div key={id} onClick={() => handleSelect(id)} className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selected === id ? "bg-gray-50" : ""}`}>
                    <div className="truncate">{c.name || id}</div>
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">No clusters</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

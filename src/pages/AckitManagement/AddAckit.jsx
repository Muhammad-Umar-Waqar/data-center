// AckitManagement/AddAckit.jsx


// src/pages/AckitManagement/AddAckit.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import InputField from "../../components/Inputs/InputField";
import { createAckit, fetchAllAckits } from "../../slices/ackitSlice";
import "../../styles/pages/management-pages.css";

const DEFAULT_CONDITION = { type: "temp", operator: ">", value: 0 };

export default function AddAckit() {
  const dispatch = useDispatch();
  const { loading = {} } = useSelector((s) => s.ackit || {});
  const [name, setName] = useState("");
  const [condition, setCondition] = useState(DEFAULT_CONDITION);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e?.preventDefault?.();

    if (!name.trim()) return Swal.fire("Warning", "Name is required", "warning");
    if (!condition || condition.value === "" || condition.value === null) {
      return Swal.fire("Warning", "Condition value is required", "warning");
    }

    setSubmitting(true);
    try {
      await dispatch(createAckit({ name: name.trim(), condition })).unwrap();

      Swal.fire("Success", "AC Kit created", "success");

      setName("");
      setCondition(DEFAULT_CONDITION);
      dispatch(fetchAllAckits());
    } catch (err) {
      Swal.fire("Error", err || "Unable to create AC Kit", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
      <h2 className="data-center-add-title font-semibold mb-1 text-center">Add AC Kit</h2>
      <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
        Create a new AC Kit (condition-based action)
      </p>

      <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">
        <InputField
          id="ackit_name"
          name="ackit_name"
          label="Name"
          type="text"
          value={name}
          onchange={(e) => setName(e.target.value)}
          placeholder="AC Kit name"
        />

        <div>
          <label className="block mb-1 font-medium text-gray-700">Condition</label>

          <div className="flex items-center gap-2">
            <select
              value={condition.type}
              onChange={(e) => setCondition((p) => ({ ...p, type: e.target.value }))}
              className="border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="temp">Temperature</option>
              <option value="humidity">Humidity</option>
            </select>

            <select
              value={condition.operator}
              onChange={(e) => setCondition((p) => ({ ...p, operator: e.target.value }))}
              className="border border-gray-300 rounded-md px-2 py-1"
            >
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
            </select>

            <input
              type="number"
              value={condition.value}
              onChange={(e) => setCondition((p) => ({ ...p, value: Number(e.target.value) }))}
              className="border border-gray-300 rounded-md px-2 py-1 w-28"
              placeholder="Value"
            />
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={submitting || loading?.submit}
          className={`w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md ${
            submitting || loading?.submit ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {submitting || loading?.submit ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

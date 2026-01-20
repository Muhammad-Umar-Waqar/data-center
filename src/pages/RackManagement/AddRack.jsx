// src/pages/RackManagement/AddRack.jsx
import { Cpu, Hash, Thermometer, Droplet } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import InputField from "../../components/Inputs/InputField";
import { createRack, fetchAllRacks } from "../../slices/rackSlice";
import { fetchHubsByDataCenter } from "../../slices/hubSlice";
import { useInstallation } from "../../contexts/InstallationContext";

import "../../styles/pages/management-pages.css";

const AddRack = () => {
  const dispatch = useDispatch();
  const { selectedDataCenter, selectedHub } = useInstallation();

  const { loading } = useSelector((state) => state.rack);
  const { hubs } = useSelector((state) => state.hub);

  const [formData, setFormData] = useState({
    hubId: "",
    sensorIds: [],
    row: "",
    col: "",
    conditions: [], // { type, operator, value }
  });

  const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);

  useEffect(() => {
    if (selectedDataCenter?._id) {
      dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
    }
  }, [selectedDataCenter, dispatch]);

  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSensorSelect = (e) => {
    const options = Array.from(e.target.selectedOptions);
    setFormData((p) => ({ ...p, sensorIds: options.map((o) => o.value) }));
  };

  const addCondition = () => {
    setFormData((p) => ({
      ...p,
      conditions: [...p.conditions, { type: "temp", operator: ">", value: 0 }],
    }));
  };

  const updateCondition = (index, field, value) => {
    const newConditions = [...formData.conditions];
    newConditions[index][field] = field === "value" ? Number(value) : value;
    setFormData((p) => ({ ...p, conditions: newConditions }));
  };

  const removeCondition = (index) => {
    const newConditions = [...formData.conditions];
    newConditions.splice(index, 1);
    setFormData((p) => ({ ...p, conditions: newConditions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDataCenter?._id) {
      Swal.fire({
        icon: "warning",
        title: "No Data Center selected",
        text: "Please select a Data Center before creating a Rack.",
      });
      return;
    }

    if (!formData.hubId) {
      Swal.fire({
        icon: "warning",
        title: "Missing field",
        text: "Please select a Hub.",
      });
      return;
    }

    if (!formData.row || !formData.col) {
      Swal.fire({
        icon: "warning",
        title: "Missing field",
        text: "Row and Column are required.",
      });
      return;
    }

    if (!formData.sensorIds.length) {
      Swal.fire({
        icon: "warning",
        title: "No sensors selected",
        text: "Please select at least one sensor.",
      });
      return;
    }

    if (!formData.conditions.length) {
      Swal.fire({
        icon: "warning",
        title: "No conditions added",
        text: "Please add at least one condition.",
      });
      return;
    }

    setLoadingFormSubmit(true);

    try {
      const payload = {
        dataCenterId: selectedDataCenter._id,
        ...formData,
      };

      const created = await dispatch(createRack(payload)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Rack created",
        text: `Rack added successfully.`,
      });

      setFormData({
        hubId: "",
        sensorIds: [],
        row: "",
        col: "",
        conditions: [],
      });

      dispatch(fetchAllRacks());
    } catch (err) {
      console.error("create rack error:", err);
      Swal.fire({
        icon: "error",
        title: "Create failed",
        text: err || "Unable to create Rack.",
      });
    } finally {
      setLoadingFormSubmit(false);
    }
  };

  return (
    <div className="AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">

      <h2 className="data-center-add-title font-semibold mb-1 text-center">
        Add Rack
      </h2>

      <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
        {selectedDataCenter
          ? `Adding Rack to "${selectedDataCenter.name}"`
          : "Select a Data Center to add a Rack"}
      </p>

      <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">

        {/* Hub Select */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Select Hub</label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="hubId"
            value={formData.hubId}
            onChange={onchange}
            disabled={!selectedDataCenter}
          >
            <option value="">Select Hub</option>
            {hubs.map((h) => (
              <option key={h._id} value={h._id}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sensors Multi-Select */}
        {formData.hubId && selectedHub?.sensors && (
          <div>
            <label className="block mb-1 font-medium text-gray-700">Select Sensors</label>
            <select
              multiple
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.sensorIds}
              onChange={handleSensorSelect}
            >
              {selectedHub.sensors.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.sensorName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Row & Column */}
        <InputField
          id="row"
          name="row"
          label="Row"
          type="number"
          value={formData.row}
          onchange={onchange}
          placeholder="Row number"
          icon={<Cpu size={20} />}
          disabled={!formData.hubId}
        />
        <InputField
          id="col"
          name="col"
          label="Column"
          type="number"
          value={formData.col}
          onchange={onchange}
          placeholder="Column number"
          icon={<Cpu size={20} />}
          disabled={!formData.hubId}
        />

        {/* Conditions */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Conditions</label>
          {formData.conditions.map((c, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <select
                value={c.type}
                onChange={(e) => updateCondition(i, "type", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="temp">Temperature</option>
                <option value="humidity">Humidity</option>
              </select>
              <select
                value={c.operator}
                onChange={(e) => updateCondition(i, "operator", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
              </select>
              <input
                type="number"
                value={c.value}
                onChange={(e) => updateCondition(i, "value", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 w-20"
              />
              <button
                type="button"
                onClick={() => removeCondition(i)}
                className="text-red-500 font-bold px-2"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCondition}
            className="text-blue-600 font-semibold mt-1"
          >
            + Add Condition
          </button>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!selectedDataCenter || loadingFormSubmit || loading?.submit}
          className={`w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
            !selectedDataCenter || loadingFormSubmit ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loadingFormSubmit ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddRack;

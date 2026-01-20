// src/pages/DataCenter/AddDataCenter.jsx
import { Box } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputField from "../../components/Inputs/InputField";
import Swal from "sweetalert2";
import { createDataCenter, fetchAllDataCenters } from "../../slices/DataCenterSlice";
import "../../styles/pages/management-pages.css";

const AddDataCenter = () => {

  const [formData, setFormData] = useState({
    data_center_name: ""
  });

  const dispatch = useDispatch();
  const [loadingformSubmit, setLoadingformSubmit] = useState(false); 

  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = (formData.data_center_name || "").trim();
    if (!name) {
      Swal.fire({ 
        icon: "warning", 
        title: "Missing field", 
        text: "Data Center name is required." 
      });
      return;
    }

    setLoadingformSubmit(true);

    try {
      const created = await dispatch(createDataCenter(name)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Data Center created",
        text: `Data Center "${created?.name || name}" added successfully.`,
      });

      setFormData({ data_center_name: "" });
      dispatch(fetchAllDataCenters());

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Create failed",
        text: err || "Unable to create Data Center.",
      });
      console.error("create data center error:", err);
    } finally {
      setLoadingformSubmit(false);
    }
  };

  return (
    <div className="AddingPage data-center-add-container rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">

      <h2 className="data-center-add-title font-semibold mb-1 text-center">
        Add Data Center
      </h2>

      <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
        Welcome back! Select method to add Data Center
      </p>

      <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">
        <InputField
          id="data_center_name"
          name="data_center_name"
          label="Data Center Name"
          type="text"
          value={formData.data_center_name}
          onchange={onchange}
          placeholder="Data Center Name"
          icon={<Box size={20} />}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loadingformSubmit}
          className={`w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
            loadingformSubmit ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loadingformSubmit ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddDataCenter;

// // src/pages/HubManagement/AddHub.jsx
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createHub } from "../../slices/hubSlice";
// import { useInstallation } from "../../contexts/InstallationContext";
// import Swal from "sweetalert2";
// import "../../styles/pages/management-pages.css";

// const AddHub = ({ disabled }) => {
//   const dispatch = useDispatch();
//   const { selectedDataCenter } = useInstallation();
//   const { loading } = useSelector((state) => state.hub);

//   const [name, setName] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) return;

//     try {
//       await dispatch(
//         createHub({
//           name,
//           dataCenterId: selectedDataCenter._id,
//         })
//       ).unwrap();

//       Swal.fire("Success", "Hub created successfully", "success");
//       setName("");
//     } catch (err) {
//       Swal.fire("Error", err, "error");
//     }
//   };

//   return (
//     <div className="AddingPage rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border">

//       <h2 className="text-center font-semibold mb-2">
//         Add Hub
//       </h2>

//       {!selectedDataCenter && (
//         <p className="text-center text-gray-500 mb-4">
//           Select a Data Center to create a Hub
//         </p>
//       )}

//       <form className="max-w-sm mx-auto w-full space-y-4">
//         <input
//           type="text"
//           value={name}
//           disabled={disabled}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Hub Name"
//           className="w-full p-2 border rounded-md"
//         />

//         <button
//           onClick={handleSubmit}
//           disabled={disabled || loading.submit}
//           className={`w-full py-2 rounded-md text-white ${
//             disabled ? "bg-gray-400" : "bg-blue-600"
//           }`}
//         >
//           {loading.submit ? "Saving..." : "Save"}
//         </button>
//       </form>

//     </div>
//   );
// };

// export default AddHub;







// src/pages/HubManagement/AddHub.jsx
import { Cpu, Hash } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import InputField from "../../components/Inputs/InputField";
import { createHub, fetchHubsByDataCenter } from "../../slices/hubSlice";
import { useInstallation } from "../../contexts/InstallationContext";

import "../../styles/pages/management-pages.css";

const AddHub = () => {
  const dispatch = useDispatch();
  const { selectedDataCenter } = useInstallation();
  const { loading } = useSelector((state) => state.hub);

  const [formData, setFormData] = useState({
    hub_name: "",
    sensorQuantity: "",
  });

  const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);

  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDataCenter?._id) {
      Swal.fire({
        icon: "warning",
        title: "No Data Center selected",
        text: "Please select a Data Center before creating a Hub.",
      });
      return;
    }

    const name = (formData.hub_name || "").trim();
    const quantity = formData.sensorQuantity;

    if (!name) {
      Swal.fire({
        icon: "warning",
        title: "Missing field",
        text: "Hub name is required.",
      });
      return;
    }

    // Optional sensorQuantity validation
    if (quantity !== "") {
      const qty = Number(quantity);

      if (!Number.isInteger(qty) || qty < 1 || qty > 15) {
        Swal.fire({
          icon: "warning",
          title: "Invalid sensor quantity",
          text: "Sensor quantity must be a number between 1 and 15.",
        });
        return;
      }
    }

    setLoadingFormSubmit(true);

    try {
      const payload = {
        name,
        dataCenterId: selectedDataCenter._id,
        ...(quantity !== "" && { sensorQuantity: Number(quantity) }),
      };

      const created = await dispatch(createHub(payload)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Hub created",
        text: `Hub "${created?.name || name}" added successfully.`,
      });

      setFormData({
        hub_name: "",
        sensorQuantity: "",
      });

      dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
    } catch (err) {
      console.error("create hub error:", err);
      Swal.fire({
        icon: "error",
        title: "Create failed",
        text: err || "Unable to create Hub.",
      });
    } finally {
      setLoadingFormSubmit(false);
    }
  };

  return (
    <div className="AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">

      <h2 className="data-center-add-title font-semibold mb-1 text-center">
        Add Hub
      </h2>

      <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
        {selectedDataCenter
          ? `Adding Hub to "${selectedDataCenter.name}"`
          : "Select a Data Center to add a Hub"}
      </p>

      <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">

        <InputField
          id="hub_name"
          name="hub_name"
          label="Hub Name"
          type="text"
          value={formData.hub_name}
          onchange={onchange}
          placeholder="Hub Name"
          icon={<Cpu size={20} />}
          disabled={!selectedDataCenter}
        />

        <InputField
          id="sensorQuantity"
          name="sensorQuantity"
          label="Sensor Quantity (Optional)"
          type="number"
          value={formData.sensorQuantity}
          onchange={onchange}
          placeholder="1 – 15"
          icon={<Hash size={20} />}
          disabled={!selectedDataCenter}
          min={1}
          max={15}
        />

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

export default AddHub;

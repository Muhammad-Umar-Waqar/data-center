// // src/pages/RackManagement/AddRack.jsx
// import { Cpu, Hash, Thermometer, Droplet } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import InputField from "../../components/Inputs/InputField";
// import { createRack, fetchAllRacks } from "../../slices/rackSlice";
// import { fetchHubsByDataCenter } from "../../slices/hubSlice";
// import { useInstallation } from "../../contexts/InstallationContext";

// import "../../styles/pages/management-pages.css";

// const AddRack = () => {
//   const dispatch = useDispatch();
//   const { selectedDataCenter, selectedHub } = useInstallation();

//   // const { loading } = useSelector((state) => state.rack);
//   const { loading = {} } = useSelector((state) => state.rack || {});
//   const { hubs } = useSelector((state) => state.hub);

//   const [formData, setFormData] = useState({
//     hubId: "",
//     sensorIds: [],
//     row: "",
//     col: "",
//     conditions: [], // { type, operator, value }
//   });

//   const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);

//   useEffect(() => {
//     if (selectedDataCenter?._id) {
//       dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
//     }
//   }, [selectedDataCenter, dispatch]);

//   const onchange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const handleSensorSelect = (e) => {
//     const options = Array.from(e.target.selectedOptions);
//     setFormData((p) => ({ ...p, sensorIds: options.map((o) => o.value) }));
//   };

//   const addCondition = () => {
//     setFormData((p) => ({
//       ...p,
//       conditions: [...p.conditions, { type: "temp", operator: ">", value: 0 }],
//     }));
//   };

//   const updateCondition = (index, field, value) => {
//     const newConditions = [...formData.conditions];
//     newConditions[index][field] = field === "value" ? Number(value) : value;
//     setFormData((p) => ({ ...p, conditions: newConditions }));
//   };

//   const removeCondition = (index) => {
//     const newConditions = [...formData.conditions];
//     newConditions.splice(index, 1);
//     setFormData((p) => ({ ...p, conditions: newConditions }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedDataCenter?._id) {
//       Swal.fire({
//         icon: "warning",
//         title: "No Data Center selected",
//         text: "Please select a Data Center before creating a Rack.",
//       });
//       return;
//     }

//     if (!formData.hubId) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing field",
//         text: "Please select a Hub.",
//       });
//       return;
//     }

//     if (!formData.row || !formData.col) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing field",
//         text: "Row and Column are required.",
//       });
//       return;
//     }

//     if (!formData.sensorIds.length) {
//       Swal.fire({
//         icon: "warning",
//         title: "No sensors selected",
//         text: "Please select at least one sensor.",
//       });
//       return;
//     }

//     if (!formData.conditions.length) {
//       Swal.fire({
//         icon: "warning",
//         title: "No conditions added",
//         text: "Please add at least one condition.",
//       });
//       return;
//     }

//     setLoadingFormSubmit(true);

//     try {
//       const payload = {
//         dataCenterId: selectedDataCenter._id,
//         ...formData,
//       };

//       const created = await dispatch(createRack(payload)).unwrap();

//       Swal.fire({
//         icon: "success",
//         title: "Rack created",
//         text: `Rack added successfully.`,
//       });

//       setFormData({
//         hubId: "",
//         sensorIds: [],
//         row: "",
//         col: "",
//         conditions: [],
//       });

//       dispatch(fetchAllRacks());
//     } catch (err) {
//       console.error("create rack error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Create failed",
//         text: err || "Unable to create Rack.",
//       });
//     } finally {
//       setLoadingFormSubmit(false);
//     }
//   };

//   return (
//     <div className="AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">

//       <h2 className="data-center-add-title font-semibold mb-1 text-center">
//         Add Rack
//       </h2>

//       <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
//         {selectedDataCenter
//           ? `Adding Rack to "${selectedDataCenter.name}"`
//           : "Select a Data Center to add a Rack"}
//       </p>

//       <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">

//         {/* Hub Select */}
//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Select Hub</label>
//           <select
//             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             name="hubId"
//             value={formData.hubId}
//             onChange={onchange}
//             disabled={!selectedDataCenter}
//           >
//             <option value="">Select Hub</option>
//             {hubs.map((h) => (
//               <option key={h._id} value={h._id}>
//                 {h.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Sensors Multi-Select */}
//         {formData.hubId && selectedHub?.sensors && (
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">Select Sensors</label>
//             <select
//               multiple
//               className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={formData.sensorIds}
//               onChange={handleSensorSelect}
//             >
//               {selectedHub.sensors.map((s) => (
//                 <option key={s._id} value={s._id}>
//                   {s.sensorName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Row & Column */}
//         <InputField
//           id="row"
//           name="row"
//           label="Row"
//           type="number"
//           value={formData.row}
//           onchange={onchange}
//           placeholder="Row number"
//           icon={<Cpu size={20} />}
//           disabled={!formData.hubId}
//         />
//         <InputField
//           id="col"
//           name="col"
//           label="Column"
//           type="number"
//           value={formData.col}
//           onchange={onchange}
//           placeholder="Column number"
//           icon={<Cpu size={20} />}
//           disabled={!formData.hubId}
//         />

//         {/* Conditions */}
//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Conditions</label>
//           {formData.conditions.map((c, i) => (
//             <div key={i} className="flex items-center gap-2 mb-2">
//               <select
//                 value={c.type}
//                 onChange={(e) => updateCondition(i, "type", e.target.value)}
//                 className="border border-gray-300 rounded-md px-2 py-1"
//               >
//                 <option value="temp">Temperature</option>
//                 <option value="humidity">Humidity</option>
//               </select>
//               <select
//                 value={c.operator}
//                 onChange={(e) => updateCondition(i, "operator", e.target.value)}
//                 className="border border-gray-300 rounded-md px-2 py-1"
//               >
//                 <option value=">">&gt;</option>
//                 <option value="<">&lt;</option>
//               </select>
//               <input
//                 type="number"
//                 value={c.value}
//                 onChange={(e) => updateCondition(i, "value", e.target.value)}
//                 className="border border-gray-300 rounded-md px-2 py-1 w-20"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeCondition(i)}
//                 className="text-red-500 font-bold px-2"
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addCondition}
//             className="text-blue-600 font-semibold mt-1"
//           >
//             + Add Condition
//           </button>
//         </div>

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={!selectedDataCenter || loadingFormSubmit || loading?.submit}
//           className={`w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
//             !selectedDataCenter || loadingFormSubmit ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//         >
//           {loadingFormSubmit ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddRack;













// // src/pages/RackManagement/AddRack.jsx
// import { Cpu } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import { Autocomplete, TextField } from "@mui/material";

// import InputField from "../../components/Inputs/InputField";
// import { createRack, fetchAllRacks } from "../../slices/rackSlice";
// import { fetchHubsByDataCenter } from "../../slices/hubSlice";
// import { useInstallation } from "../../contexts/InstallationContext";

// import "../../styles/pages/management-pages.css";

// const AddRack = () => {
//   const dispatch = useDispatch();
//   const { selectedDataCenter, selectedHub } = useInstallation();

//   const { loading = {} } = useSelector((state) => state.rack || {});
//   const { hubs } = useSelector((state) => state.hub);

//   console.log("Hubs>", hubs)

//   const DEFAULT_CONDITIONS = [
//   { type: "temp", operator: ">", value: 0 },
//   { type: "humidity", operator: ">", value: 0 },
// ];



//   // const [formData, setFormData] = useState({
//   //   hubId: "",
//   //   sensorIds: [],
//   //   row: "",
//   //   col: "",
//   //   conditions: [],
//   // });

//   const [formData, setFormData] = useState({
//   name: "",
//   hubId: "",
//   sensorIds: [],
//   row: "",
//   col: "",
//   conditions: DEFAULT_CONDITIONS
// });


//   const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);

//   useEffect(() => {
//     if (selectedDataCenter?._id) {
//       dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
//     }
//   }, [selectedDataCenter, dispatch]);

//   const onchange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const addCondition = () => {
//     setFormData((p) => ({
//       ...p,
//       conditions: [...p.conditions, { type: "temp", operator: ">", value: 0 }],
//     }));
//   };

//   // const updateCondition = (index, field, value) => {
//   //   const newConditions = [...formData.conditions];
//   //   newConditions[index][field] = field === "value" ? Number(value) : value;
//   //   setFormData((p) => ({ ...p, conditions: newConditions }));
//   // };

//   const updateCondition = (index, field, value) => {
//   const newConditions = [...formData.conditions];
//   newConditions[index][field] =
//     field === "value" ? Number(value) : value;

//   setFormData((p) => ({
//     ...p,
//     conditions: newConditions,
//   }));
// };



//   const handleSubmit = async (e) => {
//     e.preventDefault();

    
//     if (!formData.name.trim()) {
//   return Swal.fire("Warning", "Rack name is required.", "warning");
// }


//     if (!selectedDataCenter?._id) {
//       return Swal.fire("Warning", "Please select a Data Center.", "warning");
//     }

//     if (!formData.hubId) {
//       return Swal.fire("Warning", "Please select a Hub.", "warning");
//     }

//     if (!formData.row || !formData.col) {
//       return Swal.fire("Warning", "Row and Column are required.", "warning");
//     }

//     if (!formData.sensorIds.length) {
//       return Swal.fire("Warning", "Please select at least one sensor.", "warning");
//     }


//     // if (!formData.conditions.length) {
//     //   return Swal.fire("Warning", "Please add at least one condition.", "warning");
//     // }

//     setLoadingFormSubmit(true);

//     try {
//       const payload = {
//         dataCenterId: selectedDataCenter._id,
//         ...formData,
//       };

//       console.log("Payload>>", payload);

//       await dispatch(createRack(payload)).unwrap();

//       Swal.fire("Success", "Rack added successfully.", "success");

//       // setFormData({
//       //   hubId: "",
//       //   sensorIds: [],
//       //   row: "",
//       //   col: "",
//       //   conditions: [],
//       // });

//       setFormData({
//   name: "",
//   hubId: "",
//   sensorIds: [],
//   row: "",
//   col: "",
//   conditions: DEFAULT_CONDITIONS,
// });


//       dispatch(fetchAllRacks());
//     } catch (err) {
//       Swal.fire("Error", err || "Unable to create Rack.", "error");
//     } finally {
//       setLoadingFormSubmit(false);
//     }
//   };

//   return (
//     <div className="p-5 AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">

//       <h2 className="data-center-add-title font-semibold mb-1 text-center">
//         Add Rack
//       </h2>

      


//       <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
//         {selectedDataCenter
//           ? `Adding Rack to "${selectedDataCenter.name}"`
//           : "Select a Data Center to add a Rack"}
//       </p>

//       <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">

//               <InputField
//       id="name"
//       name="name"
//       label="Rack Name"
//       type="text"
//       value={formData.name}
//       onchange={onchange}
//       placeholder="Enter rack name"
//       disabled={!selectedDataCenter}
//     />


//         {/* Row & Column */}
//         <InputField
//           id="row"
//           name="row"
//           label="Row"
//           type="number"
//           value={formData.row}
//           onchange={onchange}
//           placeholder="Row number"
//           icon={<Cpu size={20} />}
//           disabled={!formData.hubId}
//         />

//         <InputField
//           id="col"
//           name="col"
//           label="Column"
//           type="number"
//           value={formData.col}
//           onchange={onchange}
//           placeholder="Column number"
//           icon={<Cpu size={20} />}
//           disabled={!formData.hubId}
//         />

//         {/* Conditions (UNCHANGED) */}
//         {/* <div>
//           <label className="block mb-1 font-medium text-gray-700">
//             Conditions
//           </label>

//           {formData.conditions.map((c, i) => (
//             <div key={i} className="flex items-center gap-2 mb-2">
//               <select
//                 value={c.type}
//                 onChange={(e) =>
//                   updateCondition(i, "type", e.target.value)
//                 }
//                 className="border border-gray-300 rounded-md px-2 py-1"
//               >
//                 <option value="temp">Temperature</option>
//                 <option value="humidity">Humidity</option>
//               </select>

//               <select
//                 value={c.operator}
//                 onChange={(e) =>
//                   updateCondition(i, "operator", e.target.value)
//                 }
//                 className="border border-gray-300 rounded-md px-2 py-1"
//               >
//                 <option value=">">&gt;</option>
//                 <option value="<">&lt;</option>
//               </select>

//               <input
//                 type="number"
//                 value={c.value}
//                 onChange={(e) =>
//                   updateCondition(i, "value", e.target.value)
//                 }
//                 className="border border-gray-300 rounded-md px-2 py-1 w-20"
//               />

//               <button
//                 type="button"
//                 onClick={() => removeCondition(i)}
//                 className="text-red-500 font-bold px-2"
//               >
//                 ×
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addCondition}
//             className="text-blue-600 font-semibold mt-1"
//           >
//             + Add Condition
//           </button>
//         </div> */}

//   {/* Hub Select (Searchable) */}
//         <div>
//           {/* <label className="block mb-1 font-medium text-gray-700">
//             Select Hub
//           </label> */}

//           <Autocomplete
//             options={hubs}
//             getOptionLabel={(option) => option.name || ""}
//             value={hubs.find((h) => h._id === formData.hubId) || null}
//             onChange={(_, value) =>
//               setFormData((p) => ({
//                 ...p,
//                 hubId: value?._id || "",
//                 sensorIds: [],
//               }))
//             }
//             disabled={!selectedDataCenter}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 placeholder="Search Hub"
//                 size="small"
//               />
//             )}
//           />
//         </div>


//         {/* Sensors Multi-Select (Searchable) */}
//         {formData.hubId && selectedHub?.sensors && (
//           <div>
//             {/* <label className="block mb-1 font-medium text-gray-700">
//               Select Sensors
//             </label> */}

//             <Autocomplete
//               multiple
//               options={selectedHub.sensors}
//               getOptionLabel={(option) => option.sensorName || ""}
//               value={selectedHub.sensors.filter((s) =>
//                 formData.sensorIds.includes(s._id)
//               )}
//               onChange={(_, values) =>
//                 setFormData((p) => ({
//                   ...p,
//                   sensorIds: values.map((v) => v._id),
//                 }))
//               }
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   placeholder="Search Sensors"
//                   size="small"
//                 />
//               )}
//             />
//           </div>
//         )}

//         {/* Conditions (FIXED: Temperature & Humidity only) */}
//         <div>
//           <label className="block mb-2 font-medium text-gray-700">
//             Conditions
//           </label>

//           {/* Temperature */}
//           <div className="flex items-center gap-2 mb-3">
//             <span className="w-28 font-medium">Temperature</span>

//             <select
//               value={formData.conditions[0].operator}
//               onChange={(e) =>
//                 updateCondition(0, "operator", e.target.value)
//               }
//               className="border border-gray-300 rounded-md px-2 py-1"
//             >
//               <option value=">">&gt;</option>
//               <option value="<">&lt;</option>
//             </select>

//             <input
//               type="number"
//               value={formData.conditions[0].value}
//               onChange={(e) =>
//                 updateCondition(0, "value", e.target.value)
//               }
//               className="border border-gray-300 rounded-md px-2 py-1 w-24"
//               placeholder="Value"
//             />
//           </div>

//           {/* Humidity */}
//           <div className="flex items-center gap-2">
//             <span className="w-28 font-medium">Humidity</span>

//             <select
//               value={formData.conditions[1].operator}
//               onChange={(e) =>
//                 updateCondition(1, "operator", e.target.value)
//               }
//               className="border border-gray-300 rounded-md px-2 py-1"
//             >
//               <option value=">">&gt;</option>
//               <option value="<">&lt;</option>
//             </select>

//             <input
//               type="number"
//               value={formData.conditions[1].value}
//               onChange={(e) =>
//                 updateCondition(1, "value", e.target.value)
//               }
//               className="border border-gray-300 rounded-md px-2 py-1 w-24"
//               placeholder="Value"
//             />
//           </div>
//         </div>


//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={!selectedDataCenter || loadingFormSubmit || loading?.submit}
//           className={`w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md ${
//             !selectedDataCenter || loadingFormSubmit
//               ? "opacity-70 cursor-not-allowed"
//               : ""
//           }`}
//         >
//           {loadingFormSubmit ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddRack;




// Fixing UI and Next/Back Procedure

// src/pages/RackManagement/AddRack.jsx
import { Cpu } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { Autocomplete, TextField } from "@mui/material";

import InputField from "../../components/Inputs/InputField";
import { createRack, fetchAllRacks } from "../../slices/rackSlice";
import { fetchHubsByDataCenter } from "../../slices/hubSlice";
import { useInstallation } from "../../contexts/InstallationContext";

import "../../styles/pages/management-pages.css";

const AddRack = ({ disabled = false, onNext, onBack }) => {
  const dispatch = useDispatch();
  const { selectedDataCenter, selectedHub, setSelectedHub, selectedRack, setSelectedRack } = useInstallation();

  const { loading = {} } = useSelector((state) => state.rack || {});
  const { hubs = [] } = useSelector((state) => state.hub || {});

  const DEFAULT_CONDITIONS = [
    { type: "temp", operator: ">", value: 0 },
    { type: "humidity", operator: ">", value: 0 },
  ];

  const [formData, setFormData] = useState({
    name: "",
    hubId: "",
    sensorIds: [],
    row: "",
    col: "",
    conditions: DEFAULT_CONDITIONS,
  });

  const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);

  useEffect(() => {
    if (selectedDataCenter?._id) {
      dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
    }
  }, [selectedDataCenter, dispatch]);

  // helper for inputs
  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
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

  // When user selects a hub from the Autocomplete we also update the installation selectedHub
  const onHubChange = (_, value) => {
    setFormData((p) => ({ ...p, hubId: value?._id || "" , sensorIds: [] }));
    // keep installation-wide selectedHub in sync so sensors list loads
    if (value) setSelectedHub(value);
  };

  // required check: If user has typed any of the required inputs we consider the form "active"
  const hasFormValue = Boolean(
    (formData.name || "").trim() ||
      formData.hubId ||
      formData.row ||
      formData.col ||
      (formData.sensorIds && formData.sensorIds.length > 0)
  );

  // canProceed = either installation selected rack exists OR form has all required fields
  const formValid =
    (formData.name || "").trim() &&
    formData.hubId &&
    formData.row &&
    formData.col &&
    formData.sensorIds &&
    formData.sensorIds.length > 0;

  const canProceed = Boolean(selectedRack || formValid);

  // handle Save & Next (form takes precedence)
  const handleSaveAndNext = async () => {
    // If the user typed in the form (form has any value), we validate/save and set it as selectedRack
    if (hasFormValue) {
      if (!formValid) {
        return Swal.fire({
          icon: "warning",
          title: "Missing fields",
          text: "Please fill required fields: name, hub, row, column and at least one sensor.",
        });
      }

      if (!selectedDataCenter?._id) {
        return Swal.fire({
          icon: "warning",
          title: "Missing Data Center",
          text: "Please select a Data Center before creating a Rack.",
        });
      }

      setLoadingFormSubmit(true);

      try {
        const payload = {
          dataCenterId: selectedDataCenter._id,
          ...formData,
        };

        const created = await dispatch(createRack(payload)).unwrap();
        const createdRack = created?.data ?? created;

        // set created rack as the installation selection
        setSelectedRack(createdRack);

        Swal.fire({
          icon: "success",
          title: "Rack created",
          text: `Rack "${createdRack?.name || formData.name}" added successfully.`,
          timer: 1200,
          showConfirmButton: false,
        });

        // reset local form (keep selectedHub)
        setFormData({
          name: "",
          hubId: "",
          sensorIds: [],
          row: "",
          col: "",
          conditions: DEFAULT_CONDITIONS,
        });

        // refresh list
        dispatch(fetchAllRacks());

        // next step
        onNext?.();
        return;
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
    }

    // If form empty but a rack is selected (from list) — proceed directly
    if (selectedRack) {
      onNext?.();
      return;
    }

    // fallback
    Swal.fire({
      icon: "warning",
      title: "Missing data",
      text: "Please select a rack from the list or enter the rack details.",
    });
  };

  // remove Save button; use footer instead. Keep UI identical above but remove the existing Save button.

  return (
    <div className="h-full p-5 AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-between bg-[#EEF3F9] border border-[#E5E7EB]">
      <div>
        <h2 className="data-center-add-title font-semibold mb-1 text-center">Add Rack</h2>

        <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
          {selectedDataCenter ? `Adding Rack to "${selectedDataCenter.name}"` : "Select a Data Center to add a Rack"}
        </p>

        <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">
          <InputField
            id="name"
            name="name"
            label="Rack Name"
            type="text"
            value={formData.name}
            onchange={onchange}
            placeholder="Enter rack name"
            disabled={!selectedDataCenter}
          />

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

          <div>
            <Autocomplete
              options={hubs}
              getOptionLabel={(option) => option.name || ""}
              value={hubs.find((h) => h._id === formData.hubId) || null}
              onChange={onHubChange}
              disabled={!selectedDataCenter}
              renderInput={(params) => <TextField {...params} placeholder="Search Hub" size="small" />}
            />
          </div>

          {formData.hubId && selectedHub?.sensors && (
            <div>
              <Autocomplete
                multiple
                options={selectedHub.sensors}
                getOptionLabel={(option) => option.sensorName || ""}
                value={selectedHub.sensors.filter((s) => formData.sensorIds.includes(s._id))}
                onChange={(_, values) =>
                  setFormData((p) => ({
                    ...p,
                    sensorIds: values.map((v) => v._id),
                  }))
                }
                renderInput={(params) => <TextField {...params} placeholder="Search Sensors" size="small" />}
              />
            </div>
          )}

          {/* Conditions (Temperature & Humidity) */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Conditions</label>

            {/* Temperature */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-28 font-medium">Temperature</span>

              <select
                value={formData.conditions[0].operator}
                onChange={(e) => updateCondition(0, "operator", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
              </select>

              <input
                type="number"
                value={formData.conditions[0].value}
                onChange={(e) => updateCondition(0, "value", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 w-24"
                placeholder="Value"
              />
            </div>

            {/* Humidity */}
            <div className="flex items-center gap-2">
              <span className="w-28 font-medium">Humidity</span>

              <select
                value={formData.conditions[1].operator}
                onChange={(e) => updateCondition(1, "operator", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
              </select>

              <input
                type="number"
                value={formData.conditions[1].value}
                onChange={(e) => updateCondition(1, "value", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 w-24"
                placeholder="Value"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Back / Save & Next */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
        <button
          type="button"
          onClick={() => onBack?.()}
          className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={handleSaveAndNext}
          disabled={!canProceed || loadingFormSubmit || loading?.submit || disabled}
          className={`px-6 py-2 rounded-md text-white font-semibold ${
            canProceed && !loadingFormSubmit && !disabled ? "bg-[#1E64D9] hover:bg-[#1557C7]" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loadingFormSubmit ? "Saving..." : hasFormValue ? "Save & Next → AC Kits" : "Next → AC Kits"}
        </button>
      </div>
    </div>
  );
};

export default AddRack;

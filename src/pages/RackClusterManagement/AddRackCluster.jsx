// import { Layers, Server } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import InputField from "../../components/Inputs/InputField";
// import { createRackCluster, fetchRackClustersByDataCenter } from "../../slices/rackClusterSlice";
// import { fetchAllAckits } from "../../slices/ackitSlice";
// // import { fetchAllRacks } from "../../slices/rackSlice";
// import { useInstallation } from "../../contexts/InstallationContext";

// import "../../styles/pages/management-pages.css";
// // import { fetchRacksByDataCenterId } from "../../slices/rackSlice";

// const AddRackCluster = () => {
//   const dispatch = useDispatch();
//   const { selectedAcKit, selectedDataCenter } = useInstallation();

//   const { ackits } = useSelector((state) => state.ackit);
//   const { racks } = useSelector((state) => state.rack);
//   const { loading } = useSelector((state) => state.rackCluster);

//   const [clusterName, setClusterName] = useState("");
//   const [ackitName, setAckitName] = useState("");
//   const [selectedRacks, setSelectedRacks] = useState([]);

// useEffect(() => {
//   dispatch(fetchAllAckits());

//   if (selectedDataCenter?._id) {
//     // Fetch only racks for this Data Center
//     // dispatch(fetchRacksByDataCenterId(selectedDataCenter._id));
//     dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));
//   } else {
//     // optional: clear racks if no Data Center selected
//     setSelectedRacks([]);
//   }
// }, [dispatch, selectedDataCenter]);


//   const toggleRack = (rackId) => {
//     setSelectedRacks((prev) =>
//       prev.includes(rackId)
//         ? prev.filter((id) => id !== rackId)
//         : [...prev, rackId]
//     );
//   };

//   // const handleSubmit = async () => {
//   //   if (!clusterName.trim()) {
//   //     Swal.fire("Missing Field", "Cluster name is required", "warning");
//   //     return;
//   //   }

//   //   if (!ackitName) {
//   //     Swal.fire("Missing Field", "Please select an Ackit", "warning");
//   //     return;
//   //   }

//   //   if (selectedRacks.length === 0) {
//   //     Swal.fire("Missing Field", "Select at least one Rack", "warning");
//   //     return;
//   //   }

//   //   try {
//   //     // const payload = {
//   //     //   name: clusterName.trim(),
//   //     //   ackitName,
//   //     //   racks: selectedRacks,
//   //     // };

//   //     const payload = {
//   //     name: clusterName.trim(),
//   //     ackitName,
//   //     racks: selectedRacks,
//   //     dataCenterId: selectedAcKit?.dataCenterId || selectedAcKit?._id, // get from AC Kit
//   //   };


//   //     console.log("PayLoad>>", payload)

//   //     await dispatch(createRackCluster(payload)).unwrap();

//   //     Swal.fire("Success", "Rack Cluster created successfully", "success");

//   //     setClusterName("");
//   //     setAckitName("");
//   //     setSelectedRacks([]);
//   //   } catch (err) {
//   //     Swal.fire("Error", err || "Failed to create Rack Cluster", "error");
//   //   }
//   // };





  
// // const handleSubmit = async () => {
// //   // if (!clusterName.trim()) return Swal.fire("Missing Field", "Cluster name is required", "warning");
// //   // if (!ackitName) return Swal.fire("Missing Field", "Please select an Ackit", "warning");
// //   // if (selectedRacks.length === 0) return Swal.fire("Missing Field", "Select at least one Rack", "warning");

// //   // if (!selectedAcKit?.dataCenterId) {
// //   //   return Swal.fire("Error", "Selected AC Kit does not have a Data Center ID", "error");
// //   // }

// //     console.log("PayLoad>>", selectedAcKit);

// //   try {
// //     const payload = {
// //       name: clusterName.trim(),
// //       ackitName,
// //       racks: selectedRacks,
// //       dataCenterId: selectedAcKit.dataCenterId,
// //     };

  

// //     await dispatch(createRackCluster(payload)).unwrap();

// //     Swal.fire("Success", "Rack Cluster created successfully", "success");

// //     setClusterName("");
// //     setAckitName("");
// //     setSelectedRacks([]);
// //   } catch (err) {
// //     Swal.fire("Error", err || "Failed to create Rack Cluster", "error");
// //   }
// // };



// // const handleSubmit = async () => {
// //   if (!clusterName.trim()) return Swal.fire("Missing Field", "Cluster name is required", "warning");
// //   if (!ackitName) return Swal.fire("Missing Field", "Please select an Ackit", "warning");
// //   if (selectedRacks.length === 0) return Swal.fire("Missing Field", "Select at least one Rack", "warning");

// //   if (!selectedAcKit?.dataCenterId) {
// //     return Swal.fire("Error", "Selected AC Kit does not have a Data Center ID", "error");
// //   }

// //   try {
// //     const payload = {
// //       name: clusterName.trim(),
// //       ackitName,
// //       racks: selectedRacks,
// //       dataCenterId: selectedAcKit.dataCenterId,
// //     };

// //     console.log("PayLoad>>", payload);

// //     await dispatch(createRackCluster(payload)).unwrap();

// //     Swal.fire("Success", "Rack Cluster created successfully", "success");

// //     setClusterName("");
// //     setAckitName("");
// //     setSelectedRacks([]);
// //   } catch (err) {
// //     Swal.fire("Error", err || "Failed to create Rack Cluster", "error");
// //   }
// // };


// // const handleSubmit = async () => {
// //   if (!clusterName.trim())
// //     return Swal.fire("Missing Field", "Cluster name is required", "warning");
// //   if (!ackitName)
// //     return Swal.fire("Missing Field", "Please select an AC Kit", "warning");
// //   if (selectedRacks.length === 0)
// //     return Swal.fire("Missing Field", "Select at least one Rack", "warning");

// //   if (!selectedDataCenter?._id) {
// //     return Swal.fire(
// //       "Error",
// //       "No Data Center selected for this installation",
// //       "error"
// //     );
// //   }

// //   try {
// //     const payload = {
// //       name: clusterName.trim(),
// //       ackitName,
// //       racks: selectedRacks,
// //       dataCenterId: selectedDataCenter._id,
// //     };

// //     console.log("Payload>>", payload);

// //     await dispatch(createRackCluster(payload)).unwrap();

// //     Swal.fire("Success", "Rack Cluster created successfully", "success");

// //     setClusterName("");
// //     setAckitName("");
// //     setSelectedRacks([]);
// //   } catch (err) {
// //     Swal.fire("Error", err || "Failed to create Rack Cluster", "error");
// //   }
// // };



// const handleSubmit = async () => {
//   if (!clusterName.trim())
//     return Swal.fire("Missing Field", "Cluster name is required", "warning");
//   if (!ackitName)
//     return Swal.fire("Missing Field", "Please select an AC Kit", "warning");
//   if (selectedRacks.length === 0)
//     return Swal.fire("Missing Field", "Select at least one Rack", "warning");

//   if (!selectedDataCenter?._id) {
//     return Swal.fire(
//       "Error",
//       "No Data Center selected for this installation",
//       "error"
//     );
//   }

//   try {
//     const payload = {
//       name: clusterName.trim(),
//       ackitName,
//       racks: selectedRacks,
//       dataCenterId: selectedDataCenter._id,
//     };

//     console.log("Payload>>", payload);

//     await dispatch(createRackCluster(payload)).unwrap();

//     Swal.fire("Success", "Rack Cluster created successfully", "success");

//     setClusterName("");
//     setAckitName("");
//     setSelectedRacks([]);
//   } catch (err) {
//     Swal.fire("Error", err || "Failed to create Rack Cluster", "error");
//   }
// };

//   return (
//     <div className="p-5 AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">

//       <h2 className="data-center-add-title font-semibold mb-1 text-center">
//         Add Rack Cluster
//       </h2>

//       <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
//         Group racks under an Ackit
//       </p>

//       <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">

//         {/* Cluster Name */}
//         <InputField
//           id="clusterName"
//           name="clusterName"
//           label="Cluster Name"
//           type="text"
//           value={clusterName}
//           onchange={(e) => setClusterName(e.target.value)}
//           placeholder="Cluster Name"
//           icon={<Layers size={20} />}
//         />

//         {/* Ackit Dropdown */}
//         <select
//           value={ackitName}
//           onChange={(e) => setAckitName(e.target.value)}
//           className="w-full border rounded-md px-3 py-2"
//         >
//           <option value="">Select Ackit</option>
//           {ackits.map((a) => (
//             <option key={a._id} value={a.name}>
//               {a.name}
//             </option>
//           ))}
//         </select>

//         {/* Rack Selection */}
//         <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
//           {racks.map((rack) => (
//             <label key={rack._id} className="flex items-center gap-2 mb-1">
//               <input
//                 type="checkbox"
//                 checked={selectedRacks.includes(rack._id)}
//                 onChange={() => toggleRack(rack._id)}
//               />
//               {rack.name}
//             </label>
//           ))}
//         </div>

//         {/* Save Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading?.submit}
//           className="w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 rounded-md"
//         >
//           {loading?.submit ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddRackCluster;



// Adding UI Fixes
// import { Layers, Server } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import InputField from "../../components/Inputs/InputField";
// import { createRackCluster, fetchRackClustersByDataCenter } from "../../slices/rackClusterSlice";
// import { fetchAllAckits } from "../../slices/ackitSlice";
// // import { fetchAllRacks } from "../../slices/rackSlice";
// import { useInstallation } from "../../contexts/InstallationContext";

// import "../../styles/pages/management-pages.css";
// // import { fetchRacksByDataCenterId } from "../../slices/rackSlice";

// const AddRackCluster = () => {
//   const dispatch = useDispatch();
//   const { selectedAcKit, selectedDataCenter } = useInstallation();

//   const { ackits } = useSelector((state) => state.ackit);
//   const { racks } = useSelector((state) => state.rack);
//   const { loading } = useSelector((state) => state.rackCluster);

//   const [clusterName, setClusterName] = useState("");
//   const [ackitName, setAckitName] = useState("");
//   const [selectedRacks, setSelectedRacks] = useState([]);

// useEffect(() => {
//   dispatch(fetchAllAckits());

//   if (selectedDataCenter?._id) {
//     // Fetch only racks for this Data Center
//     // dispatch(fetchRacksByDataCenterId(selectedDataCenter._id));
//     dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));
//   } else {
//     // optional: clear racks if no Data Center selected
//     setSelectedRacks([]);
//   }
// }, [dispatch, selectedDataCenter]);


//   const toggleRack = (rackId) => {
//     setSelectedRacks((prev) =>
//       prev.includes(rackId)
//         ? prev.filter((id) => id !== rackId)
//         : [...prev, rackId]
//     );
//   };



// const handleSubmit = async () => {
//   if (!clusterName.trim())
//     return Swal.fire("Missing Field", "Cluster name is required", "warning");
//   if (!ackitName)
//     return Swal.fire("Missing Field", "Please select an AC Kit", "warning");
//   if (selectedRacks.length === 0)
//     return Swal.fire("Missing Field", "Select at least one Rack", "warning");

//   if (!selectedDataCenter?._id) {
//     return Swal.fire(
//       "Error",
//       "No Data Center selected for this installation",
//       "error"
//     );
//   }

//   try {
//     const payload = {
//       name: clusterName.trim(),
//       ackitName,
//       racks: selectedRacks,
//       dataCenterId: selectedDataCenter._id,
//     };

//     console.log("Payload>>", payload);

//     await dispatch(createRackCluster(payload)).unwrap();

//     Swal.fire("Success", "Rack Cluster created successfully", "success");

//     setClusterName("");
//     setAckitName("");
//     setSelectedRacks([]);
//   } catch (err) {
//     Swal.fire("Error", err || "Failed to create Rack Cluster", "error");
//   }
// };

//   return (
//     <div className="p-5 AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">

//       <h2 className="data-center-add-title font-semibold mb-1 text-center">
//         Add Rack Cluster
//       </h2>

//       <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
//         Group racks under an Ackit
//       </p>

//       <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">

//         {/* Cluster Name */}
//         <InputField
//           id="clusterName"
//           name="clusterName"
//           label="Cluster Name"
//           type="text"
//           value={clusterName}
//           onchange={(e) => setClusterName(e.target.value)}
//           placeholder="Cluster Name"
//           icon={<Layers size={20} />}
//         />

//         {/* Ackit Dropdown */}
//         <select
//           value={ackitName}
//           onChange={(e) => setAckitName(e.target.value)}
//           className="w-full border rounded-md px-3 py-2"
//         >
//           <option value="">Select Ackit</option>
//           {ackits.map((a) => (
//             <option key={a._id} value={a.name}>
//               {a.name}
//             </option>
//           ))}
//         </select>

//         {/* Rack Selection */}
//         <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
//           {racks.map((rack) => (
//             <label key={rack._id} className="flex items-center gap-2 mb-1">
//               <input
//                 type="checkbox"
//                 checked={selectedRacks.includes(rack._id)}
//                 onChange={() => toggleRack(rack._id)}
//               />
//               {rack.name}
//             </label>
//           ))}
//         </div>

//         {/* Save Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading?.submit}
//           className="w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 rounded-md"
//         >
//           {loading?.submit ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddRackCluster;









// // Adding UI Fixes and Solving Next/Back Problem

// import { Layers } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import InputField from "../../components/Inputs/InputField";
// import { createRackCluster, fetchRackClustersByDataCenter } from "../../slices/rackClusterSlice";
// import { fetchAllAckits } from "../../slices/ackitSlice";
// import { useInstallation } from "../../contexts/InstallationContext";

// import "../../styles/pages/management-pages.css";

// const AddRackCluster = ({ onBack, onFinish }) => {
//   const dispatch = useDispatch();
//   const { selectedRackCluster, setSelectedRackCluster, selectedDataCenter } = useInstallation();

//   const { ackits = [] } = useSelector((state) => state.ackit || {});
//   const { racks = [] } = useSelector((state) => state.rack || {});
//   const { loading = {} } = useSelector((state) => state.rackCluster || {});

//   const [clusterName, setClusterName] = useState("");
//   const [ackitName, setAckitName] = useState("");
//   const [selectedRacks, setSelectedRacks] = useState([]);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     dispatch(fetchAllAckits());
//     if (selectedDataCenter?._id) {
//       dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));
//     } else {
//       setSelectedRacks([]);
//     }
//   }, [dispatch, selectedDataCenter]);

//   const toggleRack = (rackId) => {
//     setSelectedRacks((prev) =>
//       prev.includes(rackId) ? prev.filter((id) => id !== rackId) : [...prev, rackId]
//     );
//   };

//   // Detect if user typed anything in the form (explicit user intent)
//   const hasFormValue =
//     clusterName.trim().length > 0 || !!ackitName || selectedRacks.length > 0;

//   // canFinish true if either installation selection exists OR user typed valid form values
//   const canFinish = Boolean(
//     selectedRackCluster || (clusterName.trim() && ackitName && selectedRacks.length > 0)
//   );

//   const handleCreateAndFinish = async () => {
//     // Priority 1: If user selected a cluster from the LIST and did NOT type anything in the form,
//     // just consider the clicked list item as the installation selection and finish.
//     if (selectedRackCluster && !hasFormValue) {
//       // installation selection already set in context
//       onFinish?.();
//       return;
//     }

//     // Otherwise the user attempted to use the form: validate required fields
//     const name = clusterName.trim();
//     if (!name) {
//       return Swal.fire("Missing Field", "Cluster name is required", "warning");
//     }
//     if (!ackitName) {
//       return Swal.fire("Missing Field", "Please select an AC Kit", "warning");
//     }
//     if (selectedRacks.length === 0) {
//       return Swal.fire("Missing Field", "Select at least one Rack", "warning");
//     }
//     if (!selectedDataCenter?._id) {
//       return Swal.fire("Error", "No Data Center selected for this installation", "error");
//     }

//     setSubmitting(true);
//     try {
//       const payload = {
//         name,
//         ackitName,
//         racks: selectedRacks,
//         dataCenterId: selectedDataCenter._id,
//       };

//       const created = await dispatch(createRackCluster(payload)).unwrap();
//       // some thunks return created object in different shapes — try to extract id/data
//       const createdCluster = created?.data ?? created;

//       Swal.fire("Success", "Rack Cluster created successfully", "success");

//       // mark created cluster as installation selection
//       setSelectedRackCluster(createdCluster);

//       // reset local form
//       setClusterName("");
//       setAckitName("");
//       setSelectedRacks([]);

//       // refresh listing
//       dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));

//       // call finish handler if available
//       onFinish?.();
//     } catch (err) {
//       Swal.fire("Error", err || "Failed to create Rack Cluster", "error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="h-full p-5 AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-between bg-[#EEF3F9] border border-[#E5E7EB]">
//       {/* <div className=""> */}
//             <div className="flex-1 flex flex-col justify-center">
//         <h2 className="data-center-add-title font-semibold mb-1 text-center">Add Rack Cluster</h2>
//         <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">Group racks under an Ackit</p>

//         <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">
//           <InputField
//             id="clusterName"
//             name="clusterName"
//             label="Cluster Name"
//             type="text"
//             value={clusterName}
//             onchange={(e) => setClusterName(e.target.value)}
//             placeholder="Cluster Name"
//             icon={<Layers size={20} />}
//           />

//           <select value={ackitName} onChange={(e) => setAckitName(e.target.value)} className="w-full border rounded-md px-3 py-2">
//             <option value="">Select Ackit</option>
//             {ackits.map((a) => (
//               <option key={a._id} value={a.name}>
//                 {a.name}
//               </option>
//             ))}
//           </select>

//           <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
//             {racks.map((rack) => (
//               <label key={rack._id} className="flex items-center gap-2 mb-1">
//                 <input type="checkbox" checked={selectedRacks.includes(rack._id)} onChange={() => toggleRack(rack._id)} />
//                 {rack.name}
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Footer: Back + Finish */}
//       <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3 justify-between items-center">
//         <button type="button" onClick={() => onBack?.()} className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
//           Back
//         </button>

//         <button
//           type="button"
//           onClick={handleCreateAndFinish}
//           disabled={!canFinish || submitting || loading?.submit}
//           className={`px-6 py-2 rounded-md text-white font-semibold ${
//             canFinish && !submitting ? "bg-[#1E64D9] hover:bg-[#1557C7]" : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           {submitting || loading?.submit ? "Saving..." : selectedRackCluster ? "Finish" : "Save & Finish"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddRackCluster;





// Fixing the API for acKit Id previously we are using Ackit Name
// Adding UI Fixes and Solving Next/Back Problem
import { Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import InputField from "../../components/Inputs/InputField";
import {
  createRackCluster,
  fetchRackClustersByDataCenter,
} from "../../slices/rackClusterSlice";
import { fetchAllAckits } from "../../slices/ackitSlice";
import { useInstallation } from "../../contexts/InstallationContext";

import "../../styles/pages/management-pages.css";

const AddRackCluster = ({ onBack, onFinish }) => {
  const dispatch = useDispatch();

  const {
    selectedRackCluster,
    setSelectedRackCluster,
    selectedDataCenter,
  } = useInstallation();

  const { ackits = [] } = useSelector((state) => state.ackit || {});
  const { racks = [] } = useSelector((state) => state.rack || {});
  const { loading = {} } = useSelector((state) => state.rackCluster || {});

  const [clusterName, setClusterName] = useState("");
  const [ackitId, setAckitId] = useState(""); // ✅ FIXED
  const [selectedRacks, setSelectedRacks] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchAllAckits());

    if (selectedDataCenter?._id) {
      dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));
    } else {
      setSelectedRacks([]);
    }
  }, [dispatch, selectedDataCenter]);

  const toggleRack = (rackId) => {
    setSelectedRacks((prev) =>
      prev.includes(rackId)
        ? prev.filter((id) => id !== rackId)
        : [...prev, rackId]
    );
  };

  // Detect user intent
  const hasFormValue =
    clusterName.trim() || ackitId || selectedRacks.length > 0;

  // Can finish if:
  // 1. User selected from list
  // 2. OR valid form filled
  // const canFinish = Boolean(
  //   selectedRackCluster ||
  //     (clusterName.trim() && ackitId && selectedRacks.length > 0)
  // );


  const canFinish =
  clusterName.trim() && ackitId && selectedRacks.length > 0;



  const handleCreateAndFinish = async () => {
    // ✅ CASE 1: User selected from list → just finish
    if (!hasFormValue) {
      onFinish?.();
      return;
    }

    // ✅ CASE 2: User is using form → validate
    if (!clusterName.trim()) {
      return Swal.fire("Missing Field", "Cluster name is required", "warning");
    }

    if (!ackitId) {
      return Swal.fire("Missing Field", "Please select an AC Kit", "warning");
    }

    if (selectedRacks.length === 0) {
      return Swal.fire(
        "Missing Field",
        "Select at least one Rack",
        "warning"
      );
    }

    if (!selectedDataCenter?._id) {
      return Swal.fire(
        "Error",
        "No Data Center selected for this installation",
        "error"
      );
    }

    setSubmitting(true);

    try {
      const payload = {
        name: clusterName.trim(),
        dataCenterId: selectedDataCenter._id,
        ackitId,               // ✅ API-CORRECT
        racks: selectedRacks,  // ✅ API-CORRECT
      };

      const created = await dispatch(createRackCluster(payload)).unwrap();

      
      setSelectedRackCluster(created);
      
      // Reset form
      setClusterName("");
      setAckitId("");
      setSelectedRacks([]);

      dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));

      //   await Swal.fire({
      //   icon: "success",
      //   title: "🎉 Installation Complete!",
      //   text: "Your rack cluster has been set up successfully.",
      //   confirmButtonText: "Finish",
      //   allowOutsideClick: false,
      // });
      

      // onFinish?.();


        // New: give user choice to stay or go to Step 1
  const result = await Swal.fire({
    icon: "success",
    title: "🎉 Installation Complete!",
    text: "Your rack cluster has been set up successfully.",
    showDenyButton: true,
    confirmButtonText: "Stay on this page",
    denyButtonText: "Go to Step 1",
    allowOutsideClick: false,
  });

  // mark step completed always (parent will update completedIndex)
  if (result.isDenied) {
    // user wants to go to Step 1
    onFinish?.({ gotoStep: 0 });
  } else {
    // user stays — just mark completed
    onFinish?.(); // parent will set completedIndex and keep activeStep unchanged
  }


    } catch (err) {
      Swal.fire("Error", err || "Failed to create Rack Cluster", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full p-5 AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-between bg-[#EEF3F9] border border-[#E5E7EB]">
           <div className="flex-1 flex flex-col justify-center">
        <h2 className="data-center-add-title text-center font-semibold">
          Add Rack Cluster
        </h2>

        <div className="space-y-4 max-w-sm mx-auto mt-6">
          <InputField
            label="Cluster Name"
            value={clusterName}
            onchange={(e) => setClusterName(e.target.value)}
            icon={<Layers size={20} />}
          />

          {/* ✅ Ackit Dropdown */}
          <select
            value={ackitId}
            onChange={(e) => setAckitId(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select AC Kit</option>
            {ackits.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>

          {/* ✅ Racks */}
          <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
            {racks.map((rack) => (
              <label key={rack._id} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={selectedRacks.includes(rack._id)}
                  onChange={() => toggleRack(rack._id)}
                />
                {rack.name}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 flex justify-between">
        {/* <button
          onClick={onBack}
          className="px-4 py-2 rounded-md border bg-white"
        >
          Back
        </button> */}

          <button
          type="button"
          onClick={() => onBack?.()}
          className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          ← Back
        </button>

        <button
          onClick={handleCreateAndFinish}
          disabled={!canFinish || submitting}
          className={`px-6 py-2 rounded-md text-white font-semibold ${
            canFinish
              ? "bg-[#1E64D9] hover:bg-[#1557C7]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {submitting ? "Saving..." : selectedRackCluster ? "Finish" : "Save & Finish"}
        </button>
      </div>
    </div>
  );
};

export default AddRackCluster;

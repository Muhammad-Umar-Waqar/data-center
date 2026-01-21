import { Layers, Server } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import InputField from "../../components/Inputs/InputField";
import { createRackCluster, fetchRackClustersByDataCenter } from "../../slices/rackClusterSlice";
import { fetchAllAckits } from "../../slices/ackitSlice";
// import { fetchAllRacks } from "../../slices/rackSlice";
import { useInstallation } from "../../contexts/InstallationContext";

import "../../styles/pages/management-pages.css";
// import { fetchRacksByDataCenterId } from "../../slices/rackSlice";

const AddRackCluster = () => {
  const dispatch = useDispatch();
  const { selectedAcKit, selectedDataCenter } = useInstallation();

  const { ackits } = useSelector((state) => state.ackit);
  const { racks } = useSelector((state) => state.rack);
  const { loading } = useSelector((state) => state.rackCluster);

  const [clusterName, setClusterName] = useState("");
  const [ackitName, setAckitName] = useState("");
  const [selectedRacks, setSelectedRacks] = useState([]);

useEffect(() => {
  dispatch(fetchAllAckits());

  if (selectedDataCenter?._id) {
    // Fetch only racks for this Data Center
    // dispatch(fetchRacksByDataCenterId(selectedDataCenter._id));
    dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));
  } else {
    // optional: clear racks if no Data Center selected
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

  // const handleSubmit = async () => {
  //   if (!clusterName.trim()) {
  //     Swal.fire("Missing Field", "Cluster name is required", "warning");
  //     return;
  //   }

  //   if (!ackitName) {
  //     Swal.fire("Missing Field", "Please select an Ackit", "warning");
  //     return;
  //   }

  //   if (selectedRacks.length === 0) {
  //     Swal.fire("Missing Field", "Select at least one Rack", "warning");
  //     return;
  //   }

  //   try {
  //     // const payload = {
  //     //   name: clusterName.trim(),
  //     //   ackitName,
  //     //   racks: selectedRacks,
  //     // };

  //     const payload = {
  //     name: clusterName.trim(),
  //     ackitName,
  //     racks: selectedRacks,
  //     dataCenterId: selectedAcKit?.dataCenterId || selectedAcKit?._id, // get from AC Kit
  //   };


  //     console.log("PayLoad>>", payload)

  //     await dispatch(createRackCluster(payload)).unwrap();

  //     Swal.fire("Success", "Rack Cluster created successfully", "success");

  //     setClusterName("");
  //     setAckitName("");
  //     setSelectedRacks([]);
  //   } catch (err) {
  //     Swal.fire("Error", err || "Failed to create Rack Cluster", "error");
  //   }
  // };





  
// const handleSubmit = async () => {
//   // if (!clusterName.trim()) return Swal.fire("Missing Field", "Cluster name is required", "warning");
//   // if (!ackitName) return Swal.fire("Missing Field", "Please select an Ackit", "warning");
//   // if (selectedRacks.length === 0) return Swal.fire("Missing Field", "Select at least one Rack", "warning");

//   // if (!selectedAcKit?.dataCenterId) {
//   //   return Swal.fire("Error", "Selected AC Kit does not have a Data Center ID", "error");
//   // }

//     console.log("PayLoad>>", selectedAcKit);

//   try {
//     const payload = {
//       name: clusterName.trim(),
//       ackitName,
//       racks: selectedRacks,
//       dataCenterId: selectedAcKit.dataCenterId,
//     };

  

//     await dispatch(createRackCluster(payload)).unwrap();

//     Swal.fire("Success", "Rack Cluster created successfully", "success");

//     setClusterName("");
//     setAckitName("");
//     setSelectedRacks([]);
//   } catch (err) {
//     Swal.fire("Error", err || "Failed to create Rack Cluster", "error");
//   }
// };



// const handleSubmit = async () => {
//   if (!clusterName.trim()) return Swal.fire("Missing Field", "Cluster name is required", "warning");
//   if (!ackitName) return Swal.fire("Missing Field", "Please select an Ackit", "warning");
//   if (selectedRacks.length === 0) return Swal.fire("Missing Field", "Select at least one Rack", "warning");

//   if (!selectedAcKit?.dataCenterId) {
//     return Swal.fire("Error", "Selected AC Kit does not have a Data Center ID", "error");
//   }

//   try {
//     const payload = {
//       name: clusterName.trim(),
//       ackitName,
//       racks: selectedRacks,
//       dataCenterId: selectedAcKit.dataCenterId,
//     };

//     console.log("PayLoad>>", payload);

//     await dispatch(createRackCluster(payload)).unwrap();

//     Swal.fire("Success", "Rack Cluster created successfully", "success");

//     setClusterName("");
//     setAckitName("");
//     setSelectedRacks([]);
//   } catch (err) {
//     Swal.fire("Error", err || "Failed to create Rack Cluster", "error");
//   }
// };


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



const handleSubmit = async () => {
  if (!clusterName.trim())
    return Swal.fire("Missing Field", "Cluster name is required", "warning");
  if (!ackitName)
    return Swal.fire("Missing Field", "Please select an AC Kit", "warning");
  if (selectedRacks.length === 0)
    return Swal.fire("Missing Field", "Select at least one Rack", "warning");

  if (!selectedDataCenter?._id) {
    return Swal.fire(
      "Error",
      "No Data Center selected for this installation",
      "error"
    );
  }

  try {
    const payload = {
      name: clusterName.trim(),
      ackitName,
      racks: selectedRacks,
      dataCenterId: selectedDataCenter._id,
    };

    console.log("Payload>>", payload);

    await dispatch(createRackCluster(payload)).unwrap();

    Swal.fire("Success", "Rack Cluster created successfully", "success");

    setClusterName("");
    setAckitName("");
    setSelectedRacks([]);
  } catch (err) {
    Swal.fire("Error", err || "Failed to create Rack Cluster", "error");
  }
};

  return (
    <div className="AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">

      <h2 className="data-center-add-title font-semibold mb-1 text-center">
        Add Rack Cluster
      </h2>

      <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
        Group racks under an Ackit
      </p>

      <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">

        {/* Cluster Name */}
        <InputField
          id="clusterName"
          name="clusterName"
          label="Cluster Name"
          type="text"
          value={clusterName}
          onchange={(e) => setClusterName(e.target.value)}
          placeholder="Cluster Name"
          icon={<Layers size={20} />}
        />

        {/* Ackit Dropdown */}
        <select
          value={ackitName}
          onChange={(e) => setAckitName(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="">Select Ackit</option>
          {ackits.map((a) => (
            <option key={a._id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>

        {/* Rack Selection */}
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

        {/* Save Button */}
        <button
          onClick={handleSubmit}
          disabled={loading?.submit}
          className="w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 rounded-md"
        >
          {loading?.submit ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddRackCluster;

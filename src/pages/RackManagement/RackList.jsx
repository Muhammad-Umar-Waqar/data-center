// src/pages/RackManagement/RackList.jsx
import { Pencil, Trash, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { fetchAllRacks } from "../../slices/rackSlice";
import { useInstallation } from "../../contexts/InstallationContext";
import DeleteModal from "../../components/Modals/common/DeleteModal";
import { deleteRack } from "../../slices/rackSlice";
import "../../styles/pages/management-pages.css";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, useMediaQuery } from "@mui/material";
import RackEditModal from "../../components/Modals/Common/RackManagement/RackEditModal";

const RackList = ({ selectedRack, onRackSelect }) => {
  const dispatch = useDispatch();
  const { selectedDataCenter, selectedHub } = useInstallation();
  const { racks = [], loading = {}, error } = useSelector((state) => state.rack || {});
  const isLoading = loading?.fetch;
  const [editOpen, setEditOpen] = useState(false);
  // const [selectedRack, setSelectedRack] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [rackToDelete, setRackToDelete] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width:768px)");
  const isMobile = !isDesktop;

  useEffect(() => {
    if (selectedDataCenter?._id) {
      dispatch(fetchAllRacks());
    }
  }, [selectedDataCenter, dispatch]);

  useEffect(() => {
    if (error) console.error("Rack error:", error);
  }, [error]);



const displayRacks = racks.filter((r) => {
  const rackDataCenterId = r.dataCenter?.id;
  const rackHubId = r.hub?.id;

  return (
    rackDataCenterId === selectedDataCenter?._id &&
    (!selectedHub?._id || rackHubId === selectedHub._id)
  );
});


const handleDeleteRack = async (rackId) => {
  try {
    await dispatch(deleteRack(rackId)).unwrap();

    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Rack deleted successfully",
      timer: 2000,
      showConfirmButton: false,
    });

    setDeleteOpen(false);
    setRackToDelete(null);
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text: err || "Unable to delete rack",
    });
  }
};

const handleRowClick = (rack, e) => {
  if (e) e.stopPropagation();
  onRackSelect?.(rack);
};




  const renderListMarkup = () => (
    <div className="ListPage bg-white rounded-xl lg:rounded-r-none lg:rounded-l-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5 relative">
      {isDesktop && <h1 className="organization-list-title font-semibold text-gray-800 mb-4">Rack Management</h1>}

      <div className="mb-4">
        <h2 className="organization-list-header text-center font-semibold text-gray-800">Rack List</h2>
      </div>

      {!selectedDataCenter && (
        <div className="p-4 text-center text-gray-500">
          Please select a Data Center to view and manage its Racks.
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="organization-table-header py-2 px-4 font-bold text-gray-800">Rack</th>
              <th className="organization-table-header py-2 px-4 text-center">Hub</th>
              <th className="organization-table-header py-2 px-4 text-center">Sensors</th>
              <th className="organization-table-header py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
        </table>

        <div className="organization-table-scroll overflow-y-auto pr-1 h-[63vh] sm:h-[58vh]">
          <table className="w-full table-auto text-left">
            <tbody>
              {isLoading && <TableSkeleton rows={4} />}

              {!isLoading &&
                displayRacks.map((rack, index) => {
                  const id = rack._id ?? rack.id ?? index;
                  const rackName = `${rack?.name ? rack.name : `Rack ${rack?.row || "?"}-${rack?.col || "?"}`} `;
                  // const hubName = rack.hubId?.name || "N/A";
                  const hubName = rack.hub?.name || "N/A";
                  // const sensorCount = rack.sensorIds?.length || 0;
                  const sensorCount = rack.sensors?.length || 0;

                  return (
                    // <tr
                    //   key={id}
                    //   className="border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60"
                    
                    // >

                    <tr
                        key={id}
                        onClick={(e) => handleRowClick(rack, e)}
                        className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
                          selectedRack?._id === id ? "bg-blue-50 border-blue-300" : ""
                        }`}
                      >

                      <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">{rackName}</td>
                      <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4 text-center">{hubName}</td>
                      <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4 text-center">{sensorCount}</td>
                      <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4 text-center">
                        <div className="flex justify-center gap-2 sm:gap-3">
                          {/* <button
                            className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-[4px] cursor-not-allowed"
                          >
                            <Pencil className="text-green-600 organization-action-icon" size={16} />
                          </button> */}

                          <button
                            className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-[4px]"
                            onClick={(e) => {
                              e.stopPropagation();
                              // setSelectedRack(rack);
                              onRackSelect?.(rack);
                              setEditOpen(true);
                            }}
                          >
                            <Pencil className="text-green-600 organization-action-icon" size={16} />
                          </button>

                          {/* <button
                            className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-[4px] cursor-not-allowed"
                          >
                            <Trash className="text-red-600 organization-action-icon" size={16} />
                          </button> */}

              <button
                className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-[4px]"
                onClick={(e) => {
                  e.stopPropagation();
                  setRackToDelete(rack);
                  setDeleteOpen(true);
                }}
              >
                <Trash className="text-red-600 organization-action-icon" size={16} />
              </button>



                          {/* <button
                            className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-[4px]"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteRack(rack);
                            }}
                          >
                            <Trash className="text-red-600 organization-action-icon" size={16} />
                          </button> */}

                        </div>
                      </td>
                    </tr>
                  );
                })}

              {!isLoading && displayRacks.length === 0 && selectedDataCenter && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No racks found for this selection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


 <RackEditModal
  open={editOpen}
  handleClose={() => {
    setEditOpen(false);
    setSelectedRack(null);
  }}
  rack={selectedRack}
/>


<DeleteModal
  open={deleteOpen}
  handleClose={() => {
    setDeleteOpen(false);
    setRackToDelete(null);
  }}
  handleDelete={handleDeleteRack}
  itemId={rackToDelete?._id}
  itemName={rackToDelete?.name}
  itemLabel="Rack"
/>



    </div>
 

);

 
  return (
    <>
      {isDesktop ? (
        renderListMarkup()
      ) : (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ style: { width: "100%" } }}
        >
          {renderListMarkup()}
        </Drawer>
      )}
    </>
  );
};

export default RackList;

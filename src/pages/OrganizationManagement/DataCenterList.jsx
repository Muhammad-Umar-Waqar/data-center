



// src/pages/management/DataCenterList.jsx
import { Pencil, Trash, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  fetchAllDataCenters,
  updateDataCenter,
  deleteDataCenter,
} from "../../slices/DataCenterSlice";

// import OrganizationDeleteModal from "../../components/Modals/OrganizationManagement/DeleteModal";
import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";

import "../../styles/pages/management-pages.css";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, useMediaQuery } from "@mui/material";
import DeleteModal from "../../components/Modals/common/DeleteModal";

// const DataCenterList = ({ onOrganizationSelect, selectedOrganization }) => {
const DataCenterList = ({ onDataCenterSelect, selectedDataCenter }) => {
  const dispatch = useDispatch();

//   const { DataCenter, loading, error } = useSelector(
//     (state) => {
//         console.log("statte>", state);
//         state.DataCenter || {}
//     }
//   );


const { DataCenters, loading, error } = useSelector((state) => {
  console.log("state>", state);
  return state.DataCenter;
});


  // IMPORTANT: list loading is now separate
  const isLoading = loading?.fetch;

  const [DeleteOpen, setDeleteOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);

const [dataCenterName, setDataCenterName] = useState("");
const [dataCenterId, setDataCenterId] = useState(null);


  // drawer state for mobile
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width:768px)");
  const isMobile = !isDesktop;

  useEffect(() => {
    dispatch(fetchAllDataCenters());
  }, [dispatch]);

  useEffect(() => {
    if (error?.fetch) console.error("DataCenter error:", error.fetch);
  }, [error]);

  const handleDeleteOpen = (name, id) => {
    setDeleteOpen(true);
    setDataCenterName(name);
    setDataCenterId(id);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDataCenterId(null);
    setDataCenterName("");
  };
  const handleEditOpen = (name, id) => {
    setEditOpen(true);
    setDataCenterId(id);
    setDataCenterName(name);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setDataCenterId(null);
    setDataCenterName("");
  };

  const handleChange = (e) => {
    setDataCenterName(e.target.value);
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteDataCenter(id)).unwrap();
      Swal.fire({ icon: "success", title: "Deleted", text: "Data Center deleted." });
      handleDeleteClose();
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
    }
  };

  // Update
  const handleEdit = async (orgId, newName) => {
    try {
      await dispatch(updateDataCenter({ id: orgId, name: newName })).unwrap();
      Swal.fire({ icon: "success", title: "Updated", text: "Data Center updated." });
      handleEditClose();
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
    }
  };

//   const displayOrganizations = Array.isArray(DataCenters) ? DataCenters : [];
  const displayDataCenters = Array.isArray(DataCenters) ? DataCenters : [];

  console.log("displayDC:", DataCenters)
  const handleRowClick = (datacenter, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    // onOrganizationSelect?.(organization);
    onDataCenterSelect?.(datacenter);
    if (isMobile) setDrawerOpen(false);
  };

  const renderListMarkup = () => (
    <div className="ListPage bg-white rounded-xl lg:rounded-r-none lg:rounded-l-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5 relative">
      {isDesktop ? (
        <h1 className="organization-list-title font-semibold text-gray-800 mb-4">
          Data Center Management
        </h1>
      ) : (
        <div className="flex justify-end">
          <IconButton onClick={() => setDrawerOpen(!drawerOpen)} edge="start" size="small">
            <CloseIcon />
          </IconButton>
        </div>
      )}

      <div className="mb-4">
        <h2 className="organization-list-header text-center font-semibold text-gray-800">
          Data Center List
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="organization-table-header py-2 px-4 font-bold text-gray-800">
                Data Center Name
              </th>
              <th className="organization-table-header py-2 px-4 text-center">
                Actions
              </th>
            </tr>
          </thead>
        </table>

        <div className="organization-table-scroll overflow-y-auto pr-1 h-[63vh] sm:h-[58vh]">
          <table className="w-full table-auto text-left">
            <tbody>
              {isLoading && <TableSkeleton rows={4} />}

              {!isLoading &&
                displayDataCenters.map((datac, index) => {
                  const id = datac._id ?? datac.id ?? index;
                  const displayName = datac.name ?? `Data Center ${index + 1}`;

                  return (
                    <tr
                      key={id}
                      className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
                        selectedDataCenter?._id === id ? "bg-blue-50 border-blue-300" : ""
                      }`}
                      onClick={(e) => handleRowClick(datac, e)}
                    >
                      <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
                        {index + 1}. {displayName}
                      </td>
                      <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
                        <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleEditOpen(displayName, id)}
                            className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 cursor-pointer p-[4px]"
                          >
                            <Pencil className="text-green-600 organization-action-icon" size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteOpen(displayName, id)}
                            className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 cursor-pointer p-[4px]"
                          >
                            <Trash className="text-red-600 organization-action-icon" size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

              {!isLoading && displayDataCenters.length === 0 && (
                <tr>
                  <td className="p-4 text-center text-gray-500">
                    No Data Centers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isDesktop ? (
        renderListMarkup()
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <img src="/logo-half.png" className="w-auto h-[30px]" />
            <h1 className="organization-list-title font-semibold text-gray-800">
              Data Center Management
            </h1>
            <IconButton size="small" onClick={() => setDrawerOpen(true)}>
              <Menu size={20} />
            </IconButton>
          </div>

          <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ style: { width: "100%" } }}>
            {renderListMarkup()}
          </Drawer>
        </>
      )}

      {DeleteOpen && (
        <DeleteModal
            open={DeleteOpen}
            handleClose={handleDeleteClose}
            handleDelete={handleDelete}
            // itemId={OrganizationId}
            // itemName={organizationName}
            itemId={dataCenterId}
            itemName={dataCenterName}
            itemLabel="Data Center"
        />
      )}

      {/* {EditOpen && (
        <OrganizationEditModal
          open={EditOpen}
          handleClose={handleEditClose}
          handleEdit={handleEdit}
          organizationId={OrganizationId}
          organizationName={organizationName}
        />
      )} */}

    {EditOpen && (
    <OrganizationEditModal
        open={EditOpen}
        handleClose={handleEditClose}
        handleEdit={handleEdit}
        organizationId={dataCenterId}
        organizationName={dataCenterName}
    />
    )}


    </>
  );
};

export default DataCenterList;

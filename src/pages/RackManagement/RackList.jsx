// src/pages/RackManagement/RackList.jsx
import { Pencil, Trash, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { fetchAllRacks } from "../../slices/rackSlice";
import { useInstallation } from "../../contexts/InstallationContext";

import "../../styles/pages/management-pages.css";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, useMediaQuery } from "@mui/material";

const RackList = () => {
  const dispatch = useDispatch();
  const { selectedDataCenter, selectedHub } = useInstallation();
  const { racks = [], loading = {}, error } = useSelector((state) => state.rack || {});
  const isLoading = loading?.fetch;

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

  const displayRacks = racks.filter(
    (r) =>
      r.dataCenterId?._id === selectedDataCenter?._id &&
      (!selectedHub?._id || r.hubId?._id === selectedHub._id)
  );

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
                  const rackName = `Rack ${rack.row || "?"}-${rack.col || "?"}`;
                  const hubName = rack.hubId?.name || "N/A";
                  const sensorCount = rack.sensorIds?.length || 0;

                  return (
                    <tr
                      key={id}
                      className="border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60"
                    >
                      <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">{rackName}</td>
                      <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4 text-center">{hubName}</td>
                      <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4 text-center">{sensorCount}</td>
                      <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4 text-center">
                        <div className="flex justify-center gap-2 sm:gap-3">
                          <button
                            className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-[4px] cursor-not-allowed"
                          >
                            <Pencil className="text-green-600 organization-action-icon" size={16} />
                          </button>
                          <button
                            className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-[4px] cursor-not-allowed"
                          >
                            <Trash className="text-red-600 organization-action-icon" size={16} />
                          </button>
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

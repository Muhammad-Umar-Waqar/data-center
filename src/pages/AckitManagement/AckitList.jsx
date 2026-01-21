// src/pages/AckitManagement/AckitList.jsx
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchAllAckits, deleteAckit } from "../../slices/ackitSlice";
import DeleteModal from "../../components/Modals/common/DeleteModal";
import AckitEditModal from "../../components/Modals/Common/AcKitManagement/AckitEditModal";
import "../../styles/pages/management-pages.css";
import TableSkeleton from "../../components/skeletons/TableSkeleton";

export default function AckitList({ selectedAcKit, onAckitSelect }) {
  const dispatch = useDispatch();
  const { ackits = [], loading = {}, error } = useSelector((s) => s.ackit || {});
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAllAckits());
  }, [dispatch]);

  useEffect(() => {
    if (error) console.error("Ackit error:", error);
  }, [error]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteAckit(id)).unwrap();
      Swal.fire({ icon: "success", title: "Deleted", text: "AC Kit deleted", timer: 1500, showConfirmButton: false });
      setDeleteOpen(false);
      setToDelete(null);
    } catch (err) {
      Swal.fire("Error", err || "Unable to delete", "error");
    }
  };


  const handleRowClick = (ackit, e) => {
  if (e) e.stopPropagation();
  onAckitSelect?.(ackit);
};

  return (
    <div className="ListPage bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5">
      <h1 className="organization-list-title font-semibold text-gray-800 mb-4">AC Kit Management</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="organization-table-header py-2 px-4 font-bold text-gray-800">Name</th>
              <th className="organization-table-header py-2 px-4 text-center">Condition</th>
              <th className="organization-table-header py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
        </table>

        <div className="organization-table-scroll overflow-y-auto pr-1 h-[60vh]">
          <table className="w-full table-auto text-left">
            <tbody>
              {loading.fetch && <TableSkeleton rows={6} />}

              {!loading.fetch &&
                ackits.map((a) => {
                  const id = a._id;
                  const cond = a.condition || {};
                  const condText = `${cond.type || "?"} ${cond.operator || "?"} ${cond.value ?? "?"}`;

                  return (
                    <tr key={id} 
                    // className="border-b border-gray-200 hover:bg-blue-50/60"
                     className={`border-b cursor-pointer transition-colors hover:bg-blue-50/60 ${
                      selectedAcKit?._id === id
                        ? "bg-blue-50 border-blue-300"
                        : ""
                    }`}
                    onClick={(e) =>
                       handleRowClick(a, e)
                      }
                    >
                      <td className="organization-table-cell py-3 px-4">{a.name}</td>
                      <td className="organization-table-cell py-3 px-4 text-center">{condText}</td>
                      <td className="organization-table-cell py-3 px-4 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            className="organization-action-btn rounded-full border border-green-500/50 p-[6px] bg-white"
                            onClick={() => {
                              setSelected(a);
                              setEditOpen(true);
                            }}
                          >
                            <Pencil className="text-green-600" size={16} />
                          </button>

                          <button
                            className="organization-action-btn rounded-full border border-red-500/50 p-[6px] bg-white"
                            onClick={() => {
                              setToDelete(a);
                              setDeleteOpen(true);
                            }}
                          >
                            <Trash className="text-red-600" size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

              {!loading.fetch && ackits.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    No AC Kits found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AckitEditModal open={editOpen} handleClose={() => setEditOpen(false)} ackit={selected} />
  
      <DeleteModal
        open={deleteOpen}
        handleClose={() => {
          setDeleteOpen(false);
          setToDelete(null);
        }}
        handleDelete={handleDelete}
        itemId={toDelete?._id}
        itemName={toDelete?.name}
        itemLabel="AC Kit"
      />
    </div>
  );
}

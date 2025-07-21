import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/cards/SummaryCard";
import moment from "moment";
import CreateSessionForm from "./CreateSessionForm";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import SkeletonLoader from "../../components/loader/SkeletonLoader";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchAllSessions = async () => {
    setIsLoading(true); // Set loading to true when fetch starts
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      const validatedSessions = response.data.map(session => ({
        ...session,
        questions: Array.isArray(session.questions) ? session.questions : []
      }));
      setSessions(validatedSessions);
    } catch (error) {
      console.error("Error fetching session data:", error);
      toast.error("Failed to fetch sessions");
    } finally {
      setIsLoading(false); // Set loading to false when fetch completes
    }
  };

  const handleDeleteClick = (session) => {
    setSessionToDelete(session);
    setDeleteModalOpen(true);
  };

  const deleteSession = async () => {
    if (!sessionToDelete?._id) return;
    
    setIsDeleting(true);
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionToDelete._id));
      setDeleteModalOpen(false);
      await fetchAllSessions();
      toast.success("Session deleted successfully", { id: "delete-toast" });
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session", { id: "delete-toast" });
    } finally {
      setIsDeleting(false);
      setSessionToDelete(null);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-6 md:px-6 lg:px-8">
        <div className="container mx-auto pt-4 pb-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <SkeletonLoader />
            </div>
          ) : sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h2 className="text-3xl font-bold text-blue-700 mb-4">
                No Interview Sessions Yet
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Get started by creating your first interview preparation session. 
                We'll help you generate relevant questions based on the role, experience level, 
                and topics you want to focus on.
              </p>
              <button
                className="h-12 w-60 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-base font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white hover:shadow-2xl hover:shadow-blue-300 transition-colors cursor-pointer"
                onClick={() => setOpenCreateModal(true)}
              >
                <LuPlus className="text-2xl text-white" />
                Create First Session
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
                {sessions.map((data, index) => {
                  const questionsCount = Array.isArray(data.questions) 
                    ? data.questions.length 
                    : 0;
                  
                  return (
                    <SummaryCard
                      key={data._id}
                      colors={CARD_BG[index % CARD_BG.length]}
                      role={data.role || ""}
                      topicsToFocus={data.topicsToFocus || ""}
                      experience={data.experience || "--"}
                      questions={questionsCount}
                      description={data.description || ""}
                      lastUpdated={
                        data.updatedAt
                          ? moment(data.updatedAt).format("Do MMM YYYY")
                          : ""
                      }
                      onSelect={() => navigate(`/interview-prep/${data._id}`)}
                      onDelete={() => handleDeleteClick(data)}
                    />
                  );
                })}
              </div>
              <button
                className="h-12 md:h-12 w-40 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white hover:shadow-2xl hover:shadow-blue-300 transition-colors cursor-pointer fixed bottom-10 md:bottom-20 right-10 md:right-20"
                onClick={() => setOpenCreateModal(true)}
              >
                <LuPlus className="text-2xl text-white" />
                Add New
              </button>
            </>
          )}
        </div>

        {/* Create Session Modal */}
        <Modal
          isOpen={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          hideHeader
        >
          <CreateSessionForm 
            onSuccess={() => {
              setOpenCreateModal(false);
              fetchAllSessions();
            }} 
          />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteModalOpen}
          onClose={() => !isDeleting && setDeleteModalOpen(false)}
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Delete Session</h3>
            <p className="text-gray-600">
              Are you sure you want to delete the session for <span className="font-semibold">{sessionToDelete?.role}</span>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                disabled={isDeleting}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteSession}
                disabled={isDeleting}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </span>
                ) : "Delete Session"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
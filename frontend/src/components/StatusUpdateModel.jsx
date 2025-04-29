import React, { useState } from 'react';
import { FaTimes, FaInfoCircle } from 'react-icons/fa';

const StatusUpdateModal = ({ isOpen, onClose, onSubmit, appointment }) => {
  const [status, setStatus] = useState(appointment?.status || 'confirmed');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(status, reason);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Update Appointment Status</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-blue-200 transition"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Status</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus('confirmed')}
                className={`py-2 px-4 rounded-lg border transition ${status === 'confirmed' 
                  ? 'bg-green-100 border-green-500 text-green-700 font-medium' 
                  : 'bg-white border-gray-300 hover:bg-gray-50'}`}
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => setStatus('cancelled')}
                className={`py-2 px-4 rounded-lg border transition ${status === 'cancelled' 
                  ? 'bg-red-100 border-red-500 text-red-700 font-medium' 
                  : 'bg-white border-gray-300 hover:bg-gray-50'}`}
              >
                Reject
              </button>
            </div>
          </div>
          
          {status === 'cancelled' && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Reason for Rejection
                <span className="text-gray-500 font-normal ml-1">(optional)</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="E.g.: No available slots, specialist unavailable..."
              />
              <div className="flex items-start mt-2 text-sm text-gray-500">
                <FaInfoCircle className="mt-0.5 mr-1.5 flex-shrink-0" />
                <span>This reason will be included in the email to the patient</span>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-lg transition ${status === 'confirmed' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                status === 'confirmed' ? 'Confirm Appointment' : 'Reject Appointment'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateModal;
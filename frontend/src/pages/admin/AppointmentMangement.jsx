import React, { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaSearch, 
  FaCheck, 
  FaTimes,
  FaTrash,
  FaEdit,
  FaFilter,
  FaSync
} from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import StatusUpdateModal from '../../components/StatusUpdateModel';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const token = localStorage.getItem('adminToken');

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/appointment', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Ensure we always have an array, even if response.data is null/undefined
      const data = response.data || {};
      setAppointments(Array.isArray(data.appointments) ? data.appointments : []);
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch appointments');
      setAppointments([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const updateStatus = async (status, reason) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/appointment/${selectedAppointment._id}/status`,
        { status, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Show professional success notification
      toast.success(
        <div className="p-3">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {status === 'confirmed' ? (
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              ) : (
                <XCircleIcon className="h-6 w-6 text-red-500" />
              )}
            </div>
            <div className="ml-3">
              <h3 className="font-medium">
                Appointment {status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Notification sent to {selectedAppointment.email}
              </p>
            </div>
          </div>
        </div>,
        { autoClose: 3000 }
      );
  
      fetchAppointments();
    } catch (error) {
      // Professional error notification
      toast.error(
        <div className="p-3">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ExclamationIcon className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium">Update Failed</h3>
              <p className="mt-1 text-sm text-gray-500">
                {error.response?.data?.message || 'Please try again later'}
              </p>
            </div>
          </div>
        </div>,
        { autoClose: 5000 }
      );
    } finally {
      setLoading(false);
    }
  };
  const deleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this appointment?')) {
      try {
        await axios.delete(
          `http://localhost:5000/api/appointment/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Appointment deleted permanently');
        fetchAppointments();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete appointment');
      }
    }
  };

  const filteredAppointments = Array.isArray(appointments) 
  ? appointments.filter(appointment => {
      const matchesSearch = 
        appointment?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment?.phone?.includes(searchTerm) ||
        appointment?.service?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = 
        statusFilter === 'all' || 
        appointment?.status === statusFilter;

      const matchesDate = 
        !dateFilter || 
        moment(appointment?.date).format('YYYY-MM-DD') === moment(dateFilter).format('YYYY-MM-DD');

      return matchesSearch && matchesStatus && matchesDate;
    })
  : [];

  const StatusBadge = ({ status }) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClasses[status]} flex items-center`}>
        {status === 'confirmed' && <FaCheck className="mr-1" />}
        {status === 'cancelled' && <FaTimes className="mr-1" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Appointment Management</h1>
          <p className="text-gray-600 mt-1">Review and manage patient appointments</p>
        </div>
        
        {/* Filters Section */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search appointments..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            
            <button
              onClick={resetFilters}
              className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              <FaSync className="mr-2" />
              Reset Filters
            </button>
          </div>
        </div>
        
        {/* Appointments Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                            <div className="text-sm text-gray-500">{appointment.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.service}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {moment(appointment.date).format('MMM D, YYYY h:mm A')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={appointment.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition"
                            title="Update Status"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteAppointment(appointment._id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <FaSearch className="text-3xl text-gray-300 mb-2" />
                        <p>No appointments match your criteria</p>
                        <button 
                          onClick={resetFilters}
                          className="mt-2 text-blue-600 hover:underline"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <StatusUpdateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={updateStatus}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default AppointmentManagement;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getAllSubscriptionsAPI, 
  getSubscriptionByIdAPI, 
  createSubscriptionAPI,
  updateSubscriptionAPI,
  deleteSubscriptionAPI 
} from "../../services/SubscriptionService";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import Button from "../../components/ui/Button";
import ConfirmModal from "../../components/modals/ConfirmModal";

// Compact Subscription Form Component 
const CompactSubscriptionForm = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleInputChange,
  title,
  submitText
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        
        {/* Form */}
        <form onSubmit={onSubmit}>
          {/* Form Content */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto p-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan ID
                </label>
                <input
                  type="number"
                  name="subscriptionPlanId"
                  value={formData.subscriptionPlanId}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub (Optional)
                </label>
                <input
                  type="text"
                  name="sub"
                  value={formData.sub || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 text-sm"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Frequency
                </label>
                <select
                  name="paymentFrequency"
                  value={formData.paymentFrequency}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 text-sm"
                  required
                >
                  <option value="">Select frequency</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              
              <div className="flex items-center md:col-span-2">
                <input
                  type="checkbox"
                  id="autoRenew"
                  name="autoRenew"
                  checked={formData.autoRenew}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="autoRenew" className="ml-2 text-sm text-gray-700">
                  Auto Renew
                </label>
              </div>
            </div>
          </div>
          
          {/* Form Footer */}
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Invoice Modal Component
const InvoiceModal = ({ isOpen, onClose, invoices }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Subscription Invoices</h3>
        </div>
        
        {/* Content */}
        <div className="px-6 py-4">
          {invoices.length === 0 ? (
            <p className="text-center text-gray-500">No invoices found for this subscription.</p>
          ) : (
            <div className="space-y-4 max-h-80 overflow-auto">
              {invoices.map(invoice => (
                <div key={invoice.invoiceId} className="border p-4 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">Invoice #{invoice.invoiceId}</p>
                      <p className="text-sm text-gray-600">Amount: ${invoice.amount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                      {invoice.paidDate && (
                        <p className="text-sm text-green-600">Paid: {new Date(invoice.paidDate).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      Method: {invoice.paymentMethod || 'N/A'}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                      invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main component
const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  
  // Initialize form with empty values
  const [formData, setFormData] = useState({
    email: "",
    subscriptionPlanId: 0,
    startDate: "",
    endDate: "",
    status: "",
    paymentFrequency: "",
    autoRenew: false,
    sub: null
  });

  // Auth check
  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (!userRole || (userRole !== 'Admin' && userRole !== 'Staff')) {
      navigate('/sign-in-sign-up');
    }
  }, [navigate]);

  // Fetch subscriptions
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getAllSubscriptionsAPI({
          filterOn: searchQuery,
          filterQuery: searchQuery,
          sortBy: "subscriptionId",
          isAscending: true,
          pageNumber: currentPage,
          pageSize: pageSize,
        });
        
        if (response) {
          setSubscriptions(response);
          
          // Only cache when not filtering
          if (!searchQuery) {
            localStorage.setItem('subscriptions', JSON.stringify(response));
            localStorage.setItem('subscriptions_timestamp', Date.now().toString());
          }
        }
      } catch (err) {
        setError("Failed to load subscriptions. Please try again later.");
        console.error('Error fetching subscriptions:', err);
        
        // If API call fails but we have cached data, keep using it
        if (!searchQuery) {
          const cachedData = localStorage.getItem('subscriptions');
          if (cachedData) {
            try {
              setSubscriptions(JSON.parse(cachedData));
            } catch (e) {
              console.warn("Error parsing cached data", e);
            }
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [currentPage, pageSize, searchQuery]);

  // Reset form
  const resetForm = () => {
    setFormData({
      email: "",
      subscriptionPlanId: 0,
      startDate: "",
      endDate: "",
      status: "",
      paymentFrequency: "",
      autoRenew: false,
      sub: null
    });
  };

  // Handle create submission
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await createSubscriptionAPI(formData);
      
      // Update local cache
      const cachedData = localStorage.getItem('subscriptions');
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const updatedData = [response, ...parsedData];
        localStorage.setItem('subscriptions', JSON.stringify(updatedData));
      }
      
      setSubscriptions([response, ...subscriptions]);
      setSuccessMessage("Subscription created successfully!");
      setIsCreateModalOpen(false);
      resetForm();
    } catch (err) {
      setError("Failed to create subscription.");
      console.error('Error creating subscription:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle view invoices
  const handleViewInvoices = (subscription) => {
    setSelectedInvoices(subscription.invoices || []);
    setIsInvoiceModalOpen(true);
  };

  // Handle update
  const handleUpdateClick = (subscription) => {
    setCurrentSubscription(subscription);
    setFormData({
      email: subscription.userEmail || "",
      subscriptionPlanId: subscription.subscriptionPlanId || 0,
      startDate: subscription.startDate ? subscription.startDate.split('T')[0] : "",
      endDate: subscription.endDate ? subscription.endDate.split('T')[0] : "",
      status: subscription.status || "",
      autoRenew: subscription.autoRenew || false,
      paymentFrequency: subscription.paymentFrequency || "",
      sub: subscription.sub || null
    });
    setIsUpdateModalOpen(true);
  };

  // Handle update submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!currentSubscription) return;
    
    try {
      setLoading(true);
      
      // Create JSON Patch operations array
      const patchOperations = [];
      
      // Check which fields have changed and create patch operations
      if (formData.email !== currentSubscription.userEmail) {
        patchOperations.push({
          op: "replace",
          path: "/email",
          value: formData.email
        });
      }
      
      if (formData.subscriptionPlanId !== currentSubscription.subscriptionPlanId) {
        patchOperations.push({
          op: "replace",
          path: "/subscriptionPlanId",
          value: parseInt(formData.subscriptionPlanId)
        });
      }
      
      if (formData.startDate !== (currentSubscription.startDate ? currentSubscription.startDate.split('T')[0] : "")) {
        patchOperations.push({
          op: "replace",
          path: "/startDate",
          value: formData.startDate
        });
      }
      
      if (formData.endDate !== (currentSubscription.endDate ? currentSubscription.endDate.split('T')[0] : "")) {
        patchOperations.push({
          op: "replace",
          path: "/endDate",
          value: formData.endDate
        });
      }
      
      if (formData.status !== currentSubscription.status) {
        patchOperations.push({
          op: "replace",
          path: "/status",
          value: formData.status
        });
      }
      
      if (formData.paymentFrequency !== currentSubscription.paymentFrequency) {
        patchOperations.push({
          op: "replace",
          path: "/paymentFrequency",
          value: formData.paymentFrequency
        });
      }
      
      if (formData.autoRenew !== currentSubscription.autoRenew) {
        patchOperations.push({
          op: "replace",
          path: "/autoRenew",
          value: formData.autoRenew
        });
      }
      
      // Check if sub field has changed and is not null or empty
      if (formData.sub !== currentSubscription.sub && formData.sub !== null && formData.sub !== "") {
        patchOperations.push({
          op: "replace",
          path: "/sub",
          value: formData.sub
        });
      }
      
      // Only proceed if there are changes
      if (patchOperations.length === 0) {
        setSuccessMessage("No changes detected.");
        setIsUpdateModalOpen(false);
        return;
      }
      
      console.log("🔄 Sending PATCH request with data:", JSON.stringify(patchOperations, null, 2));
      
      // Call the update API with patch operations
      await updateSubscriptionAPI(currentSubscription.subscriptionId, patchOperations);
      
      // Refresh the data
      const response = await getAllSubscriptionsAPI({
        pageNumber: currentPage,
        pageSize: pageSize
      });
      
      if (response) {
        setSubscriptions(response);
        // Only update cache if not searching
        if (!searchQuery) {
          localStorage.setItem('subscriptions', JSON.stringify(response));
          localStorage.setItem('subscriptions_timestamp', Date.now().toString());
        }
      }
      
      setSuccessMessage("Subscription updated successfully!");
      setIsUpdateModalOpen(false);
      resetForm();
    } catch (err) {
      setError("Failed to update subscription: " + (err.message || "Unknown error"));
      console.error('Error updating subscription:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDeleteClick = (subscription) => {
    setCurrentSubscription(subscription);
    setIsDeleteModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!currentSubscription) return;
    
    try {
      setLoading(true);
      await deleteSubscriptionAPI(currentSubscription.subscriptionId);
      
      // Update local state and cache
      const updatedSubscriptions = subscriptions.filter(sub => sub.subscriptionId !== currentSubscription.subscriptionId);
      setSubscriptions(updatedSubscriptions);
      localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
      
      setSuccessMessage("Subscription deleted successfully!");
      setIsDeleteModalOpen(false);
    } catch (err) {
      setError("Failed to delete subscription.");
      console.error('Error deleting subscription:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Special handling for sub field - empty string becomes null
    if (name === 'sub' && value === '') {
      setFormData({
        ...formData,
        [name]: null
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Subscription Management</h1>
          </div>
          
          {/* Status Messages */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded border border-green-300">
              {successMessage}
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
              {error}
            </div>
          )}
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-4 items-center">
            <input
              type="text"
              placeholder="Searching..."
              className="border border-gray-300 rounded w-2/5 p-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="ml-auto p-2 rounded text-white font-semibold bg-[#8470FF] hover:bg-[#6b5acd] transition"
              onClick={() => {
                resetForm();
                setIsCreateModalOpen(true);
              }}
            >
              Create Subscription
            </button>
          </div>
          
          {/* Subscriptions Table */}
          {loading && subscriptions.length === 0 ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-2"></div>
              <span>Loading subscriptions...</span>
            </div>
          ) : (
            <>
              {subscriptions.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                  <p className="text-gray-600">No subscriptions found.</p>
                </div>
              ) : (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                        <tr>
                          <th className="px-4 py-3 whitespace-nowrap">ID</th>
                          <th className="px-4 py-3 whitespace-nowrap">Email</th>
                          <th className="px-4 py-3 whitespace-nowrap">Plan</th>
                          <th className="px-4 py-3 whitespace-nowrap">Start Date</th>
                          <th className="px-4 py-3 whitespace-nowrap">End Date</th>
                          <th className="px-4 py-3 whitespace-nowrap">Status</th>
                          <th className="px-4 py-3 whitespace-nowrap">Auto Renew</th>
                          <th className="px-4 py-3 whitespace-nowrap">Frequency</th>
                          <th className="px-4 py-3 whitespace-nowrap">Invoices</th>
                          <th className="px-4 py-3 whitespace-nowrap">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {subscriptions.map((subscription) => (
                          <tr key={subscription.subscriptionId} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">{subscription.subscriptionId}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{subscription.userEmail}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{subscription.subscriptionPlanName}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {subscription.startDate ? new Date(subscription.startDate).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {subscription.endDate ? new Date(subscription.endDate).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                subscription.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {subscription.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                subscription.autoRenew ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {subscription.autoRenew ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">{subscription.paymentFrequency}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <Button 
                                variant="info" 
                                size="sm"
                                onClick={() => handleViewInvoices(subscription)}
                                disabled={!subscription.invoices || subscription.invoices.length === 0}
                              >
                                View ({subscription.invoices?.length || 0})
                              </Button>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="light" 
                                  size="sm" 
                                  onClick={() => handleUpdateClick(subscription)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="danger" 
                                  size="sm"
                                  onClick={() => handleDeleteClick(subscription)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            
              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  Previous
                </Button>
                <span>Page {currentPage}</span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={subscriptions.length < pageSize}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </main>
      </div>
      
      {/* Modals */}
      <CompactSubscriptionForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        title="Add New Subscription"
        submitText="Create Subscription"
      />
      
      <CompactSubscriptionForm
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        title="Update Subscription"
        submitText="Save Changes"
      />
      
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Subscription"
        message="Are you sure you want to delete this subscription? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
      />
      
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        invoices={selectedInvoices}
      />
    </div>
  );
};

export default SubscriptionManagement;
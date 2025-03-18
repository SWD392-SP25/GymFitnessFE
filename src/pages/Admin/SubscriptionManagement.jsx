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
import FormModal from "../../components/modals/FormModal";
import ConfirmModal from "../../components/modals/ConfirmModal";

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
    userEmail: "",
    subscriptionPlanId: "",
    subscriptionPlanName: "",
    startDate: "",
    endDate: "",
    status: "",
    autoRenew: false,
    paymentFrequency: "",
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
        
        // First, try to get data from localStorage
        const cachedData = localStorage.getItem('subscriptions');
        const cachedTimestamp = localStorage.getItem('subscriptions_timestamp');
        const isDataValid = cachedData && cachedTimestamp && 
          (Date.now() - parseInt(cachedTimestamp)) < 30 * 60 * 1000; // 30 minutes cache
        
        if (isDataValid) {
          const parsedData = JSON.parse(cachedData);
          setSubscriptions(parsedData);
        }
        
        const response = await getAllSubscriptionsAPI({
          pageNumber: currentPage,
          pageSize: pageSize,
          filterOn: searchQuery ? "userEmail" : "",
          filterQuery: searchQuery
        });
        
        if (response) {
          setSubscriptions(response);
          localStorage.setItem('subscriptions', JSON.stringify(response));
          localStorage.setItem('subscriptions_timestamp', Date.now().toString());
        }
      } catch (err) {
        setError("Failed to load subscriptions. Please try again later.");
        console.error('Error fetching subscriptions:', err);
        
        // If API call fails but we have cached data, keep using it
        const cachedData = localStorage.getItem('subscriptions');
        if (cachedData) {
          setSubscriptions(JSON.parse(cachedData));
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
      userEmail: "",
      subscriptionPlanId: "",
      subscriptionPlanName: "",
      startDate: "",
      endDate: "",
      status: "",
      autoRenew: false,
      paymentFrequency: "",
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
      userEmail: subscription.userEmail || "",
      subscriptionPlanId: subscription.subscriptionPlanId || "",
      subscriptionPlanName: subscription.subscriptionPlanName || "",
      startDate: subscription.startDate ? subscription.startDate.split('T')[0] : "",
      endDate: subscription.endDate ? subscription.endDate.split('T')[0] : "",
      status: subscription.status || "",
      autoRenew: subscription.autoRenew || false,
      paymentFrequency: subscription.paymentFrequency || "",
      sub: subscription.sub
    });
    setIsUpdateModalOpen(true);
  };

  // Handle update submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!currentSubscription) return;
    
    try {
      setLoading(true);
      await updateSubscriptionAPI(currentSubscription.subscriptionId, formData);
      
      // Update local state and cache
      const updatedSubscriptions = subscriptions.map(sub => 
        sub.subscriptionId === currentSubscription.subscriptionId ? { ...sub, ...formData } : sub
      );
      
      setSubscriptions(updatedSubscriptions);
      localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
      
      setSuccessMessage("Subscription updated successfully!");
      setIsUpdateModalOpen(false);
      resetForm();
    } catch (err) {
      setError("Failed to update subscription.");
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
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Subscription Management</h1>
            
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 mt-4 sm:mt-0">
              <Button 
                variant="primary"
                onClick={() => {
                  resetForm();
                  setIsCreateModalOpen(true);
                }}
              >
                Add Subscription
              </Button>
            </div>
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
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                className="w-full md:w-80 pl-10 pr-4 py-2 border rounded-lg"
                placeholder="Search by email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
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
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
                  <p className="text-gray-600 dark:text-gray-300">No subscriptions found.</p>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead className="bg-gray-50 dark:bg-gray-700 text-xs font-semibold uppercase text-gray-500 dark:text-gray-300">
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
                          <tr key={subscription.subscriptionId} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/25">
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
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${subscription.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {subscription.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${subscription.autoRenew ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
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
      
      {/* Create Subscription Modal */}
      <FormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        title="Add New Subscription"
        submitText="Create Subscription"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User Email</label>
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plan ID</label>
            <input
              type="text"
              name="subscriptionPlanId"
              value={formData.subscriptionPlanId}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plan Name</label>
            <input
              type="text"
              name="subscriptionPlanName"
              value={formData.subscriptionPlanName}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Frequency</label>
            <input
              type="text"
              name="paymentFrequency"
              value={formData.paymentFrequency}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoRenew"
              name="autoRenew"
              checked={formData.autoRenew}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="autoRenew" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Auto Renew
            </label>
          </div>
        </div>
      </FormModal>
      
      {/* Update Subscription Modal */}
      <FormModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateSubmit}
        title="Update Subscription"
        submitText="Save Changes"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User Email</label>
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plan ID</label>
            <input
              type="text"
              name="subscriptionPlanId"
              value={formData.subscriptionPlanId}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plan Name</label>
            <input
              type="text"
              name="subscriptionPlanName"
              value={formData.subscriptionPlanName}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Frequency</label>
            <input
              type="text"
              name="paymentFrequency"
              value={formData.paymentFrequency}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoRenew"
              name="autoRenew"
              checked={formData.autoRenew}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="autoRenew" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Auto Renew
            </label>
          </div>
        </div>
      </FormModal>
      
      {/* Delete Confirmation Modal */}
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

      {/* Invoice View Modal */}
      <FormModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onSubmit={(e) => {
          e.preventDefault();
          setIsInvoiceModalOpen(false);
        }}
        title="Subscription Invoices"
        submitText="Close"
      >
        {selectedInvoices.length === 0 ? (
          <p className="text-center text-gray-500">No invoices found for this subscription.</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-auto">
            {selectedInvoices.map(invoice => (
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
      </FormModal>
    </div>
  );
};

export default SubscriptionManagement;
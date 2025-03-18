import React from 'react';
import { FormModal } from '../components/modals/FormModal';

const CompactSubscriptionForm = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleInputChange,
  title,
  submitText
}) => {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title={title}
      submitText={submitText}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto p-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            User Email
          </label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 text-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Plan ID
          </label>
          <input
            type="text"
            name="subscriptionPlanId"
            value={formData.subscriptionPlanId}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 text-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Plan Name
          </label>
          <input
            type="text"
            name="subscriptionPlanName"
            value={formData.subscriptionPlanName}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 text-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
          <label htmlFor="autoRenew" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Auto Renew
          </label>
        </div>
      </div>
    </FormModal>
  );
};

export default CompactSubscriptionForm;
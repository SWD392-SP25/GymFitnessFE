import instance from "./customize-axios";

const SubscriptionEndpoints = {
  getAll: "/UserSubscription",
  getById: "/UserSubscription/{subscriptionId}",
  create: "/UserSubscription",
  update: "/UserSubscription/{subscriptionId}",
  delete: "/UserSubscription/{subscriptionId}",
  getTrainerSubscribers: "/UserSubscription/trainer/{staffId}"
};

// Get all subscriptions
export const getAllSubscriptionsAPI = async ({
  pageNumber = 1,
  pageSize = 10,
  filterOn = "",
  filterQuery = ""
} = {}) => {
  try {
    const response = await instance.get(SubscriptionEndpoints.getAll, {
      params: {
        pageNumber,
        pageSize,
        filterOn,
        filterQuery
      }
    });
    return response;
  } catch (error) {
    console.error("Error fetching subscriptions:", error.response?.data || error);
    throw error;
  }
};

// Get subscription by ID
export const getSubscriptionByIdAPI = async (subscriptionId) => {
  try {
    const response = await instance.get(SubscriptionEndpoints.getById.replace("{subscriptionId}", subscriptionId));
    return response;
  } catch (error) {
    console.error(`Error fetching subscription ID ${subscriptionId}:`, error.response?.data || error);
    throw error;
  }
};

// Create new subscription
export const createSubscriptionAPI = async (subscriptionData) => {
  try {
    const response = await instance.post(SubscriptionEndpoints.create, subscriptionData);
    return response;
  } catch (error) {
    console.error("Error creating subscription:", error.response?.data || error);
    throw error;
  }
};

// Update subscription
export const updateSubscriptionAPI = async (subscriptionId, updateData) => {
  try {
    const response = await instance.patch(
      SubscriptionEndpoints.update.replace("{subscriptionId}", subscriptionId),
      updateData,
      {
        headers: { "Content-Type": "application/json-patch+json" }
      }
    );
    return response;
  } catch (error) {
    console.error(`Error updating subscription ID ${subscriptionId}:`, error.response?.data || error);
    throw error;
  }
};

// Delete subscription
export const deleteSubscriptionAPI = async (subscriptionId) => {
  try {
    const response = await instance.delete(SubscriptionEndpoints.delete.replace("{subscriptionId}", subscriptionId));
    return response;
  } catch (error) {
    console.error(`Error deleting subscription ID ${subscriptionId}:`, error.response?.data || error);
    throw error;
  }
};

// Get trainer's subscribers/users
export const getTrainerSubscribersAPI = async (staffId) => {
  try {
    const response = await instance.get(SubscriptionEndpoints.getTrainerSubscribers.replace("{staffId}", staffId));
    return response;
  } catch (error) {
    console.error(`Error fetching trainer's subscribers for staffId ${staffId}:`, error.response?.data || error);
    throw error;
  }
};
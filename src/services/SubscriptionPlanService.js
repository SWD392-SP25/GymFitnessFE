// src/services/SubscriptionPlanService.js
import instance from "./customize-axios";

// Get all subscription plans
export const getAllSubscriptionPlansAPI = async () => {
  try {
    const response = await instance.get("/SubscriptionPlan");
    return response;
  } catch (error) {
    console.error("Error fetching subscription plans:", error.response?.data || error);
    throw error;
  }
};
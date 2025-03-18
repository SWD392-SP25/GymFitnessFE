// src/pages/Admin/SubscriptionPlan.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import Card from "../../components/ui/Card";
import { getAllSubscriptionPlansAPI } from "../../services/SubscriptionPlanService";

const SubscriptionPlan = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('role');

    if (!userRole || (userRole !== 'Admin' && userRole !== 'Staff')) {
      navigate('/sign-in-sign-up');
    } else {
      setRole(userRole);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        setLoading(true);
        const response = await getAllSubscriptionPlansAPI();
        setSubscriptionPlans(response || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
        setError("Failed to load subscription plans. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionPlans();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-4">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Subscription Plans</h1>
          </div>

          {loading && (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-2"></div>
              <span>Loading subscription plans...</span>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && subscriptionPlans.length === 0 && (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
              <p className="text-gray-600 dark:text-gray-300">No subscription plans found.</p>
            </div>
          )}

          {!loading && !error && subscriptionPlans.length > 0 && (
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-50 dark:bg-gray-700 text-xs font-semibold uppercase text-gray-500 dark:text-gray-300">
                    <tr>
                      <th className="px-4 py-3 whitespace-nowrap">Plan ID</th>
                      <th className="px-4 py-3 whitespace-nowrap">Name</th>
                      <th className="px-4 py-3 whitespace-nowrap">Price</th>
                      <th className="px-4 py-3 whitespace-nowrap">Billing Cycle</th>
                      <th className="px-4 py-3 whitespace-nowrap">Duration (Days)</th>
                      <th className="px-4 py-3 whitespace-nowrap">Description</th>
                      <th className="px-4 py-3 whitespace-nowrap">Features</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {subscriptionPlans.map((plan, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/25">
                        <td className="px-4 py-3 whitespace-nowrap">{index}</td>
                        <td className="px-4 py-3 whitespace-nowrap font-medium">{plan.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap">${plan.price}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{plan.billingCycle}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{plan.durationDays || 30}</td>
                        <td className="px-4 py-3 max-w-xs truncate">{plan.description}</td>
                        <td className="px-4 py-3">
                          {plan.features && plan.features.length > 0 ? (
                            <div className="max-w-xs">
                              <ul className="list-disc pl-5 text-xs text-gray-600 dark:text-gray-400">
                                {plan.features.slice(0, 3).map((feature, index) => (
                                  <li key={index} className="truncate">{feature}</li>
                                ))}
                                {plan.features.length > 3 && (
                                  <li className="text-blue-500">+{plan.features.length - 3} more</li>
                                )}
                              </ul>
                            </div>
                          ) : (
                            <span className="text-gray-400">Basic features</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
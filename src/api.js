import axios from "axios";

// Create axios instance with default config
const createApiInstance = (baseURL) => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return api;
};

// Default API instance
const api = createApiInstance();

/**
 * Agent Endpoints
 */

/**
 * Approve an agent
 * @param {Object} params - Agent approval parameters
 * @param {string} params.agentName - Agent name
 * @param {string} params.agentAddress - Agent address
 * @param {string} params.ipWhitelist - IP whitelist
 * @param {number} params.expired - Expiration timestamp
 * @param {boolean} params.canSpotTrade - Can spot trade
 * @param {boolean} params.canPerpTrade - Can perp trade
 * @param {boolean} params.canWithdraw - Can withdraw
 * @param {string} params.builder - Builder address
 * @param {string} params.maxFeeRate - Maximum fee rate
 * @param {string} params.user - User address
 * @param {number} params.nonce - Nonce
 * @param {string} params.signature - Signature
 * @returns {Promise} Axios response
 */
export const approveAgent = (params) => {
  return api.post("/fapi/v3/approveAgent", null, { params });
};

/**
 * Update an agent
 * @param {Object} params - Agent update parameters
 * @param {string} params.agentAddress - Agent address
 * @param {string} params.ipWhitelist - IP whitelist
 * @param {boolean} params.canSpotTrade - Can spot trade
 * @param {boolean} params.canPerpTrade - Can perp trade
 * @param {boolean} params.canWithdraw - Can withdraw
 * @param {string} params.user - User address
 * @param {number} params.nonce - Nonce
 * @param {string} params.signature - Signature
 * @returns {Promise} Axios response
 */
export const updateAgent = (params) => {
  return api.post("/fapi/v3/updateAgent", null, { params });
};

/**
 * Get all agents
 * @param {Object} params - Query parameters (optional)
 * @returns {Promise} Axios response
 */
export const getAgents = (params = {}) => {
  return api.get("/fapi/v3/agent", { params });
};

/**
 * Delete an agent
 * @param {Object} params - Agent deletion parameters
 * @param {string} params.agentAddress - Agent address
 * @param {string} params.user - User address
 * @param {number} params.nonce - Nonce
 * @param {string} params.signature - Signature
 * @returns {Promise} Axios response
 */
export const delAgent = (params) => {
  return api.delete("/fapi/v3/agent", { params });
};

/**
 * Builder Endpoints
 */

/**
 * Approve a builder
 * @param {Object} params - Builder approval parameters
 * @param {string} params.builder - Builder address
 * @param {string} params.maxFeeRate - Maximum fee rate
 * @param {string} params.user - User address
 * @param {number} params.nonce - Nonce
 * @param {string} params.signature - Signature
 * @returns {Promise} Axios response
 */
export const approveBuilder = (params) => {
  return api.post("/fapi/v3/approveBuilder", null, { params });
};

/**
 * Update a builder
 * @param {Object} params - Builder update parameters
 * @param {string} params.builder - Builder address
 * @param {string} params.maxFeeRate - Maximum fee rate
 * @param {string} params.user - User address
 * @param {number} params.nonce - Nonce
 * @param {string} params.signature - Signature
 * @returns {Promise} Axios response
 */
export const updateBuilder = (params) => {
  return api.post("/fapi/v3/updateBuilder", null, { params });
};

/**
 * Get all builders
 * @param {Object} params - Query parameters (optional)
 * @returns {Promise} Axios response
 */
export const getBuilders = (params = {}) => {
  return api.get("/fapi/v3/builder", { params });
};

/**
 * Delete a builder
 * @param {Object} params - Builder deletion parameters
 * @param {string} params.builder - Builder address
 * @param {string} params.user - User address
 * @param {number} params.nonce - Nonce
 * @param {string} params.signature - Signature
 * @returns {Promise} Axios response
 */
export const delBuilder = (params) => {
  return api.delete("/fapi/v3/builder", { params });
};

/**
 * Order Endpoints
 */

/**
 * Place an order
 * @param {Object} params - Order parameters
 * @param {string} params.symbol - Trading symbol (e.g., 'BTCUSDT')
 * @param {string} params.type - Order type (e.g., 'MARKET')
 * @param {string} params.builder - Builder address
 * @param {number} params.feeRate - Fee rate
 * @param {string} params.side - Order side ('BUY' or 'SELL')
 * @param {string} params.quantity - Order quantity
 * @param {string} params.signer - Signer address (optional, for non-main orders)
 * @param {number} params.nonce - Nonce
 * @param {string} params.signature - Signature
 * @returns {Promise} Axios response
 */
export const placeOrder = (params) => {
  return api.post("/fapi/v3/order", null, { params });
};

// Export default API instance
export default api;

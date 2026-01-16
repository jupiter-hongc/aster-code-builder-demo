import { useSignTypedData, useChainId } from "wagmi";

// EIP-712 Template (only contains EIP712Domain)
const eip712Template = {
  types: {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
  },
  primaryType: "",
  domain: {
    name: "AsterSignTransaction",
    version: "1",
    chainId: 56,
    verifyingContract: "0x0000000000000000000000000000000000000000",
  },
  message: {},
};

// Explicit wagmi signType data for ApproveAgent
export const approveAgentSignType = {
  domain: {
    name: "AsterSignTransaction",
    version: "1",
    chainId: 56,
    verifyingContract: "0x0000000000000000000000000000000000000000",
  },
  types: {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
    ApproveAgent: [
      { name: "AgentName", type: "string" },
      { name: "AgentAddress", type: "address" },
      { name: "IpWhitelist", type: "string" },
      { name: "Expired", type: "uint256" },
      { name: "CanSpotTrade", type: "bool" },
      { name: "CanPerpTrade", type: "bool" },
      { name: "CanWithdraw", type: "bool" },
      { name: "Builder", type: "address" },
      { name: "MaxFeeRate", type: "string" },
      { name: "BuilderName", type: "string" },
      { name: "User", type: "address" },
      { name: "Nonce", type: "uint256" },
    ],
  },
  primaryType: "ApproveAgent",
};

// Explicit wagmi signType data for ApproveBuilder
export const approveBuilderSignType = {
  domain: {
    name: "AsterSignTransaction",
    version: "1",
    chainId: 56,
    verifyingContract: "0x0000000000000000000000000000000000000000",
  },
  types: {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
    ApproveBuilder: [
      { name: "Builder", type: "address" },
      { name: "MaxFeeRate", type: "string" },
      { name: "BuilderName", type: "string" },
      { name: "User", type: "address" },
      { name: "Nonce", type: "uint256" },
    ],
  },
  primaryType: "ApproveBuilder",
};

export const approveBuilderSignTypeWithoutBuilder = {
  domain: {
    name: "AsterSignTransaction",
    version: "1",
    chainId: 56,
    verifyingContract: "0x0000000000000000000000000000000000000000",
  },
  types: {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
    ApproveBuilder: [
      { name: "MaxFeeRate", type: "string" },
      { name: "User", type: "address" },
      { name: "Nonce", type: "uint256" },
    ],
  },
  primaryType: "ApproveBuilder",
};

/**
 * Capitalize first letter of each key in an object (matching Python behavior)
 * @param {Object} obj - The object to capitalize keys for
 * @returns {Object} Object with capitalized keys
 */
function capitalizeKeys(obj) {
  const newDict = {};
  for (const [key, value] of Object.entries(obj)) {
    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
    newDict[capitalizedKey] = value;
  }
  return newDict;
}

/**
 * Format message for ApproveAgent signing
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
 * @returns {Object} Formatted message with capitalized keys
 */
export function formatApproveAgentMessage(params) {
  return capitalizeKeys(params);
}

/**
 * Format message for ApproveBuilder signing
 * @param {Object} params - Builder approval parameters
 * @param {string} params.builder - Builder address
 * @param {string} params.maxFeeRate - Maximum fee rate
 * @param {string} params.user - User address
 * @param {number} params.nonce - Nonce
 * @returns {Object} Formatted message with capitalized keys
 */
export function formatApproveBuilderMessage(params) {
  return capitalizeKeys(params);
}

/**
 * Infer EIP-712 type from JavaScript value
 * @param {any} value - The value to infer type from
 * @returns {string} The EIP-712 type string
 */
function inferEIP712Type(value) {
  if (typeof value === "boolean") {
    return "bool";
  } else if (typeof value === "number" && Number.isInteger(value)) {
    return "uint256";
  } else if (typeof value === "string") {
    // Check if it's an address (starts with 0x and is 42 chars)
    if (value.startsWith("0x") && value.length === 42) {
      return "string";
    }
    return "string";
  }
  return "string";
}

/**
 * Build dynamic EIP-712 structured data with type inference
 * @param {Object} template - The EIP-712 template
 * @param {string} primaryType - The primary type name
 * @param {Object} values - The message values
 * @returns {Object} The complete EIP-712 structured data
 */
function buildDynamicEIP712WithInfer(template, primaryType, values) {
  const eip712Data = JSON.parse(JSON.stringify(template));
  eip712Data.primaryType = primaryType;

  // Automatically generate primary type fields
  const typeFields = [];
  for (const [name, val] of Object.entries(values)) {
    typeFields.push({ name, type: inferEIP712Type(val) });
  }

  eip712Data.types[primaryType] = typeFields;

  // Fill message
  eip712Data.message = values;
  return eip712Data;
}

/**
 * Custom hook for signing EIP-712 messages with different primary types
 * @returns {Object} Object containing signV3EIP712 and signV3 functions, and signing state
 */
export function useSignEIP712() {
  const signTypedData = useSignTypedData();
  const chainId = useChainId();

  /**
   * Sign EIP-712 message with different primary types
   * @param {Object} message - The message object to sign
   * @param {string} primaryType - The primary type name (e.g., "ApproveAgent", "UpdateAgent")
   * @returns {Promise<string>} The signature hex string
   */
  const signV3EIP712 = async (message, primaryType) => {
    // Capitalize first letter of each key (matching Python behavior)
    const newDict = capitalizeKeys(message);

    // Use template with chainId 56 as per demo-code.md
    const signData = buildDynamicEIP712WithInfer(
      eip712Template,
      primaryType,
      newDict
    );

    console.log(JSON.stringify(signData, null, 2));
    console.log(signData);

    const signature = await signTypedData.mutateAsync({
      domain: signData.domain,
      types: signData.types,
      primaryType: signData.primaryType,
      message: signData.message,
    });

    return signature;
  };

  /**
   * Sign a simple message using EIP-712 Message type
   * @param {string} message - The message string to sign
   * @returns {Promise<string>} The signature hex string
   */
  const signV3 = async (message) => {
    const typedDataSign = {
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Message: [{ name: "msg", type: "string" }],
      },
      primaryType: "Message",
      domain: {
        name: "AsterSignTransaction",
        version: "1",
        chainId,
        verifyingContract: "0x0000000000000000000000000000000000000000",
      },
      message: {
        msg: message,
      },
    };

    console.log(typedDataSign);
    console.log(message);

    const signature = await signTypedData.mutateAsync({
      domain: typedDataSign.domain,
      types: typedDataSign.types,
      primaryType: typedDataSign.primaryType,
      message: typedDataSign.message,
    });

    console.log(signature);
    return signature;
  };

  return {
    signV3EIP712,
    signV3,
    isPending: signTypedData.isPending,
    isError: signTypedData.isError,
    error: signTypedData.error,
  };
}

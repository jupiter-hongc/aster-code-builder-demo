import React from 'react'
import { useConnection, useConnect, useDisconnect, useBalance, useChainId, useConnectors , useSignTypedData} from 'wagmi'
import { useSignEIP712, formatApproveAgentMessage, formatApproveBuilderMessage, formatUpdateAgentMessage, formatDelAgentMessage, formatDelBuilderMessage, formatPlaceOrderMessage } from './sign.js'
import { approveAgent, approveBuilder, updateBuilder, updateAgent, delAgent, delBuilder, placeOrder } from './api.js'

function App() {
  const { address, isConnected } = useConnection()
  const connectors = useConnectors()
  const { mutateAsync: connect, isPending } = useConnect()
  const { mutate: disconnect } = useDisconnect()
  const chainId = useChainId()
  const { data: balance } = useBalance({
    address: address,
  })
  const { signV3EIP712, isPending: isSigning, isError: isSignError, error: signError } = useSignEIP712()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [signedApiParams, setSignedApiParams] = React.useState(null)

  // Nonce generation matching demo-code.md implementation
  const lastMsRef = React.useRef(0)
  const iRef = React.useRef(0)
  const getNonce = () => {
    const nowMs = Math.floor(Date.now() / 1000)
    if (nowMs === lastMsRef.current) {
      iRef.current += 1
    } else {
      lastMsRef.current = nowMs
      iRef.current = 0
    }
    return nowMs * 1_000_000 + iRef.current
  }


  const {mutateAsync: signTypedDataAsync}  = useSignTypedData()

  const handleApproveAgent = async () => {
    if (!address) {
      alert('Please connect your wallet first')
      return
    }

    // Generate nonce using the same logic as demo-code.md
    const nonce = getNonce()

    // Parameters matching demo-code.md
    const messageParams = {
      agentName: '2dkkd0001',
      agentAddress: address, // Using connected address as agent address
      ipWhitelist: '127.0.0.9',
      expired: 1867945395040,
      canSpotTrade: true,
      canPerpTrade: false,
      canWithdraw: false,
      builder: '0xc2af13e1B1de3A015252A115309A0F9DEEDCFa0A',
      maxFeeRate: '0.00001',
      builderName: 'hong',
      asterChain: 'Mainnet',
      user: address,
      nonce: nonce,
    }

    const formattedMessage = formatApproveAgentMessage(messageParams)

    try {
      const signature = await signV3EIP712(formattedMessage, 'ApproveAgent')
      console.log('ApproveAgent signature:', signature)
      
      // Prepare API call payload
      const apiParams = {
        ...messageParams,
        signature: signature,
        signatureChainId: chainId
        
      }
      
      // Store the signed API params to display on screen
      setSignedApiParams({
        type: 'ApproveAgent',
        params: apiParams,
      })
      
      // Commented out API call
      // setIsSubmitting(true)
      // try {
      //   const response = await approveAgent(apiParams)
      //   console.log('ApproveAgent API response:', response.data)
      //   alert(`ApproveAgent submitted successfully!\nSignature: ${signature}\nResponse: ${JSON.stringify(response.data)}`)
      // } catch (apiError) {
      //   console.error('Error calling approveAgent API:', apiError)
      //   alert(`Error submitting to API: ${apiError.response?.data?.message || apiError.message || 'Unknown error'}`)
      //   setIsSubmitting(false) // Reset on error
      // } finally {
      //   setIsSubmitting(false)
      // }
    } catch (error) {
      console.error('Error signing ApproveAgent:', error)
      // alert(`Error signing: ${error.message}`)
      setIsSubmitting(false) // Reset submission state on signing error
    }
  }

  const handleApproveBuilder = async () => {
    if (!address) {
      alert('Please connect your wallet first')
      return
    }

    // Generate nonce using the same logic as demo-code.md
    const nonce = getNonce()

    // Parameters matching demo-code.md
    const messageParams = {
      builder: '0xc2af13e1B1de3A015252A115309A0F9DEEDCFa0A',
      maxFeeRate: '0.00001',
      builderName: 'ivan3',
      asterChain: 'Mainnet',
      user: address,
      nonce: nonce,
    }

    const formattedMessage = formatApproveBuilderMessage(messageParams)

    try {
      const signature = await signV3EIP712(formattedMessage, 'ApproveBuilder')
      console.log('ApproveBuilder signature:', signature)
      
      // Prepare API call payload
      const apiParams = {
        ...messageParams,
        signature: signature,
        signatureChainId: chainId
      }
      
      // Store the signed API params to display on screen
      setSignedApiParams({
        type: 'ApproveBuilder',
        params: apiParams,
      })
      
      // Commented out API call
      // setIsSubmitting(true)
      // try {
      //   const response = await approveBuilder(apiParams)
      //   console.log('ApproveBuilder API response:', response.data)
      //   alert(`ApproveBuilder submitted successfully!\nSignature: ${signature}\nResponse: ${JSON.stringify(response.data)}`)
      // } catch (apiError) {
      //   console.error('Error calling approveBuilder API:', apiError)
      //   alert(`Error submitting to API: ${apiError.response?.data?.message || apiError.message || 'Unknown error'}`)
      //   setIsSubmitting(false) // Reset on error
      // } finally {
      //   setIsSubmitting(false)
      // }
    } catch (error) {
      console.error('Error signing ApproveBuilder:', error)
      // alert(`Error signing: ${error.message}`)
      setIsSubmitting(false) // Reset submission state on signing error
    }
  }

  const handleUpdateBuilder = async () => {
    if (!address) {
      alert('Please connect your wallet first')
      return
    }

    // Generate nonce using the same logic as demo-code.md
    const nonce = getNonce()

    // Parameters matching demo-code.md (updateBuilder only needs builder and maxFeeRate)
    const messageParams = {
      builder: '0xc2af13e1B1de3A015252A115309A0F9DEEDCFa0A',
      maxFeeRate: '0.00002',
      asterChain: 'Mainnet',
      user: address,
      nonce: nonce,
    }

    // Format message with capitalized keys (same as formatApproveBuilderMessage)
    const formattedMessage = formatApproveBuilderMessage(messageParams)

    try {
      const signature = await signV3EIP712(formattedMessage, 'UpdateBuilder')
      console.log('UpdateBuilder signature:', signature)
      
      // Prepare API call payload
      const apiParams = {
        ...messageParams,
        signature: signature,
        signatureChainId: chainId
      }
      
      // Store the signed API params to display on screen
      setSignedApiParams({
        type: 'UpdateBuilder',
        params: apiParams,
      })
      
      // Commented out API call
      // setIsSubmitting(true)
      // try {
      //   const response = await updateBuilder(apiParams)
      //   console.log('UpdateBuilder API response:', response.data)
      //   alert(`UpdateBuilder submitted successfully!\nSignature: ${signature}\nResponse: ${JSON.stringify(response.data)}`)
      // } catch (apiError) {
      //   console.error('Error calling updateBuilder API:', apiError)
      //   alert(`Error submitting to API: ${apiError.response?.data?.message || apiError.message || 'Unknown error'}`)
      //   setIsSubmitting(false) // Reset on error
      // } finally {
      //   setIsSubmitting(false)
      // }
    } catch (error) {
      console.error('Error signing UpdateBuilder:', error)
      setIsSubmitting(false) // Reset submission state on signing error
    }
  }

  const handleUpdateAgent = async () => {
    if (!address) {
      alert('Please connect your wallet first')
      return
    }

    const nonce = getNonce()

    const messageParams = {
      agentAddress: address,
      ipWhitelist: '',
      canSpotTrade: false,
      canPerpTrade: true,
      canWithdraw: false,
      asterChain: 'Mainnet',
      user: address,
      nonce: nonce,
    }

    const formattedMessage = formatUpdateAgentMessage(messageParams)

    try {
      const signature = await signV3EIP712(formattedMessage, 'UpdateAgent')
      console.log('UpdateAgent signature:', signature)
      
      const apiParams = {
        ...messageParams,
        signature: signature,
        signatureChainId: chainId
      }
      
      setSignedApiParams({
        type: 'UpdateAgent',
        params: apiParams,
      })
      
      // Commented out API call
      // setIsSubmitting(true)
      // try {
      //   const response = await updateAgent(apiParams)
      //   console.log('UpdateAgent API response:', response.data)
      //   alert(`UpdateAgent submitted successfully!\nSignature: ${signature}\nResponse: ${JSON.stringify(response.data)}`)
      // } catch (apiError) {
      //   console.error('Error calling updateAgent API:', apiError)
      //   alert(`Error submitting to API: ${apiError.response?.data?.message || apiError.message || 'Unknown error'}`)
      //   setIsSubmitting(false)
      // } finally {
      //   setIsSubmitting(false)
      // }
    } catch (error) {
      console.error('Error signing UpdateAgent:', error)
      setIsSubmitting(false)
    }
  }

  const handleDelAgent = async () => {
    if (!address) {
      alert('Please connect your wallet first')
      return
    }

    const nonce = getNonce()

    const messageParams = {
      agentAddress: address,
      asterChain: 'Mainnet',
      user: address,
      nonce: nonce,
    }

    const formattedMessage = formatDelAgentMessage(messageParams)

    try {
      const signature = await signV3EIP712(formattedMessage, 'DelAgent')
      console.log('DelAgent signature:', signature)
      
      const apiParams = {
        ...messageParams,
        signature: signature,
        signatureChainId: chainId
      }
      
      setSignedApiParams({
        type: 'DelAgent',
        params: apiParams,
      })
      
      // Commented out API call
      // setIsSubmitting(true)
      // try {
      //   const response = await delAgent(apiParams)
      //   console.log('DelAgent API response:', response.data)
      //   alert(`DelAgent submitted successfully!\nSignature: ${signature}\nResponse: ${JSON.stringify(response.data)}`)
      // } catch (apiError) {
      //   console.error('Error calling delAgent API:', apiError)
      //   alert(`Error submitting to API: ${apiError.response?.data?.message || apiError.message || 'Unknown error'}`)
      //   setIsSubmitting(false)
      // } finally {
      //   setIsSubmitting(false)
      // }
    } catch (error) {
      console.error('Error signing DelAgent:', error)
      setIsSubmitting(false)
    }
  }

  const handleDelBuilder = async () => {
    if (!address) {
      alert('Please connect your wallet first')
      return
    }

    const nonce = getNonce()

    const messageParams = {
      builder: '0xc2af13e1B1de3A015252A115309A0F9DEEDCFa0A',
      asterChain: 'Mainnet',
      user: address,
      nonce: nonce,
    }

    const formattedMessage = formatDelBuilderMessage(messageParams)

    try {
      const signature = await signV3EIP712(formattedMessage, 'DelBuilder')
      console.log('DelBuilder signature:', signature)
      
      const apiParams = {
        ...messageParams,
        signature: signature,
        signatureChainId: chainId
      }
      
      setSignedApiParams({
        type: 'DelBuilder',
        params: apiParams,
      })
      
      // Commented out API call
      // setIsSubmitting(true)
      // try {
      //   const response = await delBuilder(apiParams)
      //   console.log('DelBuilder API response:', response.data)
      //   alert(`DelBuilder submitted successfully!\nSignature: ${signature}\nResponse: ${JSON.stringify(response.data)}`)
      // } catch (apiError) {
      //   console.error('Error calling delBuilder API:', apiError)
      //   alert(`Error submitting to API: ${apiError.response?.data?.message || apiError.message || 'Unknown error'}`)
      //   setIsSubmitting(false)
      // } finally {
      //   setIsSubmitting(false)
      // }
    } catch (error) {
      console.error('Error signing DelBuilder:', error)
      setIsSubmitting(false)
    }
  }

  const handlePlaceOrder = async () => {
    if (!address) {
      alert('Please connect your wallet first')
      return
    }

    const nonce = getNonce()

    const messageParams = {
      symbol: 'BTCUSDT',
      type: 'MARKET',
      builder: '0xc2af13e1B1de3A015252A115309A0F9DEEDCFa0A',
      feeRate: '0.00001',
      side: 'BUY',
      quantity: '0.03',
      asterChain: 'Mainnet',
      user: address,
      nonce: nonce,
    }

    const formattedMessage = formatPlaceOrderMessage(messageParams)

    try {
      const signature = await signV3EIP712(formattedMessage, 'PlaceOrder')
      console.log('PlaceOrder signature:', signature)
      
      const apiParams = {
        ...messageParams,
        signature: signature,
        signatureChainId: chainId
      }
      
      setSignedApiParams({
        type: 'PlaceOrder',
        params: apiParams,
      })
      
      // Commented out API call
      // setIsSubmitting(true)
      // try {
      //   const response = await placeOrder(apiParams)
      //   console.log('PlaceOrder API response:', response.data)
      //   alert(`PlaceOrder submitted successfully!\nSignature: ${signature}\nResponse: ${JSON.stringify(response.data)}`)
      // } catch (apiError) {
      //   console.error('Error calling placeOrder API:', apiError)
      //   alert(`Error submitting to API: ${apiError.response?.data?.message || apiError.message || 'Unknown error'}`)
      //   setIsSubmitting(false)
      // } finally {
      //   setIsSubmitting(false)
      // }
    } catch (error) {
      console.error('Error signing PlaceOrder:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container">
      <h1>Aster Code Demo</h1>
      
      {isConnected ? (
        <div className="connected">
          <div className="info-card">
            <h2>Connected</h2>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Chain ID:</strong> {chainId}</p>
            {balance && (
              <p><strong>Balance:</strong> {balance.formatted} {balance.symbol}</p>
            )}
          </div>
          
          <div className="sign-buttons">
            <h3>Sign Messages</h3>
            <button 
              onClick={handleApproveAgent} 
              className="button"
              disabled={isSigning || isSubmitting}
            >
              {isSigning ? 'Signing...' : 'Sign ApproveAgent'}
            </button>
            <button 
              onClick={handleApproveBuilder} 
              className="button"
              disabled={isSigning || isSubmitting}
            >
              {isSigning ? 'Signing...' : 'Sign ApproveBuilder'}
            </button>
            <button 
              onClick={handleUpdateBuilder} 
              className="button"
              disabled={isSigning || isSubmitting}
            >
              {isSigning ? 'Signing...' : isSubmitting ? 'Submitting...' : 'Update Builder'}
            </button>
            <button 
              onClick={handleUpdateAgent} 
              className="button"
              disabled={isSigning || isSubmitting}
            >
              {isSigning ? 'Signing...' : isSubmitting ? 'Submitting...' : 'Update Agent'}
            </button>
            <button 
              onClick={handleDelAgent} 
              className="button"
              disabled={isSigning || isSubmitting}
            >
              {isSigning ? 'Signing...' : isSubmitting ? 'Submitting...' : 'Delete Agent'}
            </button>
            <button 
              onClick={handleDelBuilder} 
              className="button"
              disabled={isSigning || isSubmitting}
            >
              {isSigning ? 'Signing...' : isSubmitting ? 'Submitting...' : 'Delete Builder'}
            </button>
            <button 
              onClick={handlePlaceOrder} 
              className="button"
              disabled={isSigning || isSubmitting}
            >
              {isSigning ? 'Signing...' : isSubmitting ? 'Submitting...' : 'Place Order'}
            </button>
          </div>

          {isSignError && (
            <div className="error-message">
              <p>Error: {signError?.message || 'Unknown error occurred'}</p>
            </div>
          )}

          {signedApiParams && (
            <div className="info-card" style={{ marginTop: '20px' }}>
              <h3>Signed API Params ({signedApiParams.type})</h3>
              <pre>
                {JSON.stringify(signedApiParams.params, null, 2)}
              </pre>
              <button 
                onClick={() => setSignedApiParams(null)} 
                className="button"
                style={{ marginTop: '10px' }}
              >
                Clear
              </button>
            </div>
          )}
          
          <button onClick={() => disconnect()} className="button button-danger">
            Disconnect
          </button>
        </div>
      ) : (
        <div className="connect">
          <h2>Connect Wallet</h2>
          <div className="connectors">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                disabled={isPending}
                className="button"
              >
                {connector.name}
                {isPending && ' (connecting...)'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App

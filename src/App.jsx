import React from 'react'
import { useConnection, useConnect, useDisconnect, useBalance, useChainId, useConnectors } from 'wagmi'
import { useSignEIP712, formatApproveAgentMessage, formatApproveBuilderMessage } from './sign.js'
import { approveAgent, approveBuilder } from './api.js'

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
      builderName: 'ivan',
      asterChain: 'Testnet',
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
      setIsSubmitting(true)
      try {
        const response = await approveAgent(apiParams)
        console.log('ApproveAgent API response:', response.data)
        alert(`ApproveAgent submitted successfully!\nSignature: ${signature}\nResponse: ${JSON.stringify(response.data)}`)
      } catch (apiError) {
        console.error('Error calling approveAgent API:', apiError)
        alert(`Error submitting to API: ${apiError.response?.data?.message || apiError.message || 'Unknown error'}`)
        setIsSubmitting(false) // Reset on error
      } finally {
        setIsSubmitting(false)
      }
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
      asterChain: 'Testnet',
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
      setIsSubmitting(true)
      try {
        const response = await approveBuilder(apiParams)
        console.log('ApproveBuilder API response:', response.data)
        alert(`ApproveBuilder submitted successfully!\nSignature: ${signature}\nResponse: ${JSON.stringify(response.data)}`)
      } catch (apiError) {
        console.error('Error calling approveBuilder API:', apiError)
        alert(`Error submitting to API: ${apiError.response?.data?.message || apiError.message || 'Unknown error'}`)
        setIsSubmitting(false) // Reset on error
      } finally {
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error signing ApproveBuilder:', error)
      // alert(`Error signing: ${error.message}`)
      setIsSubmitting(false) // Reset submission state on signing error
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
              disabled={isSigning}
            >
              {isSigning ? 'Signing...' : 'Sign ApproveAgent'}
            </button>
            <button 
              onClick={handleApproveBuilder} 
              className="button"
              disabled={isSigning}
            >
              {isSigning ? 'Signing...' : 'Sign ApproveBuilder'}
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

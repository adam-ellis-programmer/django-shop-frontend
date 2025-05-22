import React, { useState } from 'react'

const ProxyDebugger = () => {
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState('')

  const runTest = async (testName, testFn) => {
    setLoading(testName)
    try {
      const result = await testFn()
      setResults((prev) => ({
        ...prev,
        [testName]: { success: true, data: result },
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [testName]: {
          success: false,
          error: error.message || 'Unknown error',
          status: error.response?.status,
          details: error.response?.data,
        },
      }))
    } finally {
      setLoading('')
    }
  }

  const tests = [
    {
      name: 'Test Proxy Connection',
      fn: async () => {
        const response = await fetch('/api/', {
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        return await response.text()
      },
    },
    {
      name: 'Login Request',
      fn: async () => {
        // First get CSRF token
        const csrfResponse = await fetch('/api/auth/login/', {
          method: 'GET',
          credentials: 'include',
        })

        if (!csrfResponse.ok) {
          throw new Error(`CSRF fetch failed: ${csrfResponse.status}`)
        }

        // Get CSRF token from cookie
        const csrfToken = document.cookie
          .split(';')
          .find((row) => row.trim().startsWith('csrftoken='))
          ?.split('=')[1]

        if (!csrfToken) {
          throw new Error('No CSRF token found in cookies')
        }

        // Try login (this will fail but we can see the response)
        const loginResponse = await fetch('/api/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'testpassword',
          }),
        })

        return {
          status: loginResponse.status,
          data: await loginResponse.text(),
          headers: Object.fromEntries(loginResponse.headers.entries()),
        }
      },
    },
    {
      name: 'Check Auth Status',
      fn: async () => {
        const response = await fetch('/api/auth/user/', {
          credentials: 'include',
        })

        return {
          status: response.status,
          data: response.ok ? await response.json() : await response.text(),
          headers: Object.fromEntries(response.headers.entries()),
        }
      },
    },
  ]

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6'>Proxy Debug Tool</h2>

      {/* Current State */}
      <div className='mb-6 p-4 bg-gray-100 rounded-lg'>
        <h3 className='text-lg font-semibold mb-2'>Current State</h3>
        <div className='space-y-2 text-sm'>
          <div>
            <strong>Current URL:</strong> {window.location.href}
          </div>
          <div>
            <strong>All Cookies:</strong> {document.cookie || 'None'}
          </div>
          <div>
            <strong>CSRF Token:</strong>{' '}
            {document.cookie
              .split(';')
              .find((row) => row.trim().startsWith('csrftoken='))
              ?.split('=')[1] || 'Not found'}
          </div>
          <div>
            <strong>Session ID:</strong>{' '}
            {document.cookie
              .split(';')
              .find((row) => row.trim().startsWith('sessionid='))
              ?.split('=')[1] || 'Not found'}
          </div>
        </div>
      </div>

      {/* Test Buttons */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-4'>Run Tests</h3>
        <div className='flex flex-wrap gap-2'>
          {tests.map((test) => (
            <button
              key={test.name}
              onClick={() => runTest(test.name, test.fn)}
              disabled={loading === test.name}
              className={`px-4 py-2 rounded-lg text-white font-medium ${
                loading === test.name
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading === test.name ? 'Loading...' : test.name}
            </button>
          ))}
        </div>
      </div>

      {/* Manual Test */}
      <div className='mb-6 p-4 border rounded-lg'>
        <h3 className='text-lg font-semibold mb-2'>Manual Test</h3>
        <p className='text-sm text-gray-600 mb-2'>
          Open browser dev tools → Network tab, then click a test button to see
          the actual network requests
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Check:</strong> Is the request going to localhost:5173/api/...
          or directly to AWS?
        </p>
      </div>

      {/* Results */}
      <div>
        <h3 className='text-lg font-semibold mb-4'>Results</h3>
        {Object.entries(results).map(([testName, result]) => (
          <div key={testName} className='mb-4 p-4 border rounded-lg'>
            <h4
              className={`font-medium ${
                result.success ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {testName}: {result.success ? '✅ Success' : '❌ Failed'}
            </h4>

            {result.success ? (
              <pre className='mt-2 p-2 bg-green-50 rounded text-sm overflow-auto max-h-40'>
                {typeof result.data === 'string'
                  ? result.data
                  : JSON.stringify(result.data, null, 2)}
              </pre>
            ) : (
              <div>
                <div className='mt-2 p-2 bg-red-50 rounded text-sm'>
                  <strong>Error:</strong> {result.error}
                  {result.status && (
                    <div>
                      <strong>Status:</strong> {result.status}
                    </div>
                  )}
                </div>
                {result.details && (
                  <details className='mt-2'>
                    <summary className='cursor-pointer text-sm font-medium'>
                      View Details
                    </summary>
                    <pre className='mt-1 p-2 bg-gray-50 rounded text-xs overflow-auto max-h-32'>
                      {typeof result.details === 'string'
                        ? result.details
                        : JSON.stringify(result.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Clear Button */}
      <button
        onClick={() => setResults({})}
        className='mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'
      >
        Clear Results
      </button>
    </div>
  )
}

export default ProxyDebugger

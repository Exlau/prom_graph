import React from 'react'
import Button from 'antd/es/button'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
  const navigate = useNavigate()
  return (
    <div style={{
      fontFamily: 'deyi-black',
      fontSize: '40px',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <div>
        Oops! Something goes wrong.
      </div>
      <div>
        <Button
          style={{ fontSize: '40px' }}
          onClick={() => {
            navigate('/', {
              replace: true,
            })
          }}
          size="large"
          type="link"
        >
          Back
        </Button>
      </div>
    </div>
  )
}

export default ErrorPage

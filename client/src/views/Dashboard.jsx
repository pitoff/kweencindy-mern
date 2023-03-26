import React from 'react'
import { useStateContext } from '../Context/ContextProvider'
import DashboardCard from '../components/DashboardCard'

const Dashboard = () => {

  return (
    <>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:gid-cols-3 gap-5 text-gray-700'>
        <DashboardCard
          title="Total Surveys"
          className="order-1 lg:order-2"
          style={{ animationDelay: '0.1s' }}
        >
          <div className='text-8xl pb-4 font-semibold flex-1 flex items-center justify-center'>
            5
          </div>
        </DashboardCard>
        <DashboardCard
          title="Total Answers"
          className="order-1 lg:order-2"
          style={{ animationDelay: '0.2s' }}
        >
          <div className='text-8xl pb-4 font-semibold flex-1 flex items-center justify-center'>
            3
          </div>
        </DashboardCard>

      </div>

    </>

  )
}

export default Dashboard
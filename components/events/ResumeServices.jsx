import PropTypes from 'prop-types'
import { Search } from '../common/Icons'
import AddItem from '../common/AddItem'
import CardRequest from '../requests/Card'
import { useRouter } from 'next/router'

function ResumeServices({ event }) {
  const router = useRouter()
  return (
    <>
      {/* SERVICES AREA */}
      <div className='mt-4 flex flex-wrap gap-8'>
        <AddItem 
          text='Search Service.' 
          icon={ <Search className='fill-gray-500 mb-4 h-[150px]' /> }
          onClick={() => { router.push('/services') }}
        />
        {event.eventRequests.length > 0 &&
          event.eventRequests.map((request) => (
            <CardRequest key={request._id} request={request}/>
          ))
        }
      </div>
    </>
  )
}

// props validation
ResumeServices.propTypes = {
  event: PropTypes.object,
}

export default ResumeServices
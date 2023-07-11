import PropTypes from 'prop-types'
import { XMark } from './Icons'

function ErrorMsg({ message, hide }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {message}.</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <XMark onClick={hide} className="fill-current h-6 w-6 text-red-500" title='Close' />
      </span>
    </div>
  )
}

// props validation
ErrorMsg.propTypes = {
  message: PropTypes.string.isRequired,
  hide: PropTypes.func,
}

export default ErrorMsg
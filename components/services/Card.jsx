import PropTypes from 'prop-types'
import { Clock, Pencil, ThumbsDown, ThumbsDownFill, ThumbsUp, ThumbsUpFill, User } from '../common/Icons'
import { GiveReviewAPI, UpdateReviewAPI } from '../../services/review.service'
import { useRouter } from 'next/router'

function Card({ data, edit, editMode, user, update, requestTo}) {
  const router = useRouter()
  
  //  REVIEWS COUNT
  const reviewsCount = () => {
    const dataReview = data.serviceReviews
    const reviews = {
      up: 0,
      down: 0,
      userUp: false,
      userDown: false
    }
    dataReview.forEach((review) => {
      (review.thumb === 'up') ? reviews.up++ : reviews.down++
      if (user && review.userId === user._id && review.thumb === 'up') { reviews.userUp = true }
      if (user && review.userId === user._id && review.thumb === 'down') { reviews.userDown = true }
    })

    return reviews
  }
  
  const giveReviewService =  async (thumb, service) => {
    if(user) {
      const res = await GiveReviewAPI(service, thumb)
      if(res.hasOwnProperty("reviewId")) {
        await UpdateReviewAPI(res.reviewId, thumb)
        router.push('/services')
      } else {
        router.push('/services')
      }
      update()
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg relative h-[400px] w-[300px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="bg-[#9CC0FA] rounded-t-lg relative h-[180px]">
        {editMode &&
          <div onClick={() => edit(data)} className="cursor-pointer z-10 absolute top-[-10px] left-[-10px] gap-2 h-8 py-2 text-sm rounded-lg font-bold bg-gray-300 hover:bg-gray-400 text-gray-700 px-4">
            <Pencil /> 
          </div>
        }
        <div className='px-3 text-sm py-1 bg-gray-600 text-white font-bold top-2 left-2 rounded-lg absolute opacity-80'>{data.categoryId.title}</div>
        <div className='px-3 text-lg py-1 bg-neutral-100 text-black font-bold bottom-2 right-2 rounded-lg absolute opacity-80'>{data.price} €</div>
        <img className="rounded-t-lg w-full h-full object-cover mx-auto" src={`${data.img_url}`} alt="" />
      </div>
      <div className="p-5">
        <h5 className=" text-lg font-bold tracking-tight">{data.title}</h5>
        <div className='flex gap-2 items-center text-gray-600 mb-4'>
          {data.cityId.postal_code}&nbsp; • &nbsp;{data.cityId.name}
        </div>
        
        {data.min_capacity && data.max_capacity &&
          <div className='flex gap-2 items-center text-gray-600'>
            <User />
            <p className="font-normal">from {data.min_capacity} to {data.max_capacity}</p>
          </div>
        }
        {data.start_time && data.end_time &&
          <div className='flex gap-2 items-center text-gray-600'>
            <Clock />
            <p className="font-normal">{data.start_time}h - {data.end_time}h </p>
          </div>
        }
      </div>
      <div>
        <div onClick={() => requestTo(data)} className="absolute right-4 bottom-3 cursor-pointer inline-flex items-center px-3 py-2 text-sm font-bold text-center text-white bg-light rounded-lg hover:bg-dark focus:ring-4 focus:outline-none focus:ring-dark">
          Request
        </div>
      </div>
      <div className='absolute bottom-3 left-5 flex gap-4'>
        <div onClick={() => giveReviewService('up', data._id)} className={`text-green-600 gap-1 font-bold flex text-lg items-center ${user && 'cursor-pointer'}`}>
          {user &&
            (reviewsCount().userUp) ? <ThumbsUpFill /> : <ThumbsUp />
          || <ThumbsUp />}
          <span> {reviewsCount().up}</span>
        </div>
        <div onClick={() => giveReviewService('down', data._id)} className={`text-red-600 gap-1 font-bold flex text-lg items-center ${user && 'cursor-pointer'}`}>
          {user &&
            (reviewsCount().userDown) ? <ThumbsDownFill /> : <ThumbsDown />
          || <ThumbsDown />}
          <span> {reviewsCount().down}</span>
        </div>
      </div>
    </div>
  )
}

// props validation
Card.propTypes = {
  data: PropTypes.object,
  edit: PropTypes.func,
  editMode: PropTypes.bool,
  user: PropTypes.object,
  update: PropTypes.func,
  requestTo: PropTypes.func,
}

export default Card
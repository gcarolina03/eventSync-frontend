import React, { useEffect } from "react"
import Glide from "@glidejs/glide"
import { CircleUser, Quote } from "../common/Icons"


function Slide() {
  const handleSlide = () => {

  }
  useEffect(() => {
    const slider = new Glide(".glide", {
      type: "slider",
      focusAt: "center",
      perView: 1,
      autoplay: 4000,
      animationDuration: 1000,
      gap: 0,
      hoverpause: true
    }).mount()
    
    return () => {
      slider.destroy()
    }
  }, [])

  return (
    <>
      {/*<!-- Component: Testimonial slider --> */}
      <div className="relative w-full glide">
        {/*    <!-- Slides --> */}
        <div
          className="overflow-hidden text-center rounded text-slate-500 shadow-slate-200 "
          data-glide-el="track"
        >
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            <li>
              <div className="w-full">
                {/*                    <!-- Start Testimonial --> */}
                <div className="overflow-hidden relative justify-center h-[400px] flex items-center">
                  <div class="bg-[#FFFBF5] p-[1rem] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] h-[300px] w-[220px] transform rotate-[10deg]">
                    <div className="h-[220px]">
                      <img src="https://images.pexels.com/photos/382297/pexels-photo-382297.jpeg?cs=srgb&dl=pexels-salah-alawadhi-382297.jpg&fm=jpg" className="object-cover w-full h-full"/>
                    </div>
                  </div>
                  <div className="relative flex-col ml-[100px] w-[600px] h-full flex items-center justify-center">
                    <Quote className='absolute top-0 left-0 text-[80px] text-[#DCDBFF]'/>
                    <div className="ml-[100px] mt-[70px] flex-col text-black flex w-full">
                      <p className="text-3xl text-left">I recently had the pleasure of using the web page "EventSync," and I must say, it revolutionized the way I plan and organize social events. From start to finish, this platform exceeded my expectations and delivered an unparalleled level of convenience and efficiency.</p>
                      <div className="flex items-center mt-5 gap-2">
                        <CircleUser className='h-10 self-start' /><span>Michael C.</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/*                    <!-- End Testimonial --> */}
              </div>
            </li>
            <li>
              <div className="w-full">
                {/*                    <!-- Start Testimonial --> */}
                <div className="overflow-hidden relative justify-center h-[400px] flex items-center">
                  <div class="bg-[#FFFBF5] p-[1rem] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] h-[300px] w-[220px] transform rotate-[10deg]">
                    <div className="h-[220px]">
                      <img src="https://i.pinimg.com/736x/7c/eb/9a/7ceb9a306608c467aee245bb36dd9db3.jpg" className="object-cover w-full h-full"/>
                    </div>
                  </div>
                  <div className="relative flex-col ml-[100px] w-[600px] h-full flex items-center justify-center">
                    <Quote className='absolute top-0 left-0 text-[80px] text-[#DCDBFF]'/>
                    <div className="ml-[100px] mt-[70px] flex-col text-black flex w-full">
                      <p className="text-3xl text-left">EventSync has truly simplified the way I coordinate social events. As someone who often hosts gatherings, I've struggled with keeping track of all the details and ensuring everything runs smoothly. However, with EventSync, I found a reliable solution</p>
                      <div className="flex items-center mt-5 gap-2">
                        <CircleUser className='h-10 self-start' /><span>Samantha R.</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/*                    <!-- End Testimonial --> */}
              </div>
            </li>
            <li>
              <div className="w-full">
                {/*                    <!-- Start Testimonial --> */}
                <div className="overflow-hidden relative justify-center h-[400px] flex items-center">
                  <div class="bg-[#FFFBF5] p-[1rem] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] h-[300px] w-[220px] transform rotate-[10deg]">
                    <div className="h-[220px]">
                      <img src="https://media.istockphoto.com/id/479977238/photo/table-setting-for-an-event-party-or-wedding-reception.jpg?s=612x612&w=0&k=20&c=yIKLzW7wMydqmuItTTtUGS5cYTmrRGy0rXk81AltdTA=" className="object-cover w-full h-full"/>
                    </div>
                  </div>
                  <div className="relative flex-col ml-[100px] w-[600px] h-full flex items-center justify-center">
                    <Quote className='absolute top-0 left-0 text-[80px] text-[#DCDBFF]'/>
                    <div className="ml-[100px] mt-[70px] flex-col text-black flex w-full">
                      <p className="text-3xl text-left">I was initially skeptical about using EventSync to plan my social events, but after giving it a try, I can confidently say that it's a game-changer. The user-friendly interface made it incredibly easy for me to create events and manage guest lists.</p>
                      <div className="flex items-center mt-5 gap-2">
                        <CircleUser className='h-10 self-start' /><span>Benjamin M.</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/*                    <!-- End Testimonial --> */}
              </div>
            </li>
          </ul>
        </div>
        {/*    <!-- Indicators --> */}
        <div
          className="flex items-center justify-center w-full gap-2 pt-6 glide__bullets"
          data-glide-el="controls[nav]"
        > 
          <button
            className="p-4 group glide__bullet"
            data-glide-dir="=0"
            aria-label="goto slide 1"
          >
            <span className="block w-2 h-2 transition-colors duration-600 rounded-full bg-white/20 opacity-70 ring-1 ring-slate-700 focus:outline-none"></span>
          </button>
          <button
            className="p-4 group glide__bullet"
            data-glide-dir="=1"
            aria-label="goto slide 2"
          >
            <span className="block w-2 h-2 transition-colors duration-600 rounded-full bg-white/20 opacity-70 ring-1 ring-slate-700 focus:outline-none"></span>
          </button>
          <button
            className="p-4 group glide__bullet"
            data-glide-dir="=2"
            aria-label="goto slide 3"
          >
            <span className="block w-2 h-2 transition-colors duration-600 rounded-full bg-white/20 opacity-70 ring-1 ring-slate-700 focus:outline-none"></span>
          </button>

        </div>
      </div>

      {/*<!-- End Testimonial slider --> */}
    </>
  )
}

export default Slide
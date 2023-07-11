import { GitLogo, LinkedInLogo } from "./Icons"

function Footer() {
  return (
    <footer className="bg-white absolute inset-x-0 bottom-0">        
      <div className="px-1 sm:px-4 py-6 w-full bg-[#E9EFFF] flex flex-col sm:flex-row text-center items-center sm:justify-between">
        <p className="text-sm text-text sm:text-center">© 2023 <a href="#">EventSync</a></p>
        <div className="flex gap-4">
          <a className="font-semibold text-sm opacity-75 text-text" href="#" >Terms and conditions</a>
          <span className="font-semibold text-sm opacity-75 text-text">•</span>
          <a className="font-semibold text-sm opacity-75 text-text" href="#" >Privacy policy</a>
          <span className="font-semibold text-sm opacity-75 text-text">•</span>
          <a className="font-semibold text-sm opacity-75 text-text" href="#" >Support</a>
        </div>
        <div className="flex mt-1 space-x-5 sm:justify-center md:mt-0">
          <a href="https://github.com/gcarolina03" className="opacity-75 text-text hover:text-primary hover:opacity-100">
            <GitLogo className='w-5 h-5' />
            <span className="sr-only">GitHub account</span>
          </a>
          <a href="https://www.linkedin.com/in/gcarolina03" className="opacity-75 text-text hover:text-primary hover:opacity-100">
            <LinkedInLogo className='w-5 h-5' />
            <span className="sr-only">Dribbble account</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
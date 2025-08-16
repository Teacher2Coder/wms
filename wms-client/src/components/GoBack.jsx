import handleSmoothScroll from '../utils/handleSmoothScroll';

const GoBack = () => {
  return (
    <button
      onClick={() => {
        handleSmoothScroll();
        window.history.back();
      }}
      className="bg-accent-100 hover:bg-accent-200 text-accent-700 hover:text-accent-800 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
       <span>Go Back</span>
    </button>
  )
}

export default GoBack;
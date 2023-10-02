import { logo } from '../assets'

const Hero = () => {
  return (
    <header className='w-full lex justify-center items-center flex-col'>
        <nav className="flex justify-between items-center w-full mb-10 pt-3">
            <img src={logo} alt="logo" className='w-28 object-contain' />
            <button
                type='button'
                onClick={() => window.open('https://github.com/TeeAkinlade/sumz_Api_summerizer')}
                className='black_btn'
            >
                GitHub
            </button>
        </nav>
        <h1 className="head_text">
            Summarize Articles with <br className='max-md:hidden' />
            <span
            className='orange_gradient'>
                OpenAI GPT-4
            </span>
        </h1>
        <h2 className="desc text-center">
            Simplify your reading with Summize, an open-source article summarizer that transform lengthy article into clear and concise summeries
        </h2>
    </header>
  )
}

export default Hero
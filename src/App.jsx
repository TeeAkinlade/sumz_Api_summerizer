import Demo from './components/Demo'
import Hero from './components/Hero'

import  './App.css'

function App() {

  return (
    <>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Demo />
      </div>
    </>
  )
}

export default App

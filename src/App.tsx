import Calendar from  './Calendar.tsx'

function App() {

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-600">
    <Calendar date={new Date()} onChange={(date: Date) => null} />
    </ div>
  )
}

export default App

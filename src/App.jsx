import { useEffect, useState } from 'react'
import { getDst, getSrc, getSrcDetails } from './api'
import SelectDialog from './SelectDialog'

function App() {
  const [isSrcOpen, setIsSrcOpen] = useState(false)
  const [isDstOpen, setIsDstOpen] = useState(false)

  const [src, setSrc] = useState('')
  const [dst, setDst] = useState('')

  const [srcDetails, setSrcDetails] = useState([])
  const [checkedState, setCheckedState] = useState([])
  const [disabledState, setDisabledState] = useState([])

  useEffect(async () => {
    console.log('src: ', src)
    const data = await getSrcDetails(src)
    console.log('details: ', data)
    // test
    data.init = 'false'
    setSrcDetails(Object.keys(data))
    setCheckedState(new Array(Object.keys(data).length).fill(false))
    setDisabledState(
      Object.keys(data).map(item => (data[item] === 'true' ? false : true))
    )
  }, [src])

  const handleClick = i => {
    console.log('i: ', i)
    if (disabledState[i]) return
    const newCheckedState = checkedState.map((item, index) =>
      index === i ? !item : item
    )
    console.log('new checkedState: ', newCheckedState)
    setCheckedState(newCheckedState)
  }

  const submit = () => {
    console.log('src: ', src)
    console.log('dst: ', dst)
    const data = {
      src,
      dst,
      details: srcDetails.filter((_, index) => checkedState[index]),
    }
    console.log('data: ', data)
  }

  return (
    <div className="max-w-4xl container mx-auto px-4 py-8 flex flex-col">
      <div className="text-2xl text-center">Hard Link Tool</div>

      <div className="mt-12 flex flex-col space-y-10">
        <div className="p-4 bg-gray-100 rounded">
          <div className="text-xl">
            Source:
            {src && (
              <span className="ml-4 inline-block px-4 rounded border border-red-200 bg-red-50">
                {src}
              </span>
            )}
          </div>

          <div className="mt-4">
            <button
              className="bg-blue-200 px-4 py-2 rounded"
              onClick={() => setIsSrcOpen(true)}
            >
              select src
            </button>
            <SelectDialog
              title={'Select Source'}
              isOpen={isSrcOpen}
              setIsOpen={setIsSrcOpen}
              getDir={getSrc}
              setDir={setSrc}
            />
          </div>

          {srcDetails.length > 0 && (
            <div className="mt-8 border rounded divide-y">
              {srcDetails.map((d, i) => (
                <div
                  key={i}
                  className={`py-2 px-4 ${
                    disabledState[i]
                      ? 'cursor-auto'
                      : 'cursor-pointer hover:bg-green-100'
                  }`}
                  onClick={() => handleClick(i)}
                >
                  <input
                    type="checkbox"
                    checked={checkedState[i]}
                    disabled={disabledState[i]}
                    className="p-4"
                  />
                  <span className="ml-4">{d}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <div className="text-xl">
            Destination:
            {dst && (
              <span className="ml-4 inline-block px-4 rounded border border-red-200 bg-red-50">
                {dst}
              </span>
            )}
          </div>

          <div className="mt-4">
            <button
              className="bg-blue-200 px-4 py-2 rounded"
              onClick={() => setIsDstOpen(true)}
            >
              select dst
            </button>
            <SelectDialog
              title={'Select Destination'}
              isOpen={isDstOpen}
              setIsOpen={setIsDstOpen}
              getDir={getDst}
              setDir={setDst}
            />
          </div>
        </div>
      </div>

      <button
        className="mt-10 text-xl px-10 py-4 bg-green-400 rounded-lg"
        onClick={submit}
      >
        Confirm
      </button>
    </div>
  )
}

export default App

import { Dialog } from '@headlessui/react'
import { useEffect, useState } from 'react'

const SelectDialog = ({ title, isOpen, setIsOpen, getDir, setDir }) => {
  const [dirs, setDirs] = useState([])

  useEffect(async () => {
    const data = await getDir()
    console.log(`${title}: `, data)
    setDirs(data.dir)
  }, [])

  const handleSelect = dir => {
    console.log('dir: ', dir)
    setDir(dir)
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded min-w-[50vw] max-w-lg mx-auto my-10 py-8 px-4">
          <Dialog.Title className="text-center text-xl">{title}</Dialog.Title>

          <div className="my-8 divide-y border rounded">
            {dirs.map((dir, i) => (
              <div
                key={i}
                className="py-2 px-6 cursor-pointer hover:bg-green-100"
                onClick={() => handleSelect(dir)}
              >
                {dir}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="px-4 py-2 bg-red-200 rounded"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default SelectDialog

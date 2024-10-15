import React from 'react'

const navbar = () => {
  return (
    <nav className='flex text-white justify-between bg-violet-500 p-3 items-center'>
        <div><span className='text-2xl font-bold'>iTask</span></div>
        <ul className='flex list-none gap-6 '>
            <li className='hover:font-semibold'>Home</li>
            <li className='hover:font-semibold'>Tasks</li>
        </ul>

    </nav>
  )
}

export default navbar

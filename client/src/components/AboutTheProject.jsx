import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-cyan-700 dark:border-green-300 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className='flex-1 justify-center flex flex-col '>
            <h2 className='text-2xl dark:text-lime-300'>
                My GitHub
            </h2>
            <p className='text-gray-500 my-2 dark:text-gray-300'>
                You can also vitsit
            </p>
            <Button gradientDuoTone='greenToBlue' className='rounded-tl-xl rounded-bl-none '>
                <a href="https://github.com/schweizerwilsemann/simple-blog" target='_blank' rel='noopener noreferrer'>Click here to GitHub</a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://asia-1-fileserver-2.stringee.com/0/asia-1_1_U6LUG9IXN9I1KEO/1689662057-github-la-gi.png" 
                    alt="https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg?rand=1406588496" />

        </div>
    </div>
  )
}

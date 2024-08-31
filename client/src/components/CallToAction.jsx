import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-cyan-700 dark:border-green-300 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className='flex-1 justify-center flex flex-col '>
            <h2 className='text-2xl '>
                Want to join Discord? 
            </h2>
            <p className='text-gray-500 my-2'>
                Check it out for our channel!
            </p>
            <Button gradientDuoTone='tealToLime' className='rounded-tl-xl rounded-bl-none '>
                <a href="https:WWW.discord.com" target='_blank' rel='noopener noreferrer'>Discord - Where to unlimited communicate</a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://support.discord.com/hc/article_attachments/4420700074775" alt="https://cdn.tgdd.vn/News/Thumb/1556539/IGN-Nordic-copy-1200x675.jpg" />

        </div>
    </div>
  )
}

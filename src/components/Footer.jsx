import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-navbar-dark w-full fixed bottom-0 flex justify-center items-center '>
            <p className='text-xs'>
                Inspired by the glyphs created by{' '}
                <a className='underline' href='https://dedalvs.tumblr.com/'>
                    David J. Peterson
                </a>{' '}
                for his work on the valyrian language used in Game of Thrones and House of the
                Dragon. Using resources made by the great community at{' '}
                <a className='underline' href='https://discord.gg/TGZpdfy3'>
                    https://discord.gg/WZ2FrEUhqb
                </a>
            </p>
        </footer>
    )
}

export default Footer

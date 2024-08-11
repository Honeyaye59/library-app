import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import lightIcon from '../assets/light.svg'
import darkIcon from '../assets/dark.svg'
import UseSignOut from '../hooks/useSignOut';
import AuthContextProvider, { AuthContext } from '../contexts/AuthContext';


export default function Nav() {
    let { user } = useContext(AuthContext)
    console.log(user)
    let [search, setSearch] = useState("");
    let navigate = useNavigate();
    let handleSearch = () => {
        navigate(`?search=${search}`)

    }

    let { isDark, changeTheme } = useTheme()
    // console.log(theme);

    let { logOut } = UseSignOut()

    let signOutUser = async () => {

        await logOut();
        navigate('/login')

    }


    return (
        <nav className={`border border-b-1 ${isDark ? 'bg-dbg border-primary' : 'bg-white'}`}>
            <ul className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
                <li className='flex items-center gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                    <input type="text" placeholder='search book...' className='outline-none px-2 py-1 rounded-lg' value={search} onChange={e => setSearch(e.target.value)} />

                    <button className='text-white bg-primary px-3 py-2 rounded-2xl flex items-center g-2' onClick={handleSearch}>

                        <span>Search</span>

                    </button>
                </li>
                <Link to='/' className='flex items-center gap-3 md:-ml-32 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>

                    <span className='text-2xl font-bold text-primary hidden md:block'>Book Store</span>
                </Link>
                <li className='flex gap-3 items-center'>
                    <Link to='/create' className='text-white bg-primary px-3 py-2 rounded-2xl flex items-center g-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className='hidden md:block'>Create Book</span>

                    </Link>
                    <div className='w-12'>

                        <img src="https://imageio.forbes.com/specials-images/imageserve/6587daa4fba17a6377c28261/W-Korea-s-18th-Breast-Cancer-Awareness-Campaign--Love-Your-W-/0x0.jpg?format=jpg&crop=2404,1603,x0,y20,safe&width=960" alt="" className='w-full rounded-full' />

                    </div>
                    <div className='cursor-pointer'>
                        {isDark && <img src={lightIcon} alt="" className='w-8 text-black' onClick={() => {
                            console.log("light");
                            changeTheme('light')
                        }} />}
                        {!isDark && <img src={darkIcon} alt="" className='w-8' onClick={() => {
                            console.log("dark");
                            changeTheme('dark')

                        }} />}
                    </div>
                    <div>
                        {!!user && <button type='button' className='bg-red-500 text-white rounded-lg px-2 py-2 text-md' onClick={signOutUser}>Log out</button>}
                        {!user && <>
                            <Link type='button' className='bg-primary text-white rounded-lg px-2 py-2 text-md mr-3' to={'/login'}>Log In</Link>
                            <Link type='button' className='border border-primary text-primary rounded-lg px-2 py-2 text-md' to={'/register'}>Register</Link>
                        </>}
                    </div>
                </li>
            </ul>
        </nav>
    )
}

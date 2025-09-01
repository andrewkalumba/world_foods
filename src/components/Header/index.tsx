import Logo from "../Logo"
import Navigation from "../Navigation"
import Title from "../Title"

const Header = () => {
    return (
        <header className="w-full shadow-md">
            <div className="flex items-center justify-center relative bg-gradient-to-r from-black-800 via-blue-400 to-black-800 px-8 py-4 text-white shadow-lg">
                <div className="flex items-center gap-4 text-3xl font-extrabold">
                    <div className="absolute left-0 animate-pulse"><Logo /></div>
                    <Title />
                </div>
            </div>

            <Navigation />
        </header>
    )
}

export default Header

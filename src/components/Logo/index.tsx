import Image from "next/image"
const Logo = () => {
    return (
        <div>
            <Image src="/logo1.jpg" alt="logo" width={80} height={80} className="w-[100%]"/>
        </div>
    )
}
export default Logo
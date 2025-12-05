import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
    const linkStyle = "p-1 m-2 text-xl font-bold text-[#452B1F] hover:underline";

    return (

        <header className="flex justify-between items-center h-20 bg-[#452B1F] p-2">
            <h2 className="text-2xl font-bold p-2 items-center text-[#f5deb3]" >Java Jitters</h2>
            <nav>
                <ul className="flex items-center">
                    <Nav />



                </ul>
            </nav>
        </header>
    );
}

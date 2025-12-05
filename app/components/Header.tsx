import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
    const linkStyle = "p-1 m-2 text-xl font-bold text-brown-800 hover:underline";

    return (

        <header className="flex justify-between items-center h-20 bg-brown-400 p-2">
            <h2 className="text-2xl font-bold p-2 items-center" >Java Jitters</h2>
            <nav>
                <ul className="flex items-center">
                    <Nav />



                </ul>
            </nav>
        </header>
    );
}

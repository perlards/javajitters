import Nav from "./Nav";

export default function Header() {

    return (

        <header className="flex justify-between items-center h-20 bg-[#452B1F] p-2 w-screen">
            <h2 className="text-2xl font-bold p-2 items-center text-[#f5deb3]" >Java Jitters</h2>
            <nav className="overflow-x-auto">
                <ul className="flex items-center">
                    <Nav />



                </ul>
            </nav>
        </header>
    );
}

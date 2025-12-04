import Link from "next/link";

export default function Footer() {
    return (
        <footer className="p-4 text-center text-brown-800">
            <p>
                All rights reserved to JavaJitters &#169;
                <Link href="/credits" className="underline hover:text-brown-600">
                    Credits
                </Link>
            </p>
        </footer>
    );
}

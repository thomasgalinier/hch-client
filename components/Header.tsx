'use client'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useCookies} from "react-cookie";
import {useMe} from "@/service/auth";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
// @ts-ignore
import {Bike, LogOut, User} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";

const Header = () => {
    const router = useRouter()
    const pathname = usePathname();
    const [cookies, _setCookie, removeCookie] = useCookies(['token']);
    const {data: user} = useMe(cookies.token);
    const logout = () => {
        removeCookie('token');
        router.replace('/signin');
    }
    const isActive = (href: string) => pathname === href;
    console.log(pathname)
    return (
        <header className="w-full flex justify-center mt-4 absolute z-40">
            <section className='bg-slate-900 w-4/5 rounded-md p-2 border-slate-800 border-2 flex items-center justify-between '>
                <div>
                    <Link href={'/'} className="text-white">
                        <Bike size={40}/>
                    </Link>
                </div>
                <nav className="">
                    <ul className="flex gap-16 text-sm">
                        <Link
                            href={'/'}
                            className={`hover:text-green-500 ${isActive('/') ? 'text-green-500' : 'text-white'}`}
                        >
                            Accueil
                        </Link>
                        <li>
                            <Link href={'/about'} className={`hover:text-green-500 ${isActive('/about') ? 'text-green-500' : 'text-white'}`}>A propos</Link>
                        </li>
                        <li>
                            <Link href={'/contact'} className={`hover:text-green-500 ${isActive('/contact') ? 'text-green-500' : 'text-white'}`}>Contact</Link>
                        </li>
                    </ul>
                </nav>
                <div>
                {!user ?
                    <Button asChild>
                        <Link href="signin">Connexion</Link>
                    </Button> :
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar  className="cursor-pointer size-9" >
                                <AvatarImage
                                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.nom}${user.prenom}`}/>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{user.prenom}.{user.nom}</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                                <Link href={'profil'} className='flex '>
                                <User size={15}/> Profil
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={logout}> <LogOut
                                size={15}/> Déconnexion</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                }
                </div>
            </section>
        </header>
    )
}

export default Header;
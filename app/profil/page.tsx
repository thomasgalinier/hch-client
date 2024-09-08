'use client'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Header from "@/components/Header";
import {useCookies} from "react-cookie";
import {useMe} from "@/service/auth";
import {Car, LogOut} from "lucide-react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";

const Profil = () => {
    const [cookies, _setCookie, removeCookie] = useCookies(['token']);
    const {data: user} = useMe(cookies.token);
    console.log(user)
    return (
        <>
            <Header/>
            <div className='flex items-center justify-center h-screen-minus-header'>
            <Card className="w-full max-w-sm">
                <CardHeader className="flex-row items-center gap-6">
                    <CardTitle >
                        <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.nom}${user?.prenom}`}/>
                        </Avatar>
                    </CardTitle>
                    <CardTitle>
                        {user?.prenom} {user?.nom}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <span className="font-bold">Nom:</span> {user?.nom}
                        </div>
                        <div>
                            <span className="font-bold">Prénom:</span> {user?.prenom}
                        </div>
                        <div>
                            <span className="font-bold">Email:</span> {user?.email}
                        </div>
                        <div>
                            <span className="font-bold">Téléphone:</span> {user?.telephone}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant='destructive' className="flex gap-2">
                        <LogOut /> Déconnexion
                    </Button>
                </CardFooter>
            </Card>
            </div>
        </>
    )
}
export default Profil;
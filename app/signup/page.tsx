'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/schema";
import {z} from "zod";
import {useMutation} from "@tanstack/react-query";
import {signupClient} from "@/service/auth";
import {useCookies} from "react-cookie";
import {useRouter} from "next/navigation"; // Importer le composant

const Signup = () => {
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['token']);
    const form = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            prenom: "",
            nom: "",
            email: "",
            password: "",
            telephone: "",
        },
    });
    const mutation = useMutation({
        mutationFn: signupClient,
        mutationKey: ['me'],
        onSuccess: (data) => {
            const {token} = data;
            setCookie('token', token);
            router.replace('/dashboard')
        }
    })

    const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
        mutation.mutate(data);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Inscription</CardTitle>
                    <CardDescription>
                        Entrez vos informations ci-dessous pour créer un compte.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="prenom"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Prénom</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" placeholder="John" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nom"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" placeholder="Doe" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" placeholder="johndoe@gmail.com" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="telephone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telephone</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="tel" placeholder="0606060606" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mot de passe</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password"  />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" type="submit">
                                    Inscription
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Vous avez déjà un compte ?{" "}
                        <Link href="signin" className="underline">
                            Connectez-vous
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;

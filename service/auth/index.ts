import {z} from "zod";
import {SignInSchema, SignUpSchema, UserType} from "@/schema";
import {getUrl} from "@/service/api";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

const {url, userType} = getUrl();
const signinClient = async (data: z.infer<typeof SignInSchema>) => {
    const response = await fetch(`${url}/auth/signin/${userType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Response error:', errorData);
        throw new Error('Failed to sign in');
    }

    return await response.json();
}

const signupClient = async (data: z.infer<typeof SignUpSchema>) => {
    const response = await fetch(`${url}/auth/signup/${userType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorData = await response.json();
        console.error('Response error:', errorData);
        throw new Error('Failed to sign in');
    }

    return await response.json();
}


const getMe = async (token: string): Promise<UserType> => {
    const response = await fetch(`${url}/auth/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
    if (!response.ok) {
        const errorData = await response.json();
        console.error('Response error:', errorData);
    }
    return await response.json();
}
const useMe = (token: string): UseQueryResult<UserType, Error> => {
    return useQuery({
        queryKey: ['me', token],
        queryFn: () => getMe(token),
        enabled: !!token
    })
}

export {signinClient, useMe, signupClient};

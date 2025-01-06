'use client';
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import AdresseComplete, { ObjAdress } from "@/components/AdresseComplete";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as turf from '@turf/turf';
import { getZone } from "@/service/location";
import Link from "next/link";
import {ChevronRight} from "lucide-react";

export default function Home() {
    const [value, setValue] = useState('');
    const [objAdress, setObjAdress] = useState<ObjAdress | null>(null);
    const [inZone, setInZone] = useState<boolean>(false);
    const { data: zones } = useQuery({
        queryKey: ['zone'],
        queryFn: () => getZone(),
    });

    console.log(objAdress);

    // Fonction pour vérifier si un point est dans l'une des zones
    const handleClick = () => {
        if (objAdress && zones) {
            // Extraire la latitude et la longitude de l'adresse
            const { geometry: { coordinates: [longitude, latitude] } } = objAdress;

            // Créer un objet point avec la latitude et la longitude
            const point = turf.point([longitude, latitude]);

            // Vérifier si le point est dans l'une des zones
            let pointInZone = false;

            zones.forEach((zone: any) => {
                // Chaque zone a une structure avec un tableau de polygones imbriqués
                zone.polygone.coordinates.forEach((polygonCoordinates: any) => {
                    // Assurez-vous que polygonCoordinates est un tableau de tableaux
                    if (Array.isArray(polygonCoordinates)) {
                        // Créer un polygone avec les coordonnées de cette zone
                        const polygon = turf.polygon([polygonCoordinates]);

                        // Vérifier si le point est à l'intérieur du polygone
                        if (turf.booleanPointInPolygon(point, polygon)) {
                            pointInZone = true;
                        }
                    }
                });
            });

            // Afficher un message en fonction du résultat
            if (pointInZone) {
                setInZone(true);
            } else {
                setInZone(false);
            }
        }
    };

    return (
        <main>
            <Header />
            <section className="relative h-screen flex items-center justify-center bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
                <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
                <div className="relative flex flex-col items-center gap-2 w-4/12 text-center z-10">
                    <h1 className="text-white text-5xl">Réparation de vélo à domicile</h1>
                    <div className="flex gap-2 w-full items-center">
                        <AdresseComplete value={value} setValue={setValue} objAdress={objAdress} setObjAdress={setObjAdress} />
                        <Button disabled={!objAdress} onClick={handleClick}>Rechercher</Button>
                    </div>
                    {inZone === true &&
                        <>
                        <p className="text-white">Votre adresse est dans la zone de service </p>
                        <Link href={'/intervention'} className="flex items-center text-green-500">Faite une demande d&#39;intervention <ChevronRight/></Link>
                        </>
                    }
                </div>
            </section>
        </main>
    );
}

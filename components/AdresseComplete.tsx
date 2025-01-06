'use client'
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "@/service/location";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
export interface ObjAdress {
    type: string, geometry: { type: string, coordinates: [number, number] }, properties: { label: string, score: number, type: string, importance: number, id: string, name: string, postcode: string, citycode: string, x: number, y: number, city: string, context: string, locality: string }
}
interface AdresseCompleteProps {
    value: string,
    setValue: (value: string) => void
    objAdress: ObjAdress | null,
    setObjAdress: (value: ObjAdress | null) => void
}

const AdresseComplete = ({ value, setValue, objAdress, setObjAdress }: AdresseCompleteProps) => {
    const [isFocused, setIsFocused] = useState(true);

    // Requête pour récupérer les suggestions de lieux en fonction de la valeur saisie
    const { data } = useQuery({
        queryKey: ['places', value],
        queryFn: () => getPlaces(value),
        enabled: value.length > 2,
    });

    const suggestions = data?.features || [];

    // Met à jour la valeur dans l'état
    const handleChange = (value: string) => {
        setValue(value);
    };

    // Met à jour la valeur de l'input et ferme la liste des suggestions
    const handleSelect = (suggestion: ObjAdress) => {
        console.log(suggestion)
        setValue(suggestion.properties.label);  // Met à jour la valeur de l'input
        setObjAdress(suggestion);
        setIsFocused(false)
    };

    // Affiche la liste des suggestions au focus
    const handleFocus = () => {
        setIsFocused(true);
    };



    return (
        <Command className="rounded-lg border w-full">
            <CommandInput
                placeholder="Rechercher votre adresse"
                value={value}  // Valeur de l'input gérée par `value`
                onValueChange={handleChange}  // Mise à jour de l'input
                onFocus={handleFocus}  // Affiche la liste des suggestions
            />
            {isFocused && value.length > 2 && (
                <CommandList className="max-h-60 overflow-auto">
                    {suggestions.length === 0 ? (
                        <CommandEmpty>
                            <div className="p-4">Veuillez entrer une adresse valide</div>
                        </CommandEmpty>
                    ) : (
                        <CommandGroup>
                            {suggestions.map((suggestion: ObjAdress) => (
                                <CommandItem
                                    key={suggestion.properties.id}
                                    onSelect={() => handleSelect(suggestion)}  // Sélection de la suggestion
                                >
                                    {suggestion.properties.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            )}
        </Command>
    );
};

export default AdresseComplete;

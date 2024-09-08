'use client'
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "@/service/location";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useController } from "react-hook-form";

const AdresseComplete = ({ control, name }) => {
    const {
        field: { onChange, value },
    } = useController({
        name,
        control,
    });

    const { data } = useQuery({
        queryKey: ['places', value],
        queryFn: () => getPlaces(value),
        enabled: value.length > 2,
    });

    const suggestions = data?.features || [];

    const handleSelect = (suggestion) => {
        // Passe l'adresse sélectionnée au formulaire via `onChange`
        onChange(suggestion.properties.label);
    };

    return (
        <Command className="rounded-lg border">
            <CommandInput
                placeholder="Rechercher une adresse"
                value={value}
                onValueChange={onChange} // Utilise `onChange` de React Hook Form pour synchroniser l'input
            />
            <CommandList>
                {suggestions.length === 0 ? (
                    <CommandEmpty>
                        <div className="p-4">Veuillez entrer une adresse valide</div>
                    </CommandEmpty>
                ) : (
                    <CommandGroup>
                        {suggestions.map((suggestion) => (
                            <CommandItem
                                key={suggestion.properties.id}
                                onSelect={() => handleSelect(suggestion)} // Sélectionne l'adresse
                            >
                                {suggestion.properties.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </CommandList>
        </Command>
    );
};

export default AdresseComplete;

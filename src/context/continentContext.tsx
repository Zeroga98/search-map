import * as React from "react";

export const ContinentContext = React.createContext<ContextType | null>(null);

const ContinentProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [continents, setContinents] = React.useState<IContinent[]>([]);
    const [countries, setCountries] = React.useState<ICountry[]>([]);
    const [country, setCountry] = React.useState<ICountry>({
        code: "",
        name: "",
        native: "",
        phone: "",
        capital: "",
        currency: "",
        emoji: "",
        emojiU: ""
    });

    const saveContinents = (newContinents: IContinent[]) => {
        const newContinentsT: IContinent[] = newContinents
        setContinents(newContinentsT);
    };

    const saveCountries = (newCountries: ICountry[]) => {
        const newCountriesT: ICountry[] = newCountries
        setCountries(newCountriesT);
    };

    const saveCountry = (newCountry: ICountry) => {
        const newCountryT: ICountry = newCountry
        setCountry(newCountryT);
    };

    return (
        <ContinentContext.Provider value={{ continents, saveContinents, countries, saveCountries, country, saveCountry }}>
            {children}
        </ContinentContext.Provider>
    );
};

export default ContinentProvider;

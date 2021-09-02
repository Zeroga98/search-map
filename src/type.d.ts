interface ICountry {
    code: string;
    name: string;
    native: string;
    phone: string;
    continent?: IContinent;
    capital: string;
    currency: string;
    emoji: string;
    emojiU: string;
}

interface IContinent {
    code: number;
    name: string;
    countries: ICountry[];
}

type ContextType = {
    continents: IContinent[];
    saveContinents: (continent: IContinent[]) => void;
    countries: ICountry[];
    saveCountries: (countries: ICountry[]) => void;
};

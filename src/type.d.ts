interface ILanguage {
    name: string;
    code: string;
    native: string;
    rtl: boolean;
}
interface ICountry {
    code: string;
    name: string;
    native: string;
    phone: string;
    continent?: IContinent;
    languages?: ILanguage[];
    capital: string;
    currency: string;
    emoji: string;
    emojiU: string;
}

interface IContinent {
    code: number;
    name: string;
    countries?: ICountry[];
}

type ContextType = {
    continents: IContinent[];
    saveContinents: (continent: IContinent[]) => void;
    countries: ICountry[];
    saveCountries: (countries: ICountry[]) => void;
    country: ICountry;
    saveCountry: (country: ICountry) => void;
};

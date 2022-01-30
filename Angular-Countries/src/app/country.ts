export interface Country {
    borders: string[],
    capital: string[],
    currencies: Object,
    flags: Flag,
    languages: Object,
    name: Name,
    cca3: string,
    population: number,
    region: string,
    subregion: string,
    tld: string[]
}


export interface Flag {
    png: string,
    svg: string,
}

export interface Name{
    common: string,
    nativeName: nativeName, 
    official: string
}

export interface nativeName{
    common: string,
    official: string,
}

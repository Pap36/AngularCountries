export interface Country {
    borders: string[],
    capital: string[],
    currencies: Currency[],
    flags: Flag,
    languages: Language[],
    name: Name,
    population: number,
    region: string,
    subregion: string,
    tld: string[]
}

export interface Currency {
    name: string,
    symbol: string
}

export interface Flag {
    png: string,
    svg: string,
}

export interface Language{
    name: string,
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

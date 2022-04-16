import { ApolloError } from '@apollo/client';
import { createContext, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ControlOptions } from './useForm';

export type InsertFormProps<T> = {
    children: Children;
    success: {
        navigate?: (data: T) => string;
        toastBody?: (data: T) => string;
        toastTitle?: (data: T) => string;
        toastSubtitle?: (data: T) => string;
    };
    failure: {
        toastBody?: (data: Error) => string;
        toastTitle?: (data: Error) => string;
        toastSubtitle?: (data: Error) => string;
    };
};
export const InsertFormContext = createContext<
    { register: (name: string, options?: ControlOptions) => void } | undefined
>(undefined);

export const FieldSetContext = createContext<{ objName: string } | undefined>(undefined);

export function useRequireAuth() {
    const { isAuthenticated } = useAuth();
    useEffect(() => {
        if (!isAuthenticated)
    }, []);
}
export const stateMap = {
    AL: 'Alabama',
    AZ: 'Arizona',
    AR: 'Arkansas',
    AK: 'Alaska',
    CA: 'California',
    CT: 'Connecticut',
    CO: 'Colorado',
    DE: 'Deleware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KY: 'Kentucky',
    KS: 'Kansas',
    LA: 'Louisiana',
    MA: 'Massachusetts',
    ME: 'Maine',
    MI: 'Michigan',
    MN: 'Minnesota',
    MD: 'Maryland',
    MO: 'Missouri',
    MS: 'Mississippi',
    MT: 'Montana',
    NE: 'Nebraska',
    NH: 'New Hampshire',
    NY: 'New York',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NV: 'Nevada',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TX: 'Texas',
    TN: 'Tennessee',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WV: 'West Virginia',
    WA: 'Washington',
    WY: 'Wyoming',
    WI: 'Wisconsin',
    DC: 'Washington, DC',
    PR: 'Puerto Rico'
};

export const countryMap = {
    US: 'United States',
    GB: 'United Kingdom',
    FR: 'France',
    ES: 'Spain',
    IT: 'Italy',
    DE: 'Germany',
    NO: 'Norway',
    CA: 'Canada',
    CN: 'China',
    MX: 'Mexico',
    GT: 'Guatemala',
    SV: 'El Salvador',
    HN: 'Honduras',
    HT: 'Haiti',
    CR: 'Costa Rica',
    PA: 'Panama',
    CO: 'Colombia',
    PE: 'Peru',
    VE: 'Venezuela',
    AU: 'Australia',
    NZ: 'New Zealand',
    SG: 'Singapore',
    VN: 'Vietnam',
    TH: 'Thailand',
    MM: 'Myanmar',
    KH: 'Cambodia',
    IN: 'India',
    ID: 'Indonesia',
    PK: 'Pakistan',
    BD: 'Bangladesh',
    JP: 'Japan',
    KP: 'North Korea',
    KR: 'South Korea',
    MN: 'Mongolia',
    ZA: 'South Africa',
    EG: 'Egypt',
    MA: 'Morocco',
    KY: 'Kenya'
};
const reg = new RegExp('^[0-9]{5}([-]?[0-9]{4})?$|^[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]$');

export type InputKeys = 'actually'|'plan';
export type OutputKeys = InputKeys|'total';

export interface Level {
    [key: string]: number
}


export type InputRecord = Record<InputKeys, Level>
export type OutputRecord = Record<OutputKeys, unknown>

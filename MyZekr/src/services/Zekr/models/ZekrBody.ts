export interface ZekrBody {
	body: string;
	alternateBody?: ZekrBody;
	alternateBodyList?: ZekrBody[];
	languageKey?: string;
	optional?: boolean;
	optionalText?: string;
}

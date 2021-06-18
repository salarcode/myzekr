export interface ZekrBody {
	body: string;
	translationBody?: ZekrBody;
	alternateBodyList?: ZekrBody[];
	languageKey?: string;
	optional?: boolean;
	optionalText?: string;
}

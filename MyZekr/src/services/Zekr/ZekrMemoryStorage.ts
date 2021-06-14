import { Zekr, ZekrMemory } from './models/Zekr';
import {
	ZekrCategoryAfterNamaz,
	ZekrCategoryNamaz,
} from './ZekrMemoryCategories';

export function getZekrMemoryList(): ZekrMemory[] {
	return _memoryZekrList;
}
export function getZekrMemoryByUid(uid: string): ZekrMemory | undefined {
	if (!uid) return undefined;

	uid = uid.toLowerCase();

	return _memoryZekrList.find((zekr) => zekr.uid === uid);
}

export function getZekrMemoryByCategoryUid(
	uid: string,
): ZekrMemory[] | undefined {
	if (!uid) return undefined;

	uid = uid.toLowerCase();

	return _memoryZekrList.filter((zekr) => zekr?.category === uid);
}
const _memoryZekrList: Zekr[] = [
	{
		uid: 'after-salah-1',
		shortName: 'دعاهای بعد از نماز 1',
		fullName: 'دعاهای بعد از نماز',
		zekrBody: [
			{
				body:
					'اَسْتَغْفِرُ اللَّهَ الَّذى لا اِلهَ اِلاّ هُوَ الْحَىُّ الْقَيُّومُ ذُوالْجَلالِ وَالاِْكْرامِ وَاَتُوبُ اِلَيْهِ',
				alternateBodyList: [
					{
						languageKey: 'fa',
						body:
							'آمرزش مى‏ طلبم از خدا، كه معبودى جز او نيست، زنده و به خود پاينده و صاحب بزرگى و بزرگوارى است و به سوى او باز مى ‏گردم.',
					},
				],
			},
		],
		benefits: [
			{
				body:
					'كينى به سند معتبر از حضرت باقر عليه السّلام روايت كرده‏ هركه پس از نماز واجب، پيش از آن‏كه پاهاى خود را بگرداند، سه مرتبه اين دعا را بخواند، خدا گناهان او را بيامرزد، هرچند در كثر مانند كف دريا باشند.',
			},
		],
		category: ZekrCategoryAfterNamaz.uid,
	},
	{
		uid: 'after-salah-2',
		shortName: 'دعاهای بعد از نماز 2',
		fullName: 'دعاهای بعد از نماز',
		zekrBody: [
			{
				body:
					'اُعيذُ نَفْسى وَ ما رَزَقَنى رَبّى بِاللَّهِ الْواحِدِ الصَّمَدِ',
				languageKey: 'ar',
				alternateBodyList: [
					{
						languageKey: 'fa',
						body:
							'خودم را و آنچه پروردگارم روزى ‏ام نموده پناه مى‏ دهم به خداى يگانه بى ‏نياز',
					},
				],
			},
			{
				body:
					'الَّذى لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوا اَحَدٌ',
				languageKey: 'ar',
				alternateBodyList: [
					{
						languageKey: 'fa',
						body:
							' كه نزاده، و زاده نشده است، و احدى همتاى او نبوده،',
					},
				],
			},
			{
				body:
					'وَاُعيذُ نَفْسى وَما رَزَقَنى رَبّى بِرَبِّ الْفَلَقِ مِنْ شَرِّ ما خَلَقَ',
				languageKey: 'ar',
				alternateBodyList: [
					{
						languageKey: 'fa',
						body:
							' و خودم را و آنچه پروردگارم روزى ‏ام نموده، پناه‏ مى‏ دهم، به پروردگار سپيده‏ مان از هرچه آفريد،',
					},
				],
			},
			{
				body:
					'وَمِنْ شِرِّ غاسِقٍ اِذا وَقَبَ وَمِنْ شَرِّ النَّفّاثاتِ فِى الْعُقَدِ وَمِنْ شَرِّ حاسِدٍ اِذا حَسَدَ',
				languageKey: 'ar',
				alternateBodyList: [
					{
						languageKey: 'fa',
						body:
							'و از گزند شب تيره زمانى كه تاريكى ‏اش درآيد، و از شرّ دمندگان در گره‏ ها، و از شر حسود هنگامى كه حسد ورزد،',
					},
				],
			},
		],
		benefits: [
			{
				body:
					'كلينى به سند معتبر از حضرت صادق عليه السّلام روايت كرده: اين دعا را پس از هر نماز ترك نكن',
			},
		],
		source: [
			{
				title: 'مرکز تحقیقات سیما',
				url:
					'https://stackoverflow.com/questions/38518278/how-to-use-jquery-with-reactjs',
			},
		],
		category: ZekrCategoryAfterNamaz.uid,
	},
	{
		uid: 'prayer-fajr',
		shortName: 'نماز صبح (دو رکعتی)',
		fullName: 'نماز صبح (دو رکعتی)',
		zekrBody: [
			{
				body: `اللّهُ‏ أَکْبَرُ، اللّهُ‏ أَکْبَرُ، اللّهُ‏ أَکْبَرُ، اللّهُ‏ أَکْبَرُ
					أَشْهَدُ أَنْ لا إِلٰهَ إلّا اللّهُ، أَشْهَدُ أَنْ لا إِلٰهَ إلّا اللّهُ
					أَشْهَدُ أنَّ مُحَمَّداً رَسُوْلُ اللّهِ، أَشْهَدُ أنَّ مُحَمَّداً رَسُوْلُ اللّهِ
					حَیَّ عَلَی الصَّلاةِ، حَیَّ عَلَی الصَّلاةِ
					حَیَّ عَلی الفَلٰاحِ، حَیَّ عَلی الفَلٰاحِ
					حَیَّ عَلیٰ خَیرِ الْعَمَلِ، حَیَّ عَلیٰ خَیرِ الْعَمَلِ
					اللّهُ‏ أَکْبَرُ، اللّهُ‏ أَکْبَرُ
					لا إِلٰهَ إلّا اللّهُ، لا إِلٰهَ إلّا اللّهُ 
					
					و اقامه:

					اللّهُ‏ أَکْبَرُ، اللّهُ‏ أَکْبَرُ
					أَشْهَدُ أَنْ لا إِلٰهَ إلّا اللّهُ، أَشْهَدُ أَنْ لا إِلٰهَ إلّا اللّهُ
					أَشْهَدُ أنَّ مُحَمَّداً رَسُوْلُ اللّهِ، أَشْهَدُ أنَّ مُحَمَّداً رَسُوْلُ اللّهِ
					حَیَّ عَلَی الصَّلاةِ، حَیَّ عَلَی الصَّلاةِ
					حَیَّ عَلی الفَلٰاحِ، حَیَّ عَلی الفَلٰاحِ
					حَیَّ عَلیٰ خَیرِ الْعَمَلِ، حَیَّ عَلیٰ خَیرِ الْعَمَلِ
					قَدْ قٰامَتِ الصَّلاَةُ، قَدْ قٰامَتِ الصَّلاَةُ
					اللّهُ‏ أَکْبَرُ، اللّهُ‏ أَکْبَرُ
					لا إِلٰهَ إلّا اللّهُ
					`,
				languageKey: 'ar',
				alternateBody: {
					body:
						'1- پس از وضو گرفتن ، به نماز می ایستیم اذان را به صورت زیر می خوانیم :',
				},
			},
			{
				body: '',
				alternateBody: {
					body:
						'2- ابتدا نيت كرده : 2 ركعت نماز صبح مي خوانم قربه اله الله',
				},
			},
			{
				body: '3- سوره حمد و توحيد را خوانده',
				languageKey: 'fa',
			},
			{
				body: 'سبحان ربي العظيم وبحمده',
				languageKey: 'ar',
				alternateBody: {
					body: '4- ركوع (خم شده) 1 مرتبه',
				},
			},
			{
				body: 'سُبحآنَ رَبّیَ الاَعلی وَ بِحَمدِهِ',
				alternateBody: {
					body: '5- سجده (خوابيده) 2 مرتبه',
				},
			},
			{
				body: 'ربنا آتنا في الدنيا حسنة وفي الاخرة حسن وقنا عذاب النار',
				languageKey: 'ar',
				alternateBody: {
					body:
						'6- و بعد از سجده پا شده و دوباره سوره ي حمد و توحيد را خوانده و بعد از آن قنوت را گفته ',
				},
			},
			{
				body: 'سبحان ربي العظيم وبحمده',
				languageKey: 'ar',
				alternateBody: {
					body: '7- بعد از قنوت ركوع را گفته (1 مرتبه)',
				},
			},
			{
				body: 'سُبحآنَ رَبّیَ الاَعلی وَ بِحَمدِهِ',
				languageKey: 'ar',
				alternateBody: {
					body: '8- و بعد سجده (2 مرتبه)',
				},
			},
			{
				body: `اشهد ان لا اله الا الله وحده لا شريک له و اشهد ان محمدا عبده ورسوله اللهم صل علي محمد وال محمد
					<img src='https://uupload.ir/files/5254_69302512237310093188.gif'/>
					`,
				languageKey: 'ar',
				alternateBody: {
					body: '9- و بعد از آن نشته تشهد را مي گوييم',
				},
			},
			{
				body: `السلام عليک ايها النبي ورحمة الله وبرکاته
				السلام علينا وعلي عباد الله الصالحين
				السلام عليکم ورحمة الله وبرکاته`,
				languageKey: 'ar',
				alternateBody: {
					body: '10- و در آخر سلام را مي گوييم',
				},
			},
			{
				body: '',
			},
		],
		benefits: [
			{
				body:
					'كينى به سند معتبر از حضرت باقر عليه السّلام روايت كرده‏ هركه پس از نماز واجب، پيش از آن‏كه پاهاى خود را بگرداند، سه مرتبه اين دعا را بخواند، خدا گناهان او را بيامرزد، هرچند در كثر مانند كف دريا باشند.',
			},
		],
		category: ZekrCategoryNamaz.uid,
	},
];

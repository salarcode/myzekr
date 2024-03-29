﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text.RegularExpressions;
using ZekrDb.Data.Models;
using ZekrDb.Data.Models.Zekr;

namespace ZekrDbClient.Common
{
	public class ZekrParser
	{
		/// <summary>
		/// ادغام اذکار به هم به صورت متن/ترجمه
		/// </summary>
		/// <param name="zekrBodies"></param>
		/// <returns></returns>
		public static List<ZekrBody> MergeRelatedTranslations(List<ZekrBody> zekrBodies)
		{
			var result = new List<ZekrBody>();
			int index = 0;

			ZekrBody lastBody = null;
			for (index = 0; index < zekrBodies.Count; index++)
			{
				var body = zekrBodies[index];

				if (lastBody == null)
				{
					lastBody = body;
					result.Add(body);

					continue;
				}

				if (body.languageKey == lastBody.languageKey)
				{
					if (lastBody.alternateBodyList == null)
						lastBody.alternateBodyList = new ObservableCollection<ZekrBody>();
					lastBody.alternateBodyList.Add(body);
					lastBody = body;
					continue;
				}
				// Languages are different

				if (body.languageKey == LanguageList.LanguageFarsi)
				{
					//if (lastBody.alternateBodyList == null)
					//	lastBody.alternateBodyList = new ObservableCollection<ZekrBody>();
					//lastBody.alternateBodyList.Add(body);

					if (lastBody.translationBody == null)
					{
						lastBody.translationBody = body;
					}
					else
					{
						if (lastBody.alternateBodyList == null)
							lastBody.alternateBodyList = new ObservableCollection<ZekrBody>();
						lastBody.alternateBodyList.Add(body);
					}
					lastBody = body;
				}
				else
				{
					// arabic and empty
					lastBody = body;
					result.Add(body);
				}
			}

			return result;
		}
		public static List<ZekrBody> ConvertTextLines(string text)
		{
			var result = new List<ZekrBody>();
			var lines = text.Split(new string[] { "\r", "\n" }, StringSplitOptions.RemoveEmptyEntries);

			for (int index = 0; index < lines.Length; index++)
			{
				var line = lines[index];
				var arabicOrPersian = IsArabicOrPersian(line);
				var quran = false;
				if (arabicOrPersian)
					quran = IsArabicQuran(line);

				var body = new ZekrBody()
				{
					body = line,
				};

				if (line.Contains("شأن"))
				{
					// TODO :REMOVE
					body.languageKey = LanguageList.LanguageArabic;
				}

				if (quran)
					body.languageKey = LanguageList.LanguageArabic;
				else if (arabicOrPersian)
					body.languageKey = LanguageList.LanguageFarsi;
				else
					body.languageKey = null;

				result.Add(body);
			}

			return result;
		}


		public static bool IsArabicQuran(string text)
		{
			if (!IsArabicOrPersian(text))
				return false;

			var arabicDiacritics = 0;

			foreach (var c in text)
			{
				if (c == 'پ' || c == 'چ' || c == 'ژ' || c == 'گ')
					return false;

				//if (c == 'ة' /*|| c == 'أ'*/ || c == 'ؤ')
				//	// double the weight
				//	arabicDiacritics += 2;
				//else if (c == 'ٍ' || c == 'ٌ' || c == 'ً' || c == 'ۀ' || c == 'ّ' || c == 'ِ' || c == 'ُ' || c == 'َ' || c == 'ْ' || c == 'إ')
				//	arabicDiacritics++;

				if (c == '\u0629' /*|| c == '\u0623'*/ || c == '\u0624')
					// double the weight
					arabicDiacritics += 2;
				else if (c == '\u064D' || c == '\u064C' || c == '\u064B' || c == '\u06C0' || c == '\u0651' || c == '\u0650' || c == '\u064F' || c == '\u064E' || c == '\u0652' || c == '\u0625')
					arabicDiacritics++;
			}

			if (arabicDiacritics > 0)
			{
				var textLength = text.Length - arabicDiacritics;
				if (textLength == 0)
					return true;

				var arabicPercent = (textLength * 15 / 100);

				if (arabicDiacritics >= arabicPercent)
					return true;
			}

			return false;
		}

		/// <summary>
		/// return true if arabic
		/// </summary>
		/// <param name="text"></param>
		/// <returns></returns>
		public static bool IsArabicOrPersian(string text)
		{
			return Regex.IsMatch(text, @"\p{IsArabic}");
		}
	}
}

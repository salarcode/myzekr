﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZekrDb.Data.Models.Zekr;

namespace ZekrDb.Data.Models
{
	public static class ZekrModelStore
	{
		private static string _zekrDbPath;


		public static string ZekrUidPath => ZekrDbPath + @"zekr\";
		public static string ZekrVoicesPath => ZekrDbPath + @"zekr-voice\";
		public const string JsonFileExtension = ".json";
		public const string RemoveFileExtension = ".removed";
		public const string ZekrCategories = "category-index" + JsonFileExtension;
		public const string ZekrTags = "tag-index" + JsonFileExtension;
		public const string ZekrIndex = "zekr-index" + JsonFileExtension;


		public static string ZekrDbPath =>
			_zekrDbPath ??= ConfigurationManager.AppSettings["ZekrDbPath"];

		public static Zekr.Zekr LoadZekrByUid(string uid)
		{
			var path = Path.Combine(ZekrUidPath, uid + JsonFileExtension);
			return ModelStore.Read<Zekr.Zekr>(path);
		}

		public static void SaveZekr(Zekr.Zekr zekr)
		{
			if (zekr == null || string.IsNullOrEmpty(zekr.uid))
				throw new ArgumentNullException(nameof(zekr));
			var path = Path.Combine(ZekrUidPath, zekr.uid + JsonFileExtension);
			ModelStore.Write(zekr, path);
		}

		public static List<ZekrCategory> ReadZekrCategories()
		{
			var path = Path.Combine(ZekrDbPath, ZekrCategories);
			return ModelStore.Read<List<ZekrCategory>>(path);
		}

		public static List<ZekrTag> ReadZekrTags()
		{
			var path = Path.Combine(ZekrDbPath, ZekrTags);
			return ModelStore.Read<List<ZekrTag>>(path);
		}

		public static List<ZekrIndex> ReadZekrIndex()
		{
			var path = Path.Combine(ZekrDbPath, ZekrIndex);
			return ModelStore.Read<List<ZekrIndex>>(path);
		}

		public static void SaveZekrIndex(List<ZekrIndex> zekrIndexes)
		{
			var path = Path.Combine(ZekrDbPath, ZekrIndex);
			ModelStore.Write(zekrIndexes, path);
		}

		public static void RemoveZekr(string uid)
		{
			var path = Path.Combine(ZekrUidPath, uid + JsonFileExtension);
			FileInfo f;
			if ((f = new FileInfo(path)).Exists)
			{
				var nameName = path + RemoveFileExtension;
				f.MoveTo(nameName, true);
			}
		}

		public static bool ZekrVoiceExists(string sourceFilename)
		{
			var newFilename = Path.Combine(ZekrVoicesPath, sourceFilename);
			return File.Exists(newFilename);
		}

		public static long ZekrVoiceSize(string sourceFilename)
		{
			var newFilename = Path.Combine(ZekrVoicesPath, sourceFilename);
			var file = new FileInfo(newFilename);
			if (file.Exists)
			{
				return file.Length;
			}
			return -1;
		}

		public static void SaveZekrVoice(string sourceFilepath, string newName)
		{
			var newFilename = Path.Combine(ZekrVoicesPath, newName);
			if (new FileInfo(newFilename).FullName == sourceFilepath)
				return;
			System.IO.File.Copy(sourceFilepath, newFilename, true);
		}
	}
}

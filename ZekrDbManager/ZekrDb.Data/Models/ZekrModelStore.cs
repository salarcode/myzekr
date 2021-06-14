using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZekrDb.Data.Models.Zekr;

namespace ZekrDb.Data.Models
{
	public static class ZekrModelStore
	{
		public const string ZekrDbPath = @"F:\Programming\React\Zekr\zekr\public\zekr-db\";
		public const string ZekrUidPath = ZekrDbPath + @"zekr\";
		public const string JsonFileExtension = ".json";
		public const string RemoveFileExtension = ".removed";
		public const string ZekrCategories = "category-index" + JsonFileExtension;
		public const string ZekrTags = "tag-index" + JsonFileExtension;
		public const string ZekrIndex = "zekr-index" + JsonFileExtension;

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
	}
}

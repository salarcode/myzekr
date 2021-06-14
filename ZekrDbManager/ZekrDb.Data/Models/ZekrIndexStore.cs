using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nelibur.ObjectMapper;
using ZekrDb.Data.Models.Zekr;

namespace ZekrDb.Data.Models
{
	public static class ZekrIndexStore
	{
		static ZekrIndexStore()
		{
			TinyMapper.Bind<Zekr.Zekr, ZekrIndex>();
		}

		public static void ApplyZekrIndex(Zekr.Zekr zekr)
		{
			var zekrIndexes = ZekrModelStore.ReadZekrIndex();

			var uid = zekr.uid.ToLower();
			var zekrIndex = zekrIndexes.FirstOrDefault(a => a.uid == uid);
			if (zekrIndex == null)
			{
				zekrIndex = TinyMapper.Map<ZekrIndex>(zekr);

				zekrIndexes.Add(zekrIndex);
			}

			ZekrModelStore.SaveZekrIndex(zekrIndexes);
		}

		public static void RemoveZekr(string uid)
		{
			var zekrIndexes = ZekrModelStore.ReadZekrIndex();

			uid = uid.ToLower();
			var zekrIndex = zekrIndexes.FirstOrDefault(a => a.uid == uid);
			if (zekrIndex != null)
			{
				zekrIndexes.Remove(zekrIndex);
			}

			ZekrModelStore.SaveZekrIndex(zekrIndexes);
		}
	}
}

﻿using Newtonsoft.Json;
using System.IO;
using ZekrDb.Data.Infrastructure;

namespace ZekrDb.Data.Models
{
	public static class ModelStore
	{
#if DEBUG
		public static Formatting JsonFormatting = Formatting.Indented;
#else
		public static Formatting JsonFormatting = Formatting.Indented;
#endif


		public static T Read<T>(string filename)
		{
			return Deserialize<T>(File.ReadAllText(filename));
		}

		public static void Write<T>(T model, string filename)
		{
			var jsonString = Serialize(model);
			File.WriteAllText(filename, jsonString);
		}

		public static T Deserialize<T>(string jsonString)
		{
			return JsonConvert.DeserializeObject<T>(jsonString);
		}

		public static string Serialize<T>(T model)
		{
			return JsonConvert.SerializeObject(model, JsonFormatting, new JsonSerializerSettings()
			{
				NullValueHandling = NullValueHandling.Ignore,
				ContractResolver = new JsonPropertiesResolver()
			});
		}
	}
}

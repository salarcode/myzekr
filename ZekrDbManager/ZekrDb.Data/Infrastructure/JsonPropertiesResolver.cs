using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ZekrDb.Data.Infrastructure
{
	class JsonPropertiesResolver : DefaultContractResolver
	{
		protected override List<MemberInfo> GetSerializableMembers(Type objectType)
		{
			//Return properties that do NOT have the JsonIgnoreSerializationAttribute
			return objectType.GetProperties()
				.Where(pi => !Attribute.IsDefined(pi, typeof(JsonIgnoreSerializationAttribute)))
				.ToList<MemberInfo>();
		}

		public static void SetupDefaultSettings()
		{
			JsonConvert.DefaultSettings = () => new JsonSerializerSettings
			{ ContractResolver = new JsonPropertiesResolver() };
		}
	}
}

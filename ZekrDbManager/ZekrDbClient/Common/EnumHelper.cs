using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ZekrDbClient.Common
{
	/// <summary>
	/// Enum helper
	/// </summary>
	public static class EnumHelper
	{
		public static List<KeyValuePair<string, string>> GetEnumValueList<TEnum>()
			where TEnum : struct, Enum
		{
			var enumType = typeof(TEnum);

			var values = Enum.GetValues(enumType);

			var result = new List<KeyValuePair<string, string>>();
			foreach (var ev in values)
			{
				var enumText = ev.ToString();
				if (enumText == null) continue;

				var members = enumType.GetMember(enumText);
				MemberInfo memberInfo = null;
				if (members.Length > 0)
					memberInfo = members[0];

				if (memberInfo != null)
				{
					var displayAttribute = memberInfo.GetCustomAttributes<DisplayAttribute>().FirstOrDefault();
					if (displayAttribute != null)
					{
						enumText = displayAttribute.GetName();
					}
				}

				result.Add(new KeyValuePair<string, string>(((int)ev).ToString(), enumText));
			}
			return result;
		}

		public static List<KeyValuePair<string, string>> GetEnumNameList<TEnum>()
			where TEnum : struct, Enum
		{
			var enumType = typeof(TEnum);

			var values = Enum.GetValues(enumType);

			var result = new List<KeyValuePair<string, string>>();
			foreach (var ev in values)
			{
				var enumText = ev.ToString();
				if (enumText == null) continue;

				var members = enumType.GetMember(enumText);
				MemberInfo memberInfo = null;
				if (members.Length > 0)
					memberInfo = members[0];

				if (memberInfo != null)
				{
					var displayAttribute = memberInfo.GetCustomAttributes<DisplayAttribute>().FirstOrDefault();
					if (displayAttribute != null)
					{
						enumText = displayAttribute.GetName();
					}
				}

				result.Add(new KeyValuePair<string, string>(ev.ToString(), enumText));
			}
			return result;
		}


	}
}

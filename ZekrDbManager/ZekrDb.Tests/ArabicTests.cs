using System;
using Xunit;
using ZekrDbClient.Common;
using ZekrDbClient.UI;

namespace ZekrDb.Tests
{
	public class ArabicTests
	{
		[Theory]
		[InlineData("Hi", false)]
		[InlineData("سلام", false)]
		[InlineData("گچپژ فارسی", false)]
		[InlineData("ست باز سامانه بانکداری الکترونیکی دارید توصیه می شود که مرورگر اینترنتی دیگری باز نکنید", false)]
		[InlineData("عند المسلمين، يُعَظِّمُونه ويؤمنون أنّه كلام", true)]
		[InlineData("كريمة", true)]
		[InlineData("موقع يخدم القران الكريم يقدم سور القران مكتوبة بالرسم العثماني بعدة روايات مع التفسير و ترجمة المعاني و تحميل المصحف", true)]
		[InlineData("عند المسلمين، يُعَظِّمُونه ويؤمنون أنّه كلام Aspire ES1-533-C4", true)]
		public void IsArabicQuranTest(string text, bool expectedResult)
		{
			var result = ZekrParser.IsArabicQuran(text);

			Assert.Equal(expectedResult, result);
		}
	}
}


<div dir="rtl">

## بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

در این پروژه سعی می کنیم تا مرجعی برای دعاها، اذکار و اعمال عبادی رو جمع کنیم.
به امید اینکه بتوانیم منبعی کامل داشته باشیم.
سعی شده تا منابع از کتابهای معتبر باشند. جمع آوری از سایتهای معتبری که از این کتابهای معتبر نقل کرده اند انجام شده.

شما را به همکاری در این پروژه دعوت می کنم.

محتاج دعای شما عزیزان.  
تقدیم به امیرالمؤمنین مولا امام علی علیه السلام.

## محتویات پروژه
چند قسمت در این پروژه وجود دارد که همراه با لینکشان لیست شده:
 - [دیتای سایت](https://github.com/salarcode/myzekr/tree/main/MyZekr/public/zekr-db)
 - [سورس اصلی سایت](https://github.com/salarcode/myzekr/tree/main/MyZekr)
 - [نرم افزار ویرایش دیتای سایت](https://github.com/salarcode/myzekr/tree/main/ZekrDbManager)
 - [نسخه کامپایل شده قابل نصب سایت](https://github.com/salarcode/myzekr/tree/MyZekr.com)

## آدرس سایت
سایت در حالت عادی در آدرس [MyZekr.com](https://myzekr.com/) قابل دسترسی هست.

اگر در صورتی این آدرس از دسترس خارج شد، همین نسخه در آدرس `myzekr.netlify.app` نیز در حال اجرا هست.

اگر این مورد هم با مشکل مواجه بود، خود شما می توانید نسخه کامپایل شده و قابل اجرا را از `https://github.com/salarcode/myzekr/tree/MyZekr.com` دریافت کرده و هاست نمایید.

## نحوه مشارکت
### مشارکت در افزودن دعاها و اذکار
برای این کار نیاز هست تا از نرم افزار ZekrDbClient که همراه کد های پروژه موجود هست استفاده کنید.

توجه داشته باشد که این نرم افزار نیاز دارد تا دسترسی کامل به دیتای سایت به صورت local و در سیستمی که در آن اجرا می شود را داشته باشد. این دیتا در پوشه "\public\zekr-db" قابل یافتن هست. 

 - دانلود نرم افزار ZekrDbClient (بدون لینک دانلود - فعلا باید خودتان عمل کامپایل را انجام دهید)

استفاده از این نرم افزار ممکن است کمی مشکل باید. در فرصت مناسب راهنمایی برای استفاده از آن تهیه می کنم.

## ساختار پروژه
این پروژه در React نوشته شده و کاملا بدون Back-end هست. تمامی دیتای آن در قالب Json بوده و برای ویرایش دیتای Json نرم افزار ZekrDbClient همراه این پروژه تهیه شده است.

</div>

 - Site: [MyZekr.com](https://myzekr.com/)
 - App Engine: React
 - UI: Bootstrap
 - Icons: FontAwesome & FlatIcon ([Attributes](https://github.com/salarcode/myzekr/tree/MyZekr.com/assets/icons))
 - Font: [Vazir](https://rastikerdar.github.io/vazir-font/) & [Samim](https://rastikerdar.github.io/samim-font/)
 - Json Data Editor: C#, .Net 5.0
 - Hosting: [Netlify.com](https://www.netlify.com/)

<div dir="rtl">

## نصب و اجرا در سیستم

برای اجرای سایت در سیستم خودتان نیاز به نصب بودن 'npm' دارید.

پس از اطمینان از نصب آن دستور زیر را پوشه پروژه اجرا کنید:

<code dir="ltr">

	npm install
</code>

سپس برای اجرای سایت دستور زیر را اجرا کنید:

<code dir="ltr">

	npm run start
</code>

پس از آن سایت در آدرسی مانند `http://localhost:3000` اجرا می شود.

</div>
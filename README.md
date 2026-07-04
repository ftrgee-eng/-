# قالب موقع تسويق عقاري - GitHub Pages

قالب عربي RTL جاهز للتعديل والاستضافة على GitHub Pages.

## الملفات المهمة

- `index.html` الصفحة الرئيسية وعرض العقارات.
- `property.html` صفحة تفاصيل العقار.
- `add-property.html` نموذج مبدئي لإضافة عقار.
- `assets/js/data.js` ملف تعديل العقارات.
- `assets/css/style.css` ملف الألوان والتصميم.

## كيف تعدل العقارات؟

افتح الملف:

```text
assets/js/data.js
```

ثم عدّل البيانات داخل `PROPERTIES`:

```js
{
  title: "فيلا عائلية حديثة",
  type: "فيلا",
  purpose: "بيع",
  city: "الرياض",
  district: "النرجس",
  price: 1850000,
  area: 420,
  rooms: 6,
  baths: 5,
  whatsapp: "966500000000"
}
```

## كيف ترفعه على GitHub Pages؟

1. أنشئ Repository جديد في GitHub.
2. ارفع كل الملفات كما هي، وتأكد أن `index.html` موجود في الجذر الرئيسي.
3. ادخل على Settings ثم Pages.
4. اختر Source: Deploy from a branch.
5. اختر Branch: `main` و Folder: `/root` ثم Save.
6. افتح الرابط الذي يعطيك GitHub بعد النشر.

## ملاحظة مهمة

GitHub Pages يدعم المواقع الثابتة فقط. هذا يعني أن HTML/CSS/JavaScript يعمل، لكن لا يوجد Backend أو قاعدة بيانات داخل GitHub Pages. لو تحتاج تسجيل دخول، إضافة عقارات من لوحة تحكم، أو حفظ بيانات العملاء، تحتاج خدمة خارجية أو Backend منفصل.

export type ExcelLocale = "ar" | "en";

export type ExcelProject = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  preview: string;
  previewAlt: string;
  download: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  steps: { title: string; description: string }[];
  findings: string[];
  controls: string[];
  gallery: { src: string; title: string; description: string }[];
  datasetNote: string;
};

const projects: Record<ExcelLocale, ExcelProject[]> = {
  ar: [
    {
      slug: "sales-performance",
      title: "تحليل أداء المبيعات والربحية",
      category: "Excel • ذكاء الأعمال التجاري",
      summary: "دراسة تحليلية لمبيعات وخصومات وهوامش ربح 700 معاملة، مع تحديد الشرائح والمعاملات التي تولّد خسائر رغم نمو الإيرادات.",
      challenge: "قد تبدو المبيعات الإجمالية جيدة بينما تخفي خصومات بعض الشرائح صفقات خاسرة. المطلوب تحويل البيانات إلى رؤية عن الربحية الفعلية، لا الاكتفاء بحجم الإيرادات.",
      solution: "تنظيف معاملات المبيعات وربط صافي المبيعات بالتكلفة والأرباح، ثم إعداد ملخصات حسب الشهر والشريحة والصنف وفئة الخصم، وسجل منفصل للمعاملات الخاسرة وضوابط مطابقة للأرقام.",
      preview: "/images/excel-projects/sales-summary.svg",
      previewAlt: "ملخص بصري لمبيعات المشروع وهوامش الربح والمعاملات الخاسرة",
      download: "/downloads/sales-performance-and-profitability.xlsx",
      metrics: [
        { value: "700", label: "معاملة محللة" },
        { value: "$118.73M", label: "صافي المبيعات" },
        { value: "14.2%", label: "هامش الربح" },
        { value: "58", label: "معاملة خاسرة" }
      ],
      tags: ["Excel", "Pivot Analysis", "Profitability", "Data Audit"],
      steps: [
        { title: "تجهيز البيانات", description: "فحص حقول المعاملات وتوحيد التواريخ والقيم العددية وتصنيف العملاء والمنتجات." },
        { title: "حساب المؤشرات", description: "احتساب صافي البيع بعد الخصومات، والأرباح، وهوامش الربح، والكميات المباعة." },
        { title: "تحديد الاستثناءات", description: "عزل المعاملات ذات الربح السلبي وتحليلها حسب الشريحة والخصومات والصنف." },
        { title: "المطابقة والإبلاغ", description: "مقارنة مجاميع التقرير بملخصات مستقلة وإعداد النتائج والتوصيات القابلة للمراجعة." }
      ],
      findings: [
        "حققت شريحة المؤسسات الكبرى نحو 19.61 مليون دولار مبيعات، لكنها سجلت خسارة تقارب 614.5 ألف دولار.",
        "جميع المعاملات الخاسرة الـ58 تنتمي إلى شريحة المؤسسات الكبرى في عينة المشروع.",
        "بلغ هامش المبيعات ذات الخصم المرتفع 9.1% مقابل 17.9% لفئة الخصم المنخفض.",
        "ساهم القطاع الحكومي بنحو 67.4% من إجمالي الأرباح في البيانات المحللة."
      ],
      controls: [
        "تطابق عدد المعاملات المحللة (700) مع عدد سجلات المصدر.",
        "مطابقة إجمالي المبيعات والخصومات وصافي المبيعات والتكلفة والربح مع مجاميع مستقلة.",
        "التمييز بين معاملات الربح والخسارة دون إخفاء الاستثناءات.",
        "عدم احتساب نمو سنوي كامل بين 2013 و2014؛ فبيانات 2013 تشمل سبتمبر–ديسمبر فقط."
      ],
      gallery: [
        { src: "/images/excel-projects/sales-audit.svg", title: "ضوابط التدقيق والمطابقة", description: "تصور موجز للاختبارات المنفذة على المجاميع وعدد المعاملات." }
      ],
      datasetNote: "مشروع معرض أعمال مبني على بيانات تجريبية للتحليل التجاري، وليس بيانات فعلية لشركة أو عميل. الفترة من سبتمبر 2013 إلى ديسمبر 2014، و2013 سنة غير مكتملة. الصورة الرئيسية ملخص مصمم من النتائج الواردة في المصنف وليست لقطة حرفية منه."
    },
    {
      slug: "effective-date-pricing",
      title: "تدقيق تسعير المعاملات بحسب تاريخ السريان",
      category: "Excel • Power Query • رقابة مالية",
      summary: "مطابقة كل عملية بيع مع السعر الذي كان ساريًا في تاريخها، بدل تطبيق أحدث سعر على العمليات التاريخية وكشف أثر إعادة التسعير الخاطئة.",
      challenge: "قد تتغير أسعار المنتج أكثر من مرة. تطبيق السعر الحالي على الفواتير القديمة يعطي إيرادات غير دقيقة ويشوّه تقارير المبيعات والمطابقة.",
      solution: "ربط المعاملات بسجل تاريخ الأسعار واختيار آخر تاريخ سريان لا يتجاوز تاريخ الطلب، ثم قياس الفارق أمام إعادة التسعير بأسعار اليوم، مع اختبارات سلامة البيانات والربط.",
      preview: "/images/excel-projects/pricing-dashboard.png",
      previewAlt: "لوحة Excel الأصلية لمراجعة الأسعار التاريخية وأثر فروقات التسعير",
      download: "/downloads/effective-date-pricing-audit.xlsx",
      metrics: [
        { value: "7,164", label: "سطر معاملة" },
        { value: "3,530", label: "طلب بيع" },
        { value: "3,142", label: "سطر تأثر بالسعر" },
        { value: "$7,187.40", label: "فرق إعادة التسعير" }
      ],
      tags: ["Excel", "Power Query", "Effective Dates", "Reconciliation"],
      steps: [
        { title: "استخراج الجداول", description: "تنظيم المعاملات والمنتجات وسجل تغيرات أسعار المنتجات في جداول قابلة للربط." },
        { title: "مطابقة السعر بالتاريخ", description: "لكل سطر بيع، اختيار أحدث سعر يبدأ سريانه في تاريخ الطلب أو قبله." },
        { title: "حساب أثر الأسعار", description: "حساب قيمة العمليات بالسعر التاريخي ومقارنتها بقيمتها إذا استُخدم السعر الحالي." },
        { title: "تدقيق النتائج", description: "اختبار المعرفات المكررة والأسعار المفقودة وأخطاء المفاتيح ومطابقة المجاميع." }
      ],
      findings: [
        "بلغت الإيرادات المحسوبة بالأسعار التاريخية 161,144.35 دولار.",
        "لو استُخدمت الأسعار الحالية على جميع المعاملات لظهرت إيرادات قدرها 168,331.75 دولار.",
        "الفارق المحتمل في التقرير هو 7,187.40 دولار، وهو فرق إعادة احتساب وليس خسارة نقدية مؤكدة.",
        "تأثرت 3,142 من أصل 7,164 سطر معاملة، مع تغير سعر سبعة منتجات خلال الفترة."
      ],
      controls: [
        "عدم وجود منتجات مجهولة في المعاملات أو أسعار تاريخية مفقودة.",
        "عدم وجود معرفات معاملات أو مفاتيح منتج–تاريخ مكررة.",
        "التحقق من مطابقة أحدث سعر مسجل مع السعر الحالي لكل منتج.",
        "تطابق إيرادات التسعير التاريخي وأثر الفروقات مع نتائج المطابقة المستقلة."
      ],
      gallery: [
        { src: "/images/excel-projects/pricing-date-matching.png", title: "مطابقة الأسعار حسب تاريخ السريان", description: "تفاصيل المعاملات وتحديد السعر المناسب عند تنفيذ الطلب." },
        { src: "/images/excel-projects/pricing-validation.png", title: "ضوابط التحقق", description: "قائمة اختبارات البيانات والتأكد من سلامة مفاتيح الربط والمجاميع." }
      ],
      datasetNote: "حالة تطبيقية ببيانات معاملات مطعم بيتزا التجريبية للفترة يناير–فبراير 2026، وليست سجلات فعلية لشركة أدوية. أرقام الفروقات تصف أثر إعادة الاحتساب داخل مجموعة البيانات فقط."
    }
  ],
  en: [
    {
      slug: "sales-performance",
      title: "Sales Performance & Profitability Analysis",
      category: "Excel • Commercial Business Intelligence",
      summary: "A 700-transaction analysis of sales, discounts and margins that identifies loss-making deals hidden behind healthy-looking revenue.",
      challenge: "Revenue growth can conceal transactions that lose money. The goal was to explain actual profitability by segment, product and discount rather than relying on sales totals alone.",
      solution: "Prepared sales records, reconciled net revenue against discounts, costs and profit, built monthly and segment summaries, isolated loss-making transactions, and recorded independent audit checks.",
      preview: "/images/excel-projects/sales-summary.svg",
      previewAlt: "Visual summary of project sales, profit margins and loss-making transactions",
      download: "/downloads/sales-performance-and-profitability.xlsx",
      metrics: [
        { value: "700", label: "Transactions" },
        { value: "$118.73M", label: "Net sales" },
        { value: "14.2%", label: "Profit margin" },
        { value: "58", label: "Loss-making deals" }
      ],
      tags: ["Excel", "Pivot Analysis", "Profitability", "Data Audit"],
      steps: [
        { title: "Prepare the data", description: "Validate transaction fields, dates, numeric values, products and customer segments." },
        { title: "Calculate metrics", description: "Derive net sales, discounts, cost of goods sold, profit, margin and units sold." },
        { title: "Investigate exceptions", description: "Isolate negative-profit transactions and segment their drivers by product and discount band." },
        { title: "Reconcile and report", description: "Reconcile report totals against independent checks and document findings for review." }
      ],
      findings: [
        "The Enterprise segment generated $19.61M in sales but lost approximately $614.5K.",
        "All 58 loss-making transactions in the dataset belong to the Enterprise segment.",
        "High-discount sales yielded a 9.1% margin versus 17.9% for low-discount sales.",
        "The Government segment accounted for approximately 67.4% of total profit."
      ],
      controls: [
        "All 700 source transactions are accounted for.",
        "Gross sales, discounts, net sales, costs and profit reconcile to independent totals.",
        "Loss-making records are explicitly listed rather than netted away.",
        "No misleading full-year comparison: the 2013 data covers September–December only."
      ],
      gallery: [
        { src: "/images/excel-projects/sales-audit.svg", title: "Reconciliation controls", description: "A visual summary of the workbook's audit checks and matching totals." }
      ],
      datasetNote: "Portfolio exercise using sample commercial data, not a live client's records. September 2013–December 2014; the 2013 period is partial. The hero image is a visualization of verified workbook values, not a literal Excel screenshot."
    },
    {
      slug: "effective-date-pricing",
      title: "Effective-Date Pricing Audit",
      category: "Excel • Power Query • Financial Controls",
      summary: "Match every transaction to the price valid on its order date and quantify the reporting distortion caused by applying today's prices to historical sales.",
      challenge: "Product prices change over time. Applying current prices to earlier orders can overstate historical revenue and compromise reconciliation.",
      solution: "Joined transactions with price history using the latest effective date on or before each sale, compared historical values with current-price restatements, and checked duplicates, missing matches and totals.",
      preview: "/images/excel-projects/pricing-dashboard.png",
      previewAlt: "Original Excel effective-date pricing dashboard and pricing variance summary",
      download: "/downloads/effective-date-pricing-audit.xlsx",
      metrics: [
        { value: "7,164", label: "Transaction lines" },
        { value: "3,530", label: "Orders" },
        { value: "3,142", label: "Affected lines" },
        { value: "$7,187.40", label: "Restatement gap" }
      ],
      tags: ["Excel", "Power Query", "Effective Dates", "Reconciliation"],
      steps: [
        { title: "Extract source tables", description: "Prepare transaction details, the product list and the historical price schedule." },
        { title: "Match effective dates", description: "Use the latest price whose effective date is on or before each order date." },
        { title: "Quantify price impact", description: "Calculate historical transaction values and compare them with a current-price restatement." },
        { title: "Audit the results", description: "Validate key uniqueness, missing matches, price histories and reconciled totals." }
      ],
      findings: [
        "Correct effective-date revenue totals $161,144.35.",
        "Restating historical sales at current prices produces $168,331.75.",
        "The $7,187.40 gap is a reporting restatement difference, not confirmed cash loss.",
        "3,142 out of 7,164 transaction lines are affected; seven products changed prices."
      ],
      controls: [
        "No unknown products or missing applicable prices were found.",
        "No duplicate transaction identifiers or product/effective-date keys were found.",
        "Latest historical prices agree with the listed current prices.",
        "Revenue and restatement differences reconcile to independently checked totals."
      ],
      gallery: [
        { src: "/images/excel-projects/pricing-date-matching.png", title: "Effective-date transaction matching", description: "Transaction-level price assignment and historical calculations." },
        { src: "/images/excel-projects/pricing-validation.png", title: "Validation controls", description: "Duplicate-key, missing-price and reconciliation checks." }
      ],
      datasetNote: "Portfolio case using a sample pizza-sales dataset from January–February 2026, not a pharmaceutical company's actual transactions. All price differences concern that example dataset only."
    }
  ]
};

export function getExcelProjects(locale: ExcelLocale): ExcelProject[] {
  return projects[locale];
}

export function getExcelProject(locale: ExcelLocale, slug: string): ExcelProject | undefined {
  return projects[locale].find((project) => project.slug === slug);
}

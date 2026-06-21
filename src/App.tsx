import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bot, CheckCircle2, MessageCircle, Zap, BarChart3, 
  ArrowRight, ShieldCheck, TrendingUp, Scissors, Wrench, Store, Briefcase, HeartHandshake, BatteryCharging,
  LogOut, Home, PlayCircle, Building2, 
  CreditCard, Menu, X, CheckCheck, Clock, Check
} from "lucide-react";

type View = 'landing' | 'pricing';
type Lang = "en" | "ru" | "he";

// --- TRANSLATIONS (Aggressive Sales & Conversions) ---
const translations = {
  ru: {
    nav_home: "Главная",
    nav_pricing: "Цены",
    wa_msg: "Здравствуйте, я к вам обращаюсь по поводу WhatsApp агента. Можете рассказать подробнее?",
    
    hero_badge: "🚀 Настройка официального ИИ в WhatsApp",
    hero_title1: "Настроим встроенный AI",
    hero_title2: "в вашем WhatsApp Business",
    hero_subtitle: "Нет времени разбираться в настройке нового ИИ от WhatsApp? Мы соберем вашу базу знаний, пропишем промпты и протестируем бота. Он будет отвечать клиентам 24/7. Без абонентской платы.",
    cta_primary: "Заказать настройку",
    cta_guarantee: "✓ Готово за 1-2 дня  ✓ 0 ₽ абонентской платы",
    social_trusted: "Более 500 предпринимателей уже автоматизировали общение",

    feat_title: "Что входит в услугу настройки",
    f1_t: "Настройка под ключ",
    f1_d: "Мы структурируем ваши цены, услуги и частые вопросы так, чтобы официальный ИИ WhatsApp их идеально понимал.",
    f2_t: "Промпты и Tone of Voice",
    f2_d: "Пропишем системные инструкции, чтобы бот общался в вашем фирменном стиле, не выдумывал факты и профессионально закрывал сделки.",
    f3_t: "Никаких подписок навсегда",
    f3_d: "Поскольку ИИ работает на официальных серверах WhatsApp, вам не нужно платить за сторонние сервисы каждый месяц. Платите только один раз.",

    bene_title: "Почему это нужно вашему бизнесу?",
    b1_t: "Работает 24/7",
    b1_d: "Бот отвечает клиентам даже ночью и в выходные. Вы не упускаете ни одного запроса.",
    b2_t: "Повышение конверсии",
    b2_d: "Моментальные ответы увеличивают вероятность сделки на 40% по сравнению с ожиданием оператора.",
    b3_t: "Снижение нагрузки",
    b3_d: "До 80% однотипных вопросов (цена, график работы) закрывает AI, освобождая ваше время.",
    b4_t: "Официальный инструмент",
    b4_d: "Встроенная функция WhatsApp Business. Ваш аккаунт в безопасности, никаких рисков блокировки.",

    target_title: "Кому идеально подходит?",
    t1: "Салоны и клиники",
    t1_d: "Отправка прайс-листов, информации о мастерах, процедурах и свободных окнах.",
    t2: "Сфера услуг",
    t2_d: "Электрики, сантехники, репетиторы — быстрая консультация по ценам и выезду.",
    t3: "Локальные магазины",
    t3_d: "Мгновенные ответы о наличии товаров, условиях доставки и возврата.",
    t4: "B2B",
    t4_d: "Квалификация лидов перед тем, как перевести горячий диалог на менеджера.",

    price_h: "Один платеж. Без подписок навсегда.",
    price_sub: "Вы платите только за настройку. Официальный ИИ WhatsApp будет работать на вас бесплатно.",
    p_name: "Индивидуальная настройка",
    p_desc: "Стоимость зависит от сложности вашей базы знаний, количества услуг и объема часто задаваемых вопросов.",
    p_price: "1,500 – 2,500",
    p_popular: "Хит Продаж",
    btn_buy: "Заказать настройку",
    
    price_process_h: "Как мы работаем",
    price_process_1: "Анализ и Бриф",
    price_process_1_d: "Изучаем ваши прайсы, услуги и частые вопросы.",
    price_process_2: "Настройка ИИ",
    price_process_2_d: "Загружаем знания в память ИИ и прописываем Tone of Voice.",
    price_process_3: "Тестирование",
    price_process_3_d: "Проверяем бота на сценариях, исключаем галлюцинации.",
    price_process_4: "Запуск",
    price_process_4_d: "Передаем готового бота, который мгновенно начинает работу.",
    
    faq_h: "Частые вопросы",
    faq_1: "Нужно ли платить за сервис каждый месяц?",
    faq_1_d: "Нет. Бот работает на официальной инфраструктуре WhatsApp Business. Вы платите один раз только за нашу настройку.",
    faq_2: "А если бот ответит неправильно?",
    faq_2_d: "Мы жестко задаем рамки для бота и пишем инструкции. Он отвечает строго по вашей базе знаний. Если он чего-то не знает — он переведет диалог на менеджера.",
    faq_3: "Сколько времени занимает настройка?",
    faq_3_d: "Обычно от 1 до 2 рабочих дней, в зависимости от объема ваших данных и услуг.",
    
    status_won: "Сделка закрыта",
    status_booked: "Ждет оплаты",
    status_progress: "В процессе",
    val_pending: "Ожидается",

    chat_today: "Сегодня",
    chat_typing: "работает прямо сейчас",
    chat_msg: "Сообщение...",
    chat_mock_1: "Здравствуйте! Хочу внедрить CRM. Какие цены и сроки?",
    chat_mock_2: "Здравствуйте! 👋 Комплексное внедрение стоит от 50,000 ₽. По срокам — около 3-5 дней.\n\nПрислать вам наши кейсы из вашей ниши?",
    chat_mock_3: "Да, было бы супер.",
    chat_mock_4: "Отличный выбор! Я забронировал за вами скидку 10%. Наш менеджер свяжется с вами через 5 минут для старта. 🚀"
  },
  en: {
    nav_home: "Home",
    nav_pricing: "Pricing",
    wa_msg: "Hello, I am contacting you regarding the WhatsApp AI agent. Could you tell me more about it?",
    
    hero_badge: "🚀 Official WhatsApp AI Assistant Setup",
    hero_title1: "Done-For-You WhatsApp AI",
    hero_title2: "Setup for Small Businesses",
    hero_subtitle: "Don't have time to configure the new native WhatsApp AI? We structure your data, write the prompts, and test the bot. Get a 24/7 AI answering your customers perfectly—with absolutely zero monthly fees.",
    cta_primary: "Get Started",
    cta_guarantee: "✓ Ready in 1-2 days  ✓ 0 Monthly Server Costs",
    social_trusted: "Over 500+ businesses have automated their chats",

    feat_title: "What's Included in the Setup",
    f1_t: "Turnkey AI Configuration",
    f1_d: "We organize your FAQs, prices, and working hours into a structured knowledge base that WhatsApp's native AI understands perfectly.",
    f2_t: "Tone of Voice & Prompting",
    f2_d: "We write the perfect system prompts so the bot talks exactly like you—professional, accurate, and without hallucinations.",
    f3_t: "No Recurring Fees. Ever.",
    f3_d: "Since the AI runs on WhatsApp's official infrastructure, there are no subscriptions or monthly server costs. Just a one-time fee.",

    bene_title: "Why your business needs this?",
    b1_t: "Available 24/7",
    b1_d: "The bot answers customers even at night and on weekends. You never miss a lead.",
    b2_t: "Increased Conversion",
    b2_d: "Instant replies increase the chance of a deal by 40% compared to waiting for a human.",
    b3_t: "Reduced Workload",
    b3_d: "Up to 80% of repetitive questions (price, hours) are handled by AI, freeing up your time.",
    b4_t: "Official Tool",
    b4_d: "This is a native WhatsApp Business feature. Your account is completely safe from bans.",

    target_title: "Who is it perfect for?",
    t1: "Beauty Salons & Clinics",
    t1_d: "Sending pricing lists, staff information, and available services.",
    t2: "Service Providers",
    t2_d: "Electricians, plumbers, tutors — providing rates and availability.",
    t3: "Local Shops",
    t3_d: "Answering questions about stock, delivery, and return policies.",
    t4: "Agencies & B2B",
    t4_d: "Lead qualification before handing the chat over to a human manager.",

    price_h: "One-Time Payment. Zero Subscriptions.",
    price_sub: "Pay once for a professional setup. Your native WhatsApp AI works for you forever without monthly fees.",
    p_name: "Custom Setup",
    p_desc: "The cost depends on the complexity of your knowledge base, number of services, and the volume of FAQs.",
    p_price: "1,500 – 2,500",
    p_popular: "Most Popular",
    btn_buy: "Order Setup",
    
    price_process_h: "How it works",
    price_process_1: "Analysis & Brief",
    price_process_1_d: "We study your pricing, services, and FAQs.",
    price_process_2: "AI Setup",
    price_process_2_d: "We load your knowledge base and set the Tone of Voice.",
    price_process_3: "Testing",
    price_process_3_d: "We test the bot against edge cases and prevent hallucinations.",
    price_process_4: "Launch",
    price_process_4_d: "We hand over the fully functional bot to you.",
    
    faq_h: "Frequently Asked Questions",
    faq_1: "Are there any monthly subscription fees?",
    faq_1_d: "No. The AI uses the official WhatsApp Business infrastructure. You only pay a one-time fee for our setup.",
    faq_2: "What if the bot gives incorrect information?",
    faq_2_d: "We strictly limit the AI using system prompts. It only answers using the provided knowledge base. If it doesn't know something, it hands the chat over to a human manager.",
    faq_3: "How long does the setup take?",
    faq_3_d: "Usually between 1 to 2 business days, depending on the complexity of your data.",
    
    status_won: "Closed Won",
    status_booked: "Meeting Booked",
    status_progress: "In Progress",
    val_pending: "Pending",

    chat_today: "Today",
    chat_typing: "active right now",
    chat_msg: "Message...",
    chat_mock_1: "Hello! I'd like to implement a CRM. What are the prices and timeline?",
    chat_mock_2: "Hi! 👋 A full setup starts at $1,500. Timeline is about 3-5 days.\n\nShould I send you some case studies from your niche?",
    chat_mock_3: "Yes, that would be great.",
    chat_mock_4: "Awesome! I've locked in a 10% discount for you. Our manager will reach out in 5 mins to get started. 🚀"
  },
  he: {
    nav_home: "ראשי",
    nav_pricing: "מסלולים",
    wa_msg: "שלום, אני פונה אליכם בנוגע לסוכן AI בוואטסאפ. אפשר לקבל פרטים נוספים?",
    
    hero_badge: "🚀 הגדרת נציג AI רשמי בוואטסאפ",
    hero_title1: "אנחנו נגדיר עבורך את ה-AI",
    hero_title2: "המובנה של WhatsApp Business",
    hero_subtitle: "אין לך זמן ללמוד איך להגדיר את ה-AI החדש של וואטסאפ? אנחנו נכין את מאגר המידע, נכתוב את מערכת ההנחיות ונוודא שהבוט עונה במקצועיות ללקוחות 24/7. ללא שום תשלום חודשי.",
    cta_primary: "להזמנת שירות ההגדרות",
    cta_guarantee: "✓ מוכן תוך 1-2 ימי עסקים  ✓ ללא עלויות חודשיות",
    social_trusted: "מעל 500 בעלי עסקים כבר עשו אוטומציה לשיחות",

    feat_title: "מה כלול בשירות שלנו?",
    f1_t: "הגדרה מקצה לקצה",
    f1_d: "אנחנו מארגנים את השאלות הנפוצות, המחירונים ושעות הפעילות שלך למאגר מידע מסודר שה-AI של וואטסאפ יודע לקרוא ולהבין.",
    f2_t: "כתיבת הנחיות מדויקות (Prompts)",
    f2_d: "אנחנו מגדירים את אופי השיחה (Tone of Voice) של הבוט כדי שהוא יענה בדיוק כמוך – ולמונע המצאת נתונים.",
    f3_t: "ללא תשלום חודשי - לתמיד",
    f3_d: "ברגע שהבוט רץ על התשתית הרשמית של וואטסאפ, לא תשלמו דמי מנוי או עלויות שרת לעולם. מדובר על תשלום חד-פעמי בלבד.",

    bene_title: "למה העסק שלך חייב את זה?",
    b1_t: "עובד 24/7",
    b1_d: "הבוט עונה ללקוחות גם בלילה ובסופי שבוע. לא מפספסים אף פנייה.",
    b2_t: "הגדלת אחוזי המרה",
    b2_d: "מענה מיידי מגדיל את הסיכוי לסגירת עסקה ב-40% לעומת המתנה לנציג אנושי.",
    b3_t: "הורדת עומס",
    b3_d: "עד 80% מהשאלות החוזרות (מחיר, שעות פעילות) נענות על ידי ה-AI ומפנות לכם זמן.",
    b4_t: "כלי רשמי ובטוח",
    b4_d: "תכונה מובנית של WhatsApp Business. החשבון שלכם בטוח לחלוטין וללא סכנת חסימה.",

    target_title: "למי זה מתאים במיוחד?",
    t1: "מכוני יופי וקליניקות",
    t1_d: "שליחת מחירונים, מידע על אנשי צוות ופירוט שירותים.",
    t2: "נותני שירותים",
    t2_d: "חשמלאים, טכנאים, מדריכים - מענה על מיקומים, זמינות ותמחור.",
    t3: "חנויות מקומיות",
    t3_d: "מענה על מלאי, שעות פעילות, וזמני משלוח.",
    t4: "B2B וסוכנויות",
    t4_d: "סינון ומיון לידים לפני תחילת שיחה עם נציג אנושי.",

    price_h: "תשלום חד-פעמי. ללא דמי מנוי.",
    price_sub: "משלמים רק על ההקמה. ה-AI המובנה של וואטסאפ יעבוד עבורך לתמיד ללא שום עלות חודשית קבועה.",
    p_name: "הקמה מותאמת אישית",
    p_desc: "המחיר תלוי במורכבות מאגר המידע, כמות השירותים, והיקף השאלות הנפוצות של העסק שלך.",
    p_price: "1,500 – 2,500",
    p_popular: "הכי פופולרי",
    btn_buy: "להזמנת השירות",
    
    price_process_h: "איך זה עובד?",
    price_process_1: "אפיון וניתוח",
    price_process_1_d: "אנו לומדים את המחירונים, השירותים והשאלות הנפוצות שלך.",
    price_process_2: "הגדרת ה-AI",
    price_process_2_d: "טוענים הכל למאגר המידע התקני של וואטסאפ ומגדירים את שפת הבוט.",
    price_process_3: "בדיקות איכות",
    price_process_3_d: "אנו בוחנים את הבוט מול תרחישים אמיתיים בעסק למנוע טעויות.",
    price_process_4: "עלייה לאוויר",
    price_process_4_d: "אתם מקבלים נציג וירטואלי מוכן שמתחיל לסגור עסקאות בוואטסאפ.",
    
    faq_h: "שאלות ותשובות",
    faq_1: "האם יש תשלום חודשי קבוע?",
    faq_1_d: "ממש לא! הבוט פועל ישירות על השרתים הרשמיים של וואטסאפ ללא דמי מנוי למערכות צד שלישי (מערכות חיצוניות). התשלום הוא חד-פעמי ונועד אך ורק על ביצוע עבודת ההגדרה שלנו.",
    faq_2: "ומה קורה אם הבוט ממציא לשואל עובדות שגויות?",
    faq_2_d: "אנחנו מגבילים את הבוט בעזרת הנחיות מערכת קפדניות. כך הוא לא יחרוג ממאגר המידע שהזנו לו. על כל שאלה שהוא לא יידע לענות עליה, הוא פשוט יודיע כי יעביר את השיחה לנציג אנושי.",
    faq_3: "כמה זמן לוקח תהליך ההגדרות וההקמה?",
    faq_3_d: "בדרך כלל בין יום ל-2 ימי עסקים, תלוי במורכבות וגודל השירותים שאתם מציעים.",
    
    status_won: "עסקה נסגרה",
    status_booked: "ממתין לתשלום",
    status_progress: "בתהליך (AI)",
    val_pending: "ממתין",

    chat_today: "היום",
    chat_typing: "מקליד...",
    chat_msg: "הודעה...",
    chat_mock_1: "שלום איזה שירותים אתם מציעים לעסקים? אשמח לראות מחירון ומידע",
    chat_mock_2: "שלום רב! 👋 לחברה שלנו מגוון שירותים שניתן להתאים אישית. עלות הטמעה בסיסית מתחילה ב-1,500₪, וזמן הביצוע הוא לרוב כ-1-2 ימי עסקים.\n\nרוצה שאשלח לך עכשיו כמה דוגמאות מלקוחות שעשינו להם מענה דומה?",
    chat_mock_3: "כן, נשמע מעולה.",
    chat_mock_4: "נהדר! שלחתי פנייה עם המספר שלך למנהל הפרויקטים שלנו והוא ייצור איתך קשר באופן אישי ממש בעוד כמה דקות להתאמה אישית. 🚀"
  }
};

// --- WHATSAPP MOCKUP WIDGET ---
const WAMockup = ({ t, isRtl }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 mx-auto max-w-[340px] w-full rounded-[2.5rem] bg-slate-900 p-3 shadow-2xl ring-1 ring-slate-900/5 rotate-2 hover:rotate-0 transition-transform duration-500 ease-out"
    >
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-[1rem] z-20"></div>
      
      <div className="relative rounded-[2rem] overflow-hidden bg-[#efeae2] h-[600px] flex flex-col shadow-inner">
        {/* WA Pattern Background */}
        <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'cover' }}></div>
        
        {/* Header */}
        <div className="bg-[#00a884] text-white px-4 py-3 pb-4 pt-10 flex items-center gap-3 relative z-20 shadow-sm">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center p-1">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#00a884]" />
            </div>
          </div>
          <div className="flex-1 text-sm">
            <div className="font-bold">Business Support</div>
            <div className="text-white/80 text-[11px] font-medium block">{t.chat_typing}</div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 flex flex-col text-start">
          <div className="bg-[#e1f3fb] text-[#54656f] text-[11px] px-3 py-1 rounded-lg mx-auto font-medium shadow-sm">
            {t.chat_today}
          </div>

          <motion.div initial={{ opacity: 0, x: isRtl ? 10 : -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="self-start max-w-[85%]">
            <div className={`bg-white text-slate-800 p-2.5 px-3.5 rounded-2xl ${isRtl ? 'rounded-tr-sm' : 'rounded-tl-sm'} text-[13px] shadow-sm relative`}>
              {t.chat_mock_1}
              <div className="text-[10px] text-slate-400 text-right mt-1">10:41</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: isRtl ? -10 : 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }} className="self-end max-w-[85%]">
            <div className={`bg-[#d9fdd3] text-slate-800 p-2.5 px-3.5 rounded-2xl ${isRtl ? 'rounded-tl-sm' : 'rounded-tr-sm'} text-[13px] shadow-sm relative whitespace-pre-wrap`}>
              {t.chat_mock_2}
              <div className="text-[10px] text-[#00a884] flex items-center justify-end gap-1 mt-1">
                10:41 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: isRtl ? 10 : -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.5 }} className="self-start max-w-[85%]">
            <div className={`bg-white text-slate-800 p-2.5 px-3.5 rounded-2xl ${isRtl ? 'rounded-tr-sm' : 'rounded-tl-sm'} text-[13px] shadow-sm relative`}>
              {t.chat_mock_3}
              <div className="text-[10px] text-slate-400 text-right mt-1">10:43</div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.5 }} className="self-end max-w-[85%]">
             <div className={`bg-[#d9fdd3] text-slate-800 p-2.5 px-3.5 rounded-2xl ${isRtl ? 'rounded-tl-sm' : 'rounded-tr-sm'} text-[13px] shadow-sm relative`}>
              {t.chat_mock_4}
              <div className="text-[10px] text-[#00a884] flex items-center justify-end gap-1 mt-1">
                10:43 <Clock className="w-3.5 h-3.5 text-emerald-600/50" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fake Input */}
        <div className="h-14 bg-[#f0f2f5] p-2 flex items-center gap-2 relative z-10 shrink-0">
          <div className="flex-1 bg-white h-full rounded-full flex items-center px-4 text-slate-400 text-[13px] shadow-sm justify-start">
            {t.chat_msg}
          </div>
          <div className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center text-white shadow-sm shrink-0">
            <svg viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${isRtl ? 'mr-1 rotate-180' : 'ml-1'}`}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- COMPONENTS ---

const LandingView = ({ setView, t, lang, isRtl }: any) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6 overflow-hidden">
    {/* HERO SECTION */}
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      <div className="flex-1 text-center lg:text-start z-10">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 font-semibold text-xs mb-6">
          {t.hero_badge}
        </motion.div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-5 drop-shadow-sm">
          {t.hero_title1} <br className="hidden lg:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">
            {t.hero_title2}
          </span>
        </h1>
        <p className="text-base text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
          {t.hero_subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
          <button onClick={() => window.open(`https://wa.me/972504834744?text=${encodeURIComponent(t.wa_msg)}`, '_blank')} className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-base shadow-[0_8px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_10px_40px_rgba(16,185,129,0.4)] transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2">
            {t.cta_primary} <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
          <button onClick={() => setView('pricing')} className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-full font-bold text-base shadow-sm border border-slate-200 transition-all hover:-translate-y-0.5 active:scale-95">
            {t.nav_pricing}
          </button>
        </div>
        <div className="text-xs font-medium text-slate-500 flex items-center justify-center lg:justify-start gap-2">
          {t.cta_guarantee}
        </div>
      </div>
      <div className="flex-1 w-full relative flex justify-center lg:justify-end">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-300/30 to-green-500/20 blur-[120px] rounded-full"></div>
        <WAMockup t={t} isRtl={isRtl} />
      </div>
    </div>

    {/* SOCIAL PROOF */}
    <div className="max-w-7xl mx-auto mt-20 text-center border-t border-slate-200/60 pt-10 relative z-10">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">{t.social_trusted}</p>
      <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-60 grayscale filter">
        <div className="flex items-center gap-2 text-lg font-black font-serif italic"><Building2 className="w-5 h-5" /> NexusCorp</div>
        <div className="flex items-center gap-2 text-lg font-bold tracking-tighter"><Zap className="w-5 h-5" /> BoltTech</div>
        <div className="flex items-center gap-2 text-lg font-extrabold"><MessageCircle className="w-5 h-5" /> ChatGen</div>
        <div className="flex items-center gap-2 text-lg font-bold"><ShieldCheck className="w-5 h-5" /> SecureGroup</div>
      </div>
    </div>

    {/* FEATURES */}
    <div className="max-w-7xl mx-auto mt-24 relative z-10">
      <h2 className="text-2xl lg:text-3xl font-extrabold text-center text-slate-900 mb-12">{t.feat_title}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Zap, title: t.f1_t, desc: t.f1_d, color: "text-emerald-500", bg: "bg-emerald-50" },
          { icon: MessageCircle, title: t.f2_t, desc: t.f2_d, color: "text-blue-500", bg: "bg-blue-50" },
          { icon: TrendingUp, title: t.f3_t, desc: t.f3_d, color: "text-amber-500", bg: "bg-amber-50" },
        ].map((feat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className={`w-12 h-12 ${feat.bg} ${feat.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
              <feat.icon className="w-6 h-6 flex-shrink-0" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* BENEFITS */}
    <div className="max-w-7xl mx-auto mt-24 relative z-10 py-12 bg-slate-50/50 rounded-[3rem] px-4 lg:px-8 border border-slate-100/50 text-start">
      <h2 className="text-2xl lg:text-3xl font-extrabold text-center text-slate-900 mb-12">{t.bene_title}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { icon: Clock, title: t.b1_t, desc: t.b1_d },
          { icon: TrendingUp, title: t.b2_t, desc: t.b2_d },
          { icon: BatteryCharging, title: t.b3_t, desc: t.b3_d },
          { icon: ShieldCheck, title: t.b4_t, desc: t.b4_d },
        ].map((bene, i) => (
          <div key={i} className="flex flex-col">
            <div className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-800 mb-4 border border-slate-100`}>
              <bene.icon className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">{bene.title}</h4>
            <p className="text-xs font-medium text-slate-600 leading-relaxed">{bene.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* TARGET AUDIENCE */}
    <div className="max-w-7xl mx-auto mt-24 mb-16 relative z-10 text-start px-4">
      <h2 className="text-2xl lg:text-3xl font-extrabold text-center text-slate-900 mb-12">{t.target_title}</h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {[
          { icon: Scissors, title: t.t1, desc: t.t1_d },
          { icon: Wrench, title: t.t2, desc: t.t2_d },
          { icon: Store, title: t.t3, desc: t.t3_d },
          { icon: Briefcase, title: t.t4, desc: t.t4_d },
        ].map((target, i) => (
          <div key={i} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start gap-3 hover:shadow-md transition-shadow">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0`}>
              <target.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-1">{target.title}</h4>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">{target.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const PricingView = ({ setView, t, lang, isRtl }: any) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3 drop-shadow-sm">{t.price_h}</h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto font-medium">{t.price_sub}</p>
      </div>

      <div className="max-w-2xl mx-auto flex justify-center text-start">
        <div className="flex flex-col bg-white rounded-[2rem] p-6 sm:p-8 relative transition-all border-2 border-emerald-500 shadow-2xl scale-105 z-10 w-full">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
            {t.p_popular}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{t.p_name}</h3>
          <p className="text-xs font-medium text-slate-500 mb-6 flex-1 leading-relaxed">{t.p_desc}</p>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-xl font-extrabold text-slate-500">₪</span>
            <span className="font-extrabold text-slate-900 text-3xl">{t.p_price}</span>
          </div>
          <button onClick={() => window.open(`https://wa.me/972504834744?text=${encodeURIComponent(t.wa_msg)}`, '_blank')} className="w-full py-3 rounded-xl font-bold text-sm transition-all flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25">
            {t.btn_buy}
          </button>
          
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] sm:text-xs font-medium text-slate-700">
            {lang === 'ru' && [
              "Сбор базы знаний",
              "Написание системных промптов",
              "Настройка Tone of Voice",
              "Тестирование ИИ агента"
            ].map((feat, j) => (
              <div key={j} className="flex items-center gap-3 py-1.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-emerald-100 text-emerald-600 text-[9px] font-bold">✓</div>
                {feat}
              </div>
            ))}
            {lang === 'en' && [
              "Knowledge base structuring",
              "System prompts writing",
              "Tone of Voice configuration",
              "AI agent testing & launch"
            ].map((feat, j) => (
              <div key={j} className="flex items-center gap-3 py-1.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-emerald-100 text-emerald-600 text-[9px] font-bold">✓</div>
                {feat}
              </div>
            ))}
            {lang === 'he' && [
              "ארגון והקמת מאגר המידע",
              "כתיבת הנחיות מערכת (Prompts)",
              "התאמה לשפת המותג (Tone of Voice)",
              "בדיקות איכות והפעלה"
            ].map((feat, j) => (
              <div key={j} className="flex items-center gap-3 py-1.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-emerald-100 text-emerald-600 text-[9px] font-bold">✓</div>
                {feat}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="max-w-4xl mx-auto mt-24 text-center">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-10">{t.price_process_h}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-start">
          {[
            { step: "1", title: t.price_process_1, desc: t.price_process_1_d },
            { step: "2", title: t.price_process_2, desc: t.price_process_2_d },
            { step: "3", title: t.price_process_3, desc: t.price_process_3_d },
            { step: "4", title: t.price_process_4, desc: t.price_process_4_d },
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative pt-8">
              <div className={`absolute -top-3 w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 font-extrabold flex items-center justify-center text-sm border-4 border-slate-50 ${isRtl ? 'right-5' : 'left-5'} shadow-sm`}>
                {item.step}
              </div>
              <h3 className="font-bold text-slate-900 mb-1 text-sm truncate">{item.title}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto mt-24 text-start">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-center text-slate-900 mb-10">{t.faq_h}</h2>
        <div className="space-y-4">
          {[
            { q: t.faq_1, a: t.faq_1_d },
            { q: t.faq_2, a: t.faq_2_d },
            { q: t.faq_3, a: t.faq_3_d },
          ].map((faq, i) => (
            <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-base font-bold text-slate-900 mb-2">{faq.q}</h4>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- APP COMPONENT ---
const Footer = ({ setView, t, isRtl }: any) => (
  <footer className="w-full bg-white border-t border-slate-200 mt-auto py-8 sm:py-12 px-4 sm:px-6 z-20 relative">
    <div className={`max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 ${isRtl ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
      <div className={`flex flex-col items-center md:items-start gap-2 ${isRtl ? 'md:items-end' : ''}`}>
        <div className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-1">
           <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-white font-bold tracking-tighter text-[10px]">WS</div>
           WhatsApp Setup
        </div>
        <p className="text-xs text-slate-500">
          Promoted by BUNKER-255 (<a href="https://bunker-255.com" target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">bunker-255.com</a>)
        </p>
      </div>

      <div className={`flex gap-6 text-sm font-medium text-slate-600 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <button onClick={() => setView('landing')} className="hover:text-emerald-600 transition-colors">{t.nav_home}</button>
        <button onClick={() => setView('pricing')} className="hover:text-emerald-600 transition-colors">{t.nav_pricing}</button>
        <a href={`https://wa.me/972504834744?text=${encodeURIComponent(t.wa_msg)}`} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors text-slate-500">WhatsApp</a>
      </div>

      <div className="text-xs text-slate-400 font-medium">
        Developed by illya lazarev
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeView, setActiveView] = useState<View>('landing');
  const [lang, setLang] = useState<Lang>('ru');
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("appLang") as Lang;
    if (saved && ["en", "ru", "he"].includes(saved)) {
      setLang(saved);
    }
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("appLang", l);
  };

  if (!mounted) return null;

  const t = translations[lang];
  const isRtl = lang === "he";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#fafafa] font-sans selection:bg-emerald-500 selection:text-white flex flex-col relative text-start">
      
      {/* NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-sm rounded-2xl px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveView('landing')}>
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-sm shadow-emerald-500/30 tracking-tighter">WS</div>
            <span className="font-extrabold text-slate-900 tracking-tight text-xl hidden sm:block">WASetup</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setActiveView('landing')} className={`text-sm font-bold transition-colors ${activeView === 'landing' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'}`}>{t.nav_home}</button>
            <button onClick={() => setActiveView('pricing')} className={`text-sm font-bold transition-colors ${activeView === 'pricing' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'}`}>{t.nav_pricing}</button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex bg-slate-100 rounded-lg p-1 gap-1">
              <button onClick={() => changeLang("ru")} className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${lang === 'ru' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>RU</button>
              <button onClick={() => changeLang("en")} className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${lang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>EN</button>
              <button onClick={() => changeLang("he")} className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${lang === 'he' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>HE</button>
            </div>
            
            <button className="md:hidden text-slate-700 p-1" onClick={() => setMenuOpen(!menuOpen)}>
               {menuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[84px] p-4 z-40 md:hidden"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 flex flex-col gap-1">
              <button onClick={() => { setActiveView('landing'); setMenuOpen(false); }} className="p-4 font-bold text-start text-slate-700 hover:bg-slate-50 rounded-xl">{t.nav_home}</button>
              <button onClick={() => { setActiveView('pricing'); setMenuOpen(false); }} className="p-4 font-bold text-start text-slate-700 hover:bg-slate-50 rounded-xl">{t.nav_pricing}</button>
              
              <div className="border-t border-slate-100 mt-2 mb-2"></div>
              <div className="flex gap-2 p-2">
                <button onClick={() => changeLang("ru")} className={`flex-1 py-3 rounded-lg font-bold text-sm ${lang === 'ru' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>RU</button>
                <button onClick={() => changeLang("en")} className={`flex-1 py-3 rounded-lg font-bold text-sm ${lang === 'en' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>EN</button>
                <button onClick={() => changeLang("he")} className={`flex-1 py-3 rounded-lg font-bold text-sm ${lang === 'he' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>HE</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full bg-[#fafafa]">
        <AnimatePresence mode="wait">
          {activeView === 'landing' && <LandingView key="landing" setView={setActiveView} t={t} lang={lang} isRtl={isRtl} />}
          {activeView === 'pricing' && <PricingView key="pricing" setView={setActiveView} t={t} lang={lang} />}
        </AnimatePresence>
      </main>

      <Footer setView={setActiveView} t={t} isRtl={isRtl} />
    </div>
  );
}

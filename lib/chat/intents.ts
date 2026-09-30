// Sohbet asistanının "beyni".
// Anahtar kelimeyle konu buluyor — sayıyı artırmak yerine DAR KAPSAMLI, birbiriyle çakışmayan
// konular (intent) ekleyerek genişletiyoruz. Her cevap Begüm'ün kendi yazdığı sabit bir metin;
// model yalnızca en uygun konuyu seçiyor, hiçbir şey üretmiyor/uydurmuyor.
// Sıra önemli: `classify` ilk eşleşen konuyu döner, bu yüzden özel konular (ör. "ownway") genel
// konulardan (ör. "projects") ÖNCE gelmeli, yoksa genel konu onları gölgeler.
// İki dil: TR ve EN konu listeleri ayrı — sadece cevap metni değil, anahtar kelimeler de o dile
// göre yazılı (bir İngilizce ziyaretçi "projects" yazar, "proje" değil).
// Plan: bu dosyadaki `examples` listeleri veri seti olacak; küçük bir cümle-anlam (embedding)
// modeli tarayıcıda çalışıp `classify` fonksiyonunun yerini alacak — cevap havuzu yine bu dosya olacak.

import { dict, type Locale } from "@/content/i18n";

export type Card = "projects" | "skills" | "experience" | "contact";
export type Intent = { id: string; answer: string; card?: Card; keywords: RegExp; examples: string[] };

function buildTr(): Intent[] {
  const { site } = dict.tr;
  return [
    // ---- Somut, dar kapsamlı konular (genel konulardan önce) ----
    { id: "cv", keywords: /\bcv\b|özgeçmiş|resume/,
      answer: "CV'mi üst menüdeki \"CV indir\" düğmesinden Türkçe veya İngilizce olarak indirebilirsin.",
      examples: ["CV'n var mı?", "Özgeçmişini gönderir misin?", "Resume indirebilir miyim?"] },
    { id: "github", keywords: /github/,
      answer: `Tabii: ${site.links.github}. Projelerimin çoğunun kodu orada.`, card: "contact",
      examples: ["GitHub'ın var mı?", "Kodlarını nereden görebilirim?"] },
    { id: "linkedin", keywords: /linked[iı]n/, // Türkçe küçük harfte "LinkedIn" -> "linkedın" olur, ikisini de yakala
      answer: `Buyur: ${site.links.linkedin}`, card: "contact",
      examples: ["LinkedIn'in nedir?", "LinkedIn profilin var mı?"] },
    { id: "ownway", keywords: /ownway/,
      answer: "OwnWay, öğrenci verisini analiz edip kariyer önerisi sunan bir yapay zekâ sistemi. 4 kişilik takımda backend geliştirici ve sistem mimarı olarak çalıştım; Node.js REST API'lerini ve PostgreSQL mimarisini ben kurdum. TÜBİTAK 2209-A kapsamında araştırmacı olarak kabul aldım.",
      card: "projects", examples: ["OwnWay nedir?", "OwnWay'de ne yaptın?"] },
    { id: "pixel", keywords: /pixel art|piksel|\bpixel\b/,
      answer: "Pixel Art Challenge, Eterna Teknoloji'deki stajımda sıfırdan geliştirdiğim bir mobil uygulama: her gün yeni bir tema, bir piksel tuvali ve topluluk oylaması. React Native, Firebase ve Cloud Functions ile uçtan uca ben kurdum.",
      card: "projects", examples: ["Pixel Art Challenge nedir?", "Piksel uygulaman ne iş yapıyor?"] },
    { id: "cini", keywords: /çini|\bcini\b|tile art|motif tespit/,
      answer: "Çini Motif Tespiti, Türk çini sanatındaki lale, karanfil, çintemani ve sümbül motiflerini tanıyan bir YOLOv8 modeli. Streamlit ile bir arayüz de geliştirdim; yüklenen görseldeki motifi bulup sembolizmini anlatıyor.",
      card: "projects", examples: ["Çini projeni anlatır mısın?", "Motif tespiti nasıl çalışıyor?"] },
    { id: "colorvision", keywords: /renk körlüğü|colorvision|renk körü|döteranopi/,
      answer: "ColorVision Enhancer, kırmızı-yeşil renk körlüğü (döteranopi) olan kullanıcılar için birbirine karışan renkleri ayrıştıran bir görüntü işleme sistemi. LMS renk uzayı, K-Means kümeleme ve HSV kontrast düzeltmesiyle çalışıyor.",
      card: "projects", examples: ["ColorVision Enhancer nedir?", "Renk körlüğü projen ne iş yapıyor?"] },
    { id: "education", keywords: /üniversite|mezun|bölüm|lisans|okul/,
      answer: `${site.graduation}'de Zonguldak Bülent Ecevit Üniversitesi Bilgisayar Mühendisliği'nden mezun oldum. TÜBİTAK 2209-A kapsamında araştırmacı olarak da kabul aldım.`,
      card: "experience", examples: ["Hangi üniversitedensin?", "Ne zaman mezun oldun?", "Bölümün ne?"] },
    { id: "languages", keywords: /ingilizce|yabancı dil|dil seviyen/,
      answer: "İngilizcem B1 seviyesinde. Teknik dokümantasyon okuyup yazabiliyorum, geliştirmeye de devam ediyorum.",
      examples: ["İngilizce seviyen nedir?", "Yabancı dil biliyor musun?"] },
    { id: "certificates", keywords: /sertifika|huawei/,
      answer: "Huawei Ar-Ge Buluşması sertifikam var. Ayrıca TÜBİTAK 2209-A kapsamında araştırmacı olarak kabul aldım.",
      examples: ["Sertifikan var mı?", "Huawei sertifikası nedir?"] },
    { id: "community", keywords: /topluluk|gdg|google developer|devfest/,
      answer: "GDG Zonguldak'ta Sponsorluk Takım Lideri'yim; DevFest konferansının sponsorluk süreçlerini yönetiyorum. Öncesinde GDG on Campus BEUN'da da aynı rolü üstlenmiş, Git ve GitHub atölyeleri vermiştim.",
      card: "experience", examples: ["Hangi topluluklardasın?", "GDG'de ne yapıyorsun?", "DevFest'te rolün neydi?"] },
    { id: "volunteering", keywords: /gönüllü|bpw|genç tema|beu cyber/,
      answer: "BPW İstanbul'un mentorluk programında mentee'yim, BEÜN Genç TEMA'da sosyal medya tasarımı yaptım ve BEU CYBER'ın çekirdek ekibinde yer aldım. Detaylar Deneyim bölümünde.",
      card: "experience", examples: ["Gönüllülük deneyimin var mı?", "BPW nedir?"] },
    { id: "availability", keywords: /ne zaman başla|müsait|uygun musun|işe alım süreci/,
      answer: "Şu an Eterna Teknoloji'de stajım sürüyor ve yeni fırsatlara açığım. Zamanlama ve detayları e-postadan konuşalım.",
      card: "contact", examples: ["Ne zaman başlayabilirsin?", "Şu an müsait misin?"] },
    { id: "salary", keywords: /maaş|ücret|ne kadar kazan|fiyat/,
      answer: "Maaş ve ücretlendirme gibi konuları yazıyla değil, doğrudan konuşarak netleştirmek istiyorum. Bana e-postadan yazabilirsin.",
      card: "contact", examples: ["Maaş beklentin nedir?", "Ücretin ne kadar?"] },
    { id: "remote", keywords: /uzaktan|remote|taşınma|relocation/,
      answer: "Çalışma şekli role göre değişebilir; bunu da en iyi e-postadan konuşuruz.",
      card: "contact", examples: ["Uzaktan çalışır mısın?", "Başka şehre taşınır mısın?"] },
    { id: "hobbies", keywords: /boş zaman|hobi|kod dışında|kodlamadığın zaman/,
      answer: `Kod dışında ${site.hobbies.join(", ")} ile vakit geçiriyorum.`,
      examples: ["Boş zamanında ne yaparsın?", "Hobilerin neler?"] },
    { id: "greeting", keywords: /teşekkür|sağol|görüşürüz|hoşça kal|iyi günler/,
      answer: "Rica ederim, sorman yeterli! Bir şey daha merak edersen buradayım.",
      examples: ["Teşekkürler", "Görüşürüz", "Sağol"] },

    // ---- Genel konular ----
    { id: "web", keywords: /web|site|sayfa|next\.?js/,
      answer: "Evet. Kişisel, portfolyo ve küçük işletme siteleri yapıyorum; şablon kullanmadan, mobil uyumlu ve özenli. Şu an gezdiğin siteyi de Next.js ile ben tasarlayıp kodladım, bu sohbet asistanı dahil. Detaylar için bana yazabilirsin.",
      card: "contact", examples: ["Web sitesi de yapıyor musun?", "Bana site yapar mısın?", "Bu siteyi nasıl yaptın?"] },
    { id: "projects", keywords: /proje|uygulama|portfolyo/,
      answer: "Mobil, yapay zekâ destekli karar sistemleri ve bilgisayarlı görü tarafında birkaç projemi öne çıkardım. Birine dokunursan detaylarını açarım.",
      card: "projects", examples: ["Hangi projeleri geliştirdin?", "Neler yaptın?", "Projelerini göster"] },
    { id: "skills", keywords: /teknoloji|yetenek|stack|react|python|beceri|framework|node/,
      answer: "Mobilde React Native ve TypeScript, arka uçta Node.js ve Firebase, yapay zekâ tarafında Python, YOLOv8 ve OpenCV ile çalışıyorum.",
      card: "skills", examples: ["Hangi teknolojilerle çalışıyorsun?", "Tech stack'in ne?"] },
    { id: "experience", keywords: /deneyim|staj|tecrübe|eterna|speedsoft|nerede çalış/,
      answer: "İki stajım ve topluluklarda liderlik deneyimim var. En güncel olanı Eterna Teknoloji'de; Pixel Art Challenge uygulamasını orada sıfırdan geliştirdim.",
      card: "experience", examples: ["İş deneyimlerini anlatır mısın?", "Nerede staj yaptın?", "Şu an nerede çalışıyorsun?"] },
    { id: "contact", keywords: /iletişim|ulaş|mail|e-posta|numara/,
      answer: "En hızlı yol e-posta. LinkedIn ve GitHub'dan da bana ulaşabilirsin.",
      card: "contact", examples: ["Sana nasıl ulaşabilirim?", "Mail adresin ne?"] },
    { id: "about", keywords: /kim|kendin|bahset|tanı|merhaba|selam/,
      answer: "Ben Begüm, Haziran 2026'da Bilgisayar Mühendisliği'nden mezun oldum. React Native ile mobil uygulamaları uçtan uca geliştiriyor, bu ürünlere yapay zekâ yerleştiriyorum. Şu an Eterna Teknoloji'de mobil uygulama geliştirme stajı yapıyorum.",
      examples: ["Kendinden kısaca bahseder misin?", "Kimsin?", "Merhaba"] },
  ];
}

function buildEn(): Intent[] {
  const { site } = dict.en;
  return [
    // ---- Narrow, specific topics (before the general catch-alls) ----
    { id: "cv", keywords: /\bcv\b|resume/,
      answer: "You can download my CV in Turkish or English from the \"Download CV\" button in the top menu.",
      examples: ["Do you have a CV?", "Can you send me your resume?", "Can I get your resume?"] },
    { id: "github", keywords: /github/,
      answer: `Sure: ${site.links.github}. Most of my projects' code lives there.`, card: "contact",
      examples: ["Do you have a GitHub?", "Where can I see your code?"] },
    { id: "linkedin", keywords: /linkedin/,
      answer: `Here you go: ${site.links.linkedin}`, card: "contact",
      examples: ["What's your LinkedIn?", "Do you have a LinkedIn profile?"] },
    { id: "ownway", keywords: /ownway/,
      answer: "OwnWay is an AI system that analyzes student data and gives career guidance. I worked as backend developer and system architect in a 4-person team; I built the Node.js REST APIs and the PostgreSQL architecture myself. I was accepted as a researcher under TÜBİTAK 2209-A.",
      card: "projects", examples: ["What is OwnWay?", "What did you do on OwnWay?"] },
    { id: "pixel", keywords: /pixel art|\bpixel\b/,
      answer: "Pixel Art Challenge is a mobile app I built from scratch during my internship at Eterna Teknoloji: a new theme every day, a pixel canvas, and community voting. I set it up end to end with React Native, Firebase, and Cloud Functions.",
      card: "projects", examples: ["What is Pixel Art Challenge?", "What does your pixel app do?"] },
    { id: "cini", keywords: /tile (motif|art)|çini|motif detection/,
      answer: "Tile Motif Detection is a YOLOv8 model that recognizes tulip, carnation, çintemani, and hyacinth motifs in Turkish tile art. I also built an interface with Streamlit that finds the motif in an uploaded image and explains its symbolism.",
      card: "projects", examples: ["Can you tell me about your tile project?", "How does the motif detection work?"] },
    { id: "colorvision", keywords: /colorvision|color ?blind|deuteranopia/,
      answer: "ColorVision Enhancer is an image-processing system that separates colors that blend together for users with deuteranopia (red-green color blindness). It works with LMS color space, K-Means clustering, and HSV contrast correction.",
      card: "projects", examples: ["What is ColorVision Enhancer?", "What does your color-blindness project do?"] },
    { id: "education", keywords: /university|degree|major|graduate/,
      answer: `I graduated from Zonguldak Bülent Ecevit University with a degree in Computer Engineering in ${site.graduation}. I was also accepted as a researcher under TÜBİTAK 2209-A.`,
      card: "experience", examples: ["Which university are you from?", "When did you graduate?", "What was your major?"] },
    { id: "languages", keywords: /language|english level|speak english/,
      answer: "My English is at a B1 level. I can read and write technical documentation, and I keep working on it.",
      examples: ["What's your English level?", "Do you speak any foreign languages?"] },
    { id: "certificates", keywords: /certificat|huawei/,
      answer: "I have a Huawei Ar-Ge Buluşması (R&D Meetup) certificate. I was also accepted as a researcher under TÜBİTAK 2209-A.",
      examples: ["Do you have any certificates?", "What's the Huawei certificate?"] },
    { id: "community", keywords: /community|gdg|google developer|devfest/,
      answer: "I'm Sponsorship Team Lead at GDG Zonguldak, running sponsorships for the DevFest conference. Before that I held the same role at GDG on Campus BEUN, where I also ran Git and GitHub workshops.",
      card: "experience", examples: ["Which communities are you part of?", "What do you do at GDG?", "What was your role at DevFest?"] },
    { id: "volunteering", keywords: /volunteer|bpw|genç tema|beu cyber/,
      answer: "I'm a mentee in BPW Istanbul's mentorship program, I designed social media content for BEÜN Genç TEMA, and I was a core-team member of BEU CYBER. More details are in the Experience section.",
      card: "experience", examples: ["Do you have volunteer experience?", "What is BPW?"] },
    { id: "availability", keywords: /when.*(start|available)|available now|hiring process/,
      answer: "I'm currently interning at Eterna Teknoloji and I'm open to new opportunities. Let's sort out timing and details over email.",
      card: "contact", examples: ["When can you start?", "Are you available right now?"] },
    { id: "salary", keywords: /salary|compensation|pay rate|how much do you charge/,
      answer: "I'd rather settle things like salary and compensation in a real conversation, not in writing. Feel free to email me.",
      card: "contact", examples: ["What's your salary expectation?", "What are your rates?"] },
    { id: "remote", keywords: /remote|relocat|work from/,
      answer: "How I work can depend on the role — let's talk it through over email too.",
      card: "contact", examples: ["Do you work remotely?", "Would you relocate?"] },
    { id: "hobbies", keywords: /free time|hobby|hobbies|outside of code|when you're not coding/,
      answer: `Outside of code I spend my time on ${site.hobbies.join(", ")}.`,
      examples: ["What do you do in your free time?", "What are your hobbies?"] },
    { id: "greeting", keywords: /thank|thanks|bye|goodbye|see you/,
      answer: "You're welcome, happy to help! I'm here if you think of anything else.",
      examples: ["Thanks", "See you", "Thank you"] },

    // ---- General topics ----
    { id: "web", keywords: /website|web ?site|web page|next\.?js/,
      answer: "Yes. I build personal, portfolio, and small-business websites — no templates, mobile-friendly, and polished. I designed and built the very site you're on with Next.js, this chat assistant included. Feel free to email me for details.",
      card: "contact", examples: ["Do you build websites?", "Can you build me a site?", "How did you build this site?"] },
    { id: "projects", keywords: /project|\bapp\b|application|portfolio/,
      answer: "I've featured a few projects spanning mobile, AI-powered decision systems, and computer vision. Tap one and I'll open the details.",
      card: "projects", examples: ["Which projects have you built?", "What have you made?", "Show me your projects"] },
    { id: "skills", keywords: /technolog|skill|tech stack|react|python|framework|node/,
      answer: "On mobile I work with React Native and TypeScript, on the backend with Node.js and Firebase, and on the AI side with Python, YOLOv8, and OpenCV.",
      card: "skills", examples: ["What technologies do you work with?", "What's your tech stack?"] },
    { id: "experience", keywords: /experience|internship|eterna|speedsoft|where.*work/,
      answer: "I've done two internships and I've held leadership roles in student communities. The most recent one is at Eterna Teknoloji, where I built Pixel Art Challenge from scratch.",
      card: "experience", examples: ["Can you tell me about your work experience?", "Where have you interned?", "Where do you currently work?"] },
    { id: "contact", keywords: /contact|reach|email|e-mail/,
      answer: "Email is the fastest way. You can also reach me through LinkedIn and GitHub.",
      card: "contact", examples: ["How can I reach you?", "What's your email?"] },
    { id: "about", keywords: /who are you|about yourself|introduce|\bhi\b|hello/,
      answer: "I'm Begüm — I graduated with a degree in Computer Engineering in June 2026. I build mobile apps end to end with React Native and weave AI into them. I'm currently interning as a mobile app developer at Eterna Teknoloji.",
      examples: ["Can you tell me a bit about yourself?", "Who are you?", "Hello"] },
  ];
}

const intentsByLocale: Record<Locale, Intent[]> = { tr: buildTr(), en: buildEn() };

function buildFallback(locale: Locale): Intent {
  const { site } = dict[locale];
  return {
    id: "fallback",
    keywords: /$^/,
    answer: locale === "en"
      ? `I don't know that one yet. Email me at ${site.email} and I'd be glad to talk it through.`
      : `Bunu henüz bilmiyorum. Bana ${site.email} adresinden yazarsan seve seve konuşuruz.`,
    card: "contact",
    examples: [],
  };
}

export function classify(question: string, locale: Locale = "tr"): Intent {
  const t = locale === "tr" ? question.toLocaleLowerCase("tr") : question.toLowerCase();
  const list = intentsByLocale[locale];
  return list.find((i) => i.keywords.test(t)) ?? buildFallback(locale);
}

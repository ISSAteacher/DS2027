// ============================================================
//  НАСТРОЙКИ — заполните перед публикацией (см. README.md)
// ============================================================

// 1) Firebase Console → Project settings → Your apps → Web app → SDK config
export const firebaseConfig = {
  apiKey: "AIzaSyBKwtXQmVLeMugRGT6K-HWBVF4V-D2IgIs",
  authDomain: "dshlsl2027.firebaseapp.com",
  projectId: "dshlsl2027",
  storageBucket: "dshlsl2027.firebasestorage.app",
  messagingSenderId: "1042667933352",
  appId: "1:1042667933352:web:a328dc58e4da4a04127c9d",
  measurementId: "G-3HXN2RDWX0"
};

// 2) E-mail(ы) учителя. Тот же список нужно вписать в firestore.rules и storage.rules.
export const TEACHER_EMAILS = ["issa2026cs@gmail.com"];

// 3) Загрузка файлов в чат и картинок в новости через Firebase Storage.
//    Для новых проектов Storage требует тариф Blaze (есть бесплатная квота).
//    false → вместо загрузки файлов ученики прикрепляют ссылки (Google Drive и т. п.).
export const USE_STORAGE = false;

// 4) ИИ-категоризация новостей через Firebase AI Logic (Gemini Developer API).
//    Включите AI Logic в консоли Firebase. Если ИИ недоступен — работает
//    запасной классификатор по ключевым словам.
export const AI_ENABLED = true;
export const AI_MODEL = "gemini-3.5-flash-lite";

// Версия Firebase JS SDK (CDN gstatic)
export const FIREBASE_VERSION = "13.4.0";

export const SCHOOL_NAME = "International Steppe School of Astana";

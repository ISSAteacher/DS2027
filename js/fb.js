// Инициализация Firebase (модульный SDK с CDN gstatic)
import { firebaseConfig, FIREBASE_VERSION as V, USE_STORAGE } from "./config.js";

const base = `https://www.gstatic.com/firebasejs/${V}`;
const appMod = await import(`${base}/firebase-app.js`);
export const authMod = await import(`${base}/firebase-auth.js`);
export const fs = await import(`${base}/firebase-firestore.js`);
export const stMod = USE_STORAGE ? await import(`${base}/firebase-storage.js`) : null;

export const app = appMod.initializeApp(firebaseConfig);
export const auth = authMod.getAuth(app);
export const db = fs.getFirestore(app);
export const storage = stMod ? stMod.getStorage(app) : null;
export const AI_BASE = base;

export const {
  doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, collection, query, where,
  orderBy, onSnapshot, getDocs, serverTimestamp, writeBatch, limit, deleteField,
} = fs;

export const col = (...p) => collection(db, ...p);
export const ref = (...p) => doc(db, ...p);

export async function uploadFile(path, file, onProgress) {
  if (!storage) throw new Error("Storage выключен в config.js");
  const r = stMod.ref(storage, path);
  const task = stMod.uploadBytesResumable(r, file, { contentType: file.type || "application/octet-stream" });
  await new Promise((res, rej) => {
    task.on("state_changed",
      (s) => onProgress && onProgress(Math.round((s.bytesTransferred / s.totalBytes) * 100)),
      rej, res);
  });
  return { url: await stMod.getDownloadURL(r), path };
}

export async function removeFile(path) {
  if (!storage || !path) return;
  try { await stMod.deleteObject(stMod.ref(storage, path)); } catch (e) { console.warn(e); }
}

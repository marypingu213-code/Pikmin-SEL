// Pikmin-SEL Firebase bridge — phase 1
// Keeps the existing SEL1–SEL5 game logic untouched.

const firebaseConfig = {
  apiKey: "AIzaSyBoLr-eixuw_UABUGK-lbCa8GTfmHRe1nw",
  authDomain: "pikmin-sel.firebaseapp.com",
  projectId: "pikmin-sel",
  storageBucket: "pikmin-sel.firebasestorage.app",
  messagingSenderId: "759793415971",
  appId: "1:759793415971:web:76ccf46caad63f62c8be96"
};

const ACTIVE_STUDENT_KEY = 'pikminSEL.activeStudentId';

window.PikminSELData = {
  firebaseConfig,
  app: null,
  db: null,
  ready: false,
  error: null,

  get activeStudentId() {
    return localStorage.getItem(ACTIVE_STUDENT_KEY) || '';
  },

  setActiveStudent(studentId) {
    const id = String(studentId || '').trim();
    if (id) localStorage.setItem(ACTIVE_STUDENT_KEY, id);
    else localStorage.removeItem(ACTIVE_STUDENT_KEY);
    window.dispatchEvent(new CustomEvent('pikmin-active-student-change', { detail: { studentId: id } }));
    return id;
  },

  clearActiveStudent() {
    return this.setActiveStudent('');
  },

  async init() {
    if (this.ready) return this;
    try {
      const [{ initializeApp }, { getFirestore, collection, addDoc, serverTimestamp }] = await Promise.all([
        import('https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js'),
        import('https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js')
      ]);
      this.app = initializeApp(firebaseConfig);
      this.db = getFirestore(this.app);
      this._firestore = { collection, addDoc, serverTimestamp };
      this.ready = true;
      window.dispatchEvent(new CustomEvent('pikmin-firebase-ready'));
      console.info('[Pikmin-SEL] Firebase initialized:', firebaseConfig.projectId);
      return this;
    } catch (error) {
      this.error = error;
      console.error('[Pikmin-SEL] Firebase initialization failed:', error);
      throw error;
    }
  },

  async recordActivity(moduleId, activityId, payload = {}) {
    if (!this.ready) await this.init();
    const studentId = this.activeStudentId;
    if (!studentId) throw new Error('尚未設定目前探險員 activeStudentId');
    const { collection, addDoc, serverTimestamp } = this._firestore;
    return addDoc(collection(this.db, 'activityRecords'), {
      studentId,
      moduleId,
      activityId,
      payload,
      createdAt: serverTimestamp(),
      schemaVersion: 1
    });
  }
};

window.PikminSELData.init().catch(() => {});

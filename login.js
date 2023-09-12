const firebaseConfig = {
    apiKey: "AIzaSyCgtnsaJYZ9xy36v9j1bNhfNLFpdm-qP9w",
    authDomain: "automatic-opus-382309.firebaseapp.com",
    databaseURL:"https://automatic-opus-382309-default-rtdb.firebaseio.com",
    projectId: "automatic-opus-382309",
    storageBucket: "automatic-opus-382309.appspot.com",
    messagingSenderId: "813997175242",
    appId: "1:813997175242:web:20daf0e3626a64ae0c5f33",
    measurementId: "G-5DB78QE1BJ"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('#email').value;
    const password = loginForm.querySelector('#password').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Login error:', error);
    }
});

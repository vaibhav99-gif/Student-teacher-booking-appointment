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
const appointmentsContainer = document.getElementById('appointments');
const appointmentForm = document.getElementById('appointment-form');
const logoutButton = document.getElementById('logout-btn');

auth.onAuthStateChanged(user => {
    if (user) {
        // User is logged in
        appointmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const selectedDate = appointmentForm.querySelector('#appointment-date').value;

            try {
                await db.collection('appointments').add({
                    student: user.uid,
                    date: selectedDate,
                    status: 'pending'
                });
                appointmentForm.reset();
            } catch (error) {
                console.error('Appointment scheduling error:', error);
            }
        });

        logoutButton.addEventListener('click', () => {
            auth.signOut().then(() => {
                window.location.href = 'index.html';
            });
        });

        db.collection('appointments')
            .where('student', '==', user.uid)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const appointment = doc.data();
                    const appointmentDiv = document.createElement('div');
                    appointmentDiv.textContent = `Date: ${appointment.date}, Status: ${appointment.status}`;
                    appointmentsContainer.appendChild(appointmentDiv);
                });
            });
    } else {
        window.location.href = 'index.html';
    }
});

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

async function fetchTeachers() {
    const teacherList = document.getElementById('teacher-list');
    teacherList.innerHTML = '';

    try {
        const snapshot = await db.collection('teachers').get();
        snapshot.forEach(doc => {
            const teacher = doc.data();
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${teacher.name}</strong> - ${teacher.department}`;
            teacherList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching teachers:', error);
    }
}

async function fetchRegistrationApprovals() {
    const registrationApprovals = document.getElementById('registration-approvals');
    registrationApprovals.innerHTML = '';

    try {
        const snapshot = await db.collection('registrationApprovals').get();
        snapshot.forEach(doc => {
            const student = doc.data();
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${student.name}</strong> - ${student.email}`;
            const approveButton = document.createElement('button');
            approveButton.textContent = 'Approve';
            approveButton.addEventListener('click', async () => {
                // Perform approval logic and update Firestore
                await db.collection('students').add({
                    name: student.name,
                    email: student.email,
                    // ... Other fields
                });
                await doc.ref.delete();
                fetchRegistrationApprovals(); // Refresh the list
            });
            listItem.appendChild(approveButton);
            registrationApprovals.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching registration approvals:', error);
    }
}

window.addEventListener('load', () => {
    fetchTeachers();
    fetchRegistrationApprovals();
});

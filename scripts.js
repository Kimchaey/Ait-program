document.addEventListener('DOMContentLoaded', () => {
    const journalForm = document.getElementById('journalForm');
    const journalEntries = document.getElementById('journalEntries');
    const journalDetailForm = document.getElementById('journalDetailForm');
    const journalDetailSection = document.getElementById('journal-detail');

    const detailDate = document.getElementById('detail-date');
    const detailEntry = document.getElementById('detail-entry');
    const updateEntryButton = document.getElementById('updateEntry');
    const deleteEntryButton = document.getElementById('deleteEntry');
    const cancelEditButton = document.getElementById('cancelEdit');

    // Simulated login state (replace with real authentication logic)
    const isLoggedIn = false;

    let savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    let currentEntryIndex = null;

    function renderEntries() {
        journalEntries.innerHTML = '<h3>저장된 일기</h3>';
        savedEntries.forEach((entry, index) => {
            const entryElement = document.createElement('div');
            entryElement.className = 'journal-entry';
            entryElement.innerHTML = `
                <h4>${entry.date}</h4>
                <p>${entry.text.substring(0, 100)}...</p>
                <button class="btn-view" data-index="${index}">보기 및 수정</button>
            `;
            journalEntries.appendChild(entryElement);
        });
    }

    journalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            alert("로그인이 필요한 기능입니다. 로그인 후 다시 시도하세요.");
            window.location.href = "#home";  // Redirect to home
            return;
        }

        const date = document.getElementById('date').value;
        const text = document.getElementById('entry').value;

        const newEntry = { date, text };
        savedEntries.push(newEntry);
        localStorage.setItem('journalEntries', JSON.stringify(savedEntries));

        journalForm.reset();
        renderEntries();
    });

    journalEntries.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-view')) {
            if (!isLoggedIn) {
                alert("로그인이 필요한 기능입니다. 로그인 후 다시 시도하세요.");
                window.location.href = "#home";  // Redirect to home
                return;
            }

            currentEntryIndex = e.target.getAttribute('data-index');
            const entry = savedEntries[currentEntryIndex];

            detailDate.value = entry.date;
            detailEntry.value = entry.text;

            journalDetailSection.style.display = 'block';
            window.scrollTo({
                top: journalDetailSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });

    updateEntryButton.addEventListener('click', () => {
        savedEntries[currentEntryIndex] = {
            date: detailDate.value,
            text: detailEntry.value
        };
        localStorage.setItem('journalEntries', JSON.stringify(savedEntries));
        renderEntries();
        journalDetailSection.style.display = 'none';
    });

    deleteEntryButton.addEventListener('click', () => {
        savedEntries.splice(currentEntryIndex, 1);
        localStorage.setItem('journalEntries', JSON.stringify(savedEntries));
        renderEntries();
        journalDetailSection.style.display = 'none';
    });

    cancelEditButton.addEventListener('click', () => {
        journalDetailSection.style.display = 'none';
    });

    renderEntries();
});

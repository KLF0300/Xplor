// Select elements
const form = document.getElementById('inputForm');
const summary = document.getElementById('summary');
const report = document.getElementById('report');
const testContainer = document.getElementById('testContainer');
const addTestBtn = document.getElementById('addTestBtn');
const endSessionBtn = document.getElementById('endSessionBtn');
const testTemplate = document.getElementById('test-template');

// Helper: add a new test section
function addTestSection() {
    const clone = testTemplate.content.cloneNode(true);
    testContainer.appendChild(clone);
}

// Collect all test section data
function collectTestData() {
    const sections = document.querySelectorAll('.test-section');
    return Array.from(sections).map((section, index) => {
        const textareas = section.querySelectorAll('textarea');
        return {
            section: index + 1,
            idea: textareas[0]?.value || '',
            notes: textareas[1]?.value || '',
            newIdeas: textareas[2]?.value || ''
        };
    });
}

// Form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();

    document.getElementById('sumSystemName').innerText = "Name: " + document.getElementById('systemName').value;
    document.getElementById('sumSystemVersion').innerText = "Version: " + document.getElementById('systemVersion').value;
    document.getElementById('sumExplore').innerText = "Explore: " + document.getElementById('explore').value;
    document.getElementById('sumWithRes').innerText = "With: " + document.getElementById('withRes').value;
    document.getElementById('sumToDiscover').innerText = "To discover: " + document.getElementById('toDiscover').value;

    form.style.display = 'none';
    summary.style.display = 'block';

    addTestSection(); // add first test section
});

// Add new test section
addTestBtn.addEventListener('click', addTestSection);

// End test session and generate report
endSessionBtn.addEventListener('click', function() {
    report.innerHTML = '<h2>Test Session Report</h2>';

    // System & Mission info
    const sysFieldset = document.createElement('fieldset');
    sysFieldset.innerHTML = `<legend>System under test</legend>
        <p>Name: ${document.getElementById('systemName').value}</p>
        <p>Version: ${document.getElementById('systemVersion').value}</p>`;
    report.appendChild(sysFieldset);

    const missionFieldset = document.createElement('fieldset');
    missionFieldset.innerHTML = `<legend>Mission</legend>
        <p>Explore: ${document.getElementById('explore').value}</p>
        <p>With: ${document.getElementById('withRes').value}</p>
        <p>To discover: ${document.getElementById('toDiscover').value}</p>`;
    report.appendChild(missionFieldset);

    // Test sections
    const tests = collectTestData();
    tests.forEach(test => {
        const fieldset = document.createElement('fieldset');
        fieldset.innerHTML = `<legend>Test ${test.section}</legend>
            <p id="idea">Idea: ${test.idea}</p>
            <p id="notes">Notes: ${test.notes}</p>
            <p id="newideas">New ideas: ${test.newIdeas}</p>`;
        report.appendChild(fieldset);
    });

    // Next Steps section
    const nextStepsFieldset = document.createElement('fieldset');
    nextStepsFieldset.innerHTML = '<legend>Next Steps</legend>';
    tests.forEach(test => {
        // Always include section even if newIdeas is empty
        const ideaText = test.newIdeas.trim() !== '' ? test.newIdeas : '(no new ideas)';
        const p = document.createElement('p');
        p.innerText = `Test ${test.section}: ${ideaText}`;
        nextStepsFieldset.appendChild(p);
    });
    report.appendChild(nextStepsFieldset);

    // Show report, hide summary
    summary.style.display = 'none';
    report.style.display = 'block';
});




const test = require('node:test');
const assert = require('node:assert/strict');
const { buildFallbackResumeData } = require('../services.js/aiService');

test('buildFallbackResumeData extracts key resume details from plain text', () => {
  const resumeText = `
    John Doe
    Senior Software Developer
    +1 555-123-4567
    john@example.com
    5 years of experience in React and Node.js
    Based in New Delhi
  `;

  const data = buildFallbackResumeData(resumeText);

  assert.equal(data.profile.name, 'John Doe');
  assert.equal(data.profile.phone, '+1 555-123-4567');
  assert.equal(data.profile.category, 'Developer');
  assert.equal(data.profile.location, 'New Delhi');
  assert.equal(data.profile.profession, 'Senior Software Developer');
  assert.ok(Array.isArray(data.skills));
});

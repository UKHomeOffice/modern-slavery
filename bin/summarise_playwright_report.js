'use strict';

const fs = require('node:fs');

function readText(path) {
  return fs.readFileSync(path, 'utf8');
}

function parseCount(text, label) {
  const match = text.match(new RegExp(String.raw`(\d+)\s+${label}`, 'i'));
  return match ? Number(match[1]) : 0;
}

function parseDuration(text) {
  const match = text.match(/\(([^)]+)\)\s*$/m);
  return match ? match[1] : 'unknown';
}

function buildSummaryFromText(outputText) {
  const commandFailure = outputText.match(/(?:playwright|yarn):\s+not found|command not found/i);
  if (commandFailure) {
    return [
      'Playwright Nightly Summary',
      'Unable to execute Playwright command.',
      `Error: ${commandFailure[0]}`
    ].join('\n');
  }

  const passed = parseCount(outputText, 'passed');
  const failed = parseCount(outputText, 'failed');
  const flaky = parseCount(outputText, 'flaky');
  const skipped = parseCount(outputText, 'skipped');
  const duration = parseDuration(outputText);
  const total = passed + failed + flaky + skipped;

  return [
    'Playwright Nightly Summary',
    `Total: ${total}`,
    `Passed: ${passed}`,
    `Failed: ${failed}`,
    `Flaky: ${flaky}`,
    `Skipped: ${skipped}`,
    `Duration: ${duration}`
  ].join('\n');
}

function main() {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];
  if (!inputPath || !outputPath) {
    process.stderr.write('Usage: node bin/summarise_playwright_report.js <input-text> <output-txt>\n');
    process.exitCode = 1;
    return;
  }

  let summary;
  try {
    summary = buildSummaryFromText(readText(inputPath));
    if (!summary.includes('Passed:') || !summary.includes('Failed:')) {
      throw new Error('Unable to detect Playwright totals in run output');
    }
  } catch (error) {
    summary = `Playwright Nightly Summary\nUnable to parse run output: ${error.message || error}`;
  }

  fs.writeFileSync(outputPath, `${summary}\n`, 'utf8');
  process.stdout.write(`${summary}\n`);
}

main();


{{#reportSaved}}
<div class="govuk-panel govuk-panel--confirmation">
  <h1 class="govuk-panel__title">{{#t}}pages.save-report.save-report-success{{/t}}</h1>
  <div class="govuk-panel__body">
    {{#t}}pages.save-report.success-panel-text{{/t}}
  </div>
</div>

<p>{{#t}}pages.save-report.paragraph-1-success{{/t}}</p>

<p>{{#t}}pages.save-report.paragraph-2-success{{/t}}</p>
{{/reportSaved}}

{{^reportSaved}}
<h2>{{#t}}pages.save-report.save-report-fail{{/t}}</h2>

<p>{{#t}}pages.save-report.paragraph-1-fail{{/t}}</p>

{{/reportSaved}}

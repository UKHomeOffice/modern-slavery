@NrmRegression @NrmRegressionCI
Feature: NRM - National Referral Mechanism

Background: 
  Given I visit the National Referral Mechanism page
  And I enter my work Email "SAS_HOF_EMAIL" and create new report

  Scenario Outline: National Referral Mechanism - E2E
    When I fill out my answers to the NRM questionnaire for scenario "<Description>"
    Then I am able to submit the NRM questionnaire
    Examples:
      | Description                              |
      | T1: Yes answers - under 18               |
      | T2: No answers - over 18, No Cooperation |
      | T3: Not sure if under 18                 |
      | T4: E2E mixed                            |
      | T5: Add max locations                    |
      | T6: No answers - Yes Cooperation         |


  Scenario: NRM - Continue report
    When I fill out my answers to the NRM questionnaire for scenario "Continue report"
    And I navigate back to the reports dashboard
    Then I am able to click 'Go to report' button and continue the report


  Scenario: NRM - Delete report
    When I fill out my answers to the NRM questionnaire for scenario "Delete report"
    And I navigate back to the reports dashboard
    Then I am able to delete my report


  Scenario: NRM - Save And Exit report
    When I fill out my answers to the NRM questionnaire for scenario "Save and exit report"
    Then I click 'Save and exit' button and confirm my report is saved
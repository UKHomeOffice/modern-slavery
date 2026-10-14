@NrmRegression @NrmRegressionCI
Feature: NRM - National Referral Mechanism

  Background:
    Given Test data has been created for "NRM" scenarios

  Scenario Outline: National Referral Mechanism - E2E
    Given I visit the National Referral Mechanism page
    When I selected the data for scenario "<Description>"
    And I enter my work Email "SAS_HOF_EMAIL" and create new report
    And I fill out my answers to the NRM questionnaire
    Then I am able to submit the NRM questionnaire
    Examples:
      | Description                           |
      | 'Yes' answers - under18               |
      | 'No' answers - over18, No Cooperation |
      | Not sure if under18                   |
      | E2E mixed                             |
      | Add max locations                     |
      | 'No' answers - Yes Cooperation        |

  Scenario: NRM - Continue report
    Given I visit the National Referral Mechanism page
    When I selected the data for scenario "Continue report"
    And I enter my work Email "SAS_HOF_EMAIL" and create new report
    And I fill out my answers to some of the NRM questionnaire
    And I navigate back to the reports dashboard
    Then I am able to click 'Go to report' button and continue the report

  Scenario: NRM - Delete report
    Given I visit the National Referral Mechanism page
    When I selected the data for scenario "Delete report"
    And I enter my work Email "SAS_HOF_EMAIL" and create new report
    And I fill out my answers to some of the NRM questionnaire
    And I navigate back to the reports dashboard
    Then I am able to delete my report

  Scenario: NRM - Save And Exit report
    Given I visit the National Referral Mechanism page
    When I selected the data for scenario "Save and exit report"
    And I enter my work Email "SAS_HOF_EMAIL" and create new report
    And I fill out my answers to some of the NRM questionnaire
    Then I click 'Save and exit' button and confirm my report is saved

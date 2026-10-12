@NrmRegression
@NrmRegressionCI
Feature: NRM - National Referral Mechanism

  Background:
     Given Test data has been created for "NRM" scenarios

  Scenario Outline: National Referral Mechanism - E2E
    Given I visit the National Referral Mechanism page
    When I selected the data for scenario "<Description>"
    And I enter my work Email "sas-hof-test@digital.homeoffice.gov.uk" and create new report - check error "<Check Error>"
    And I fill out my answers to the NRM questionnaire - check error "<Check Error>"
    Then I am able to submit the NRM questionnaire
    Examples:
      | Description                           | Check Error |
      | 'Yes' answers - under18               | No          |
      | 'No' answers - over18, No Cooperation | No          |
      | Not sure if under18                   | No          |
      | E2E mixed                             | No          |
    #      | max character #Has a bug-NRM-301      | No          |
      | Add max locations                     | No          |
      | 'No' answers - Yes Cooperation        | No          |
    #      | 'Yes' answers - Page validations      | Yes         |

  Scenario: NRM - Continue report
    Given I visit the National Referral Mechanism page
    When I selected the data for scenario "Continue report"
    And I enter my work Email "sas-hof-test@digital.homeoffice.gov.uk" and create new report - check error "<Check Error>"
    And I fill out my answers to some of the NRM questionnaire - check error "No"
    And I navigate back to the reports dashboard
    Then I am able to click 'Go to report' button and continue the report

  Scenario: NRM - Delete report
    Given I visit the National Referral Mechanism page
    When I selected the data for scenario "Delete report"
    And I enter my work Email "sas-hof-test@digital.homeoffice.gov.uk" and create new report - check error "<Check Error>"
    And I fill out my answers to some of the NRM questionnaire - check error "No"
    And I navigate back to the reports dashboard
    Then I am able to delete my report

  Scenario: NRM - Save And Exit report
    Given I visit the National Referral Mechanism page
    When I selected the data for scenario "Save and exit report"
    And I enter my work Email "sas-hof-test@digital.homeoffice.gov.uk" and create new report - check error "<Check Error>"
    And I fill out my answers to some of the NRM questionnaire - check error "No"
    Then I click 'Save and exit' button and confirm my report is saved
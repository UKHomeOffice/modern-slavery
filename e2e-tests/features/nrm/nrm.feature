@NrmRegression
Feature: NRM - National Referral Mechanism

  Background:
    Given Test data has been created for "NRM" scenarios

  @RegressionTestCI @regression3
  Scenario Outline: National Referral Mechanism - E2E
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the National Referral Mechanism page
    And I enter my work Email "sas-hof-test@digital.homeoffice.gov.uk" and create new report - check error "<Check Error>"
    And I fill out my answers to the NRM questionnaire - check error "<Check Error>"
    Then I am able to submit the NRM questionnaire

    Examples:
      | Scenario ID | Description                           | Check Error |
      | 1           | 'Yes' answers - under18               | No          |
      | 2           | 'No' answers - over18, No Cooperation | No          |
      | 5           | Not sure if under18                   | No          |
      | 6           | E2E mixed                             | No          |
      | 8           | Add max locations                     | No          |
      | 9           | 'No' answers - Yes Cooperation        | No          |

  Scenario: NRM - Continue report
    Given I selected the data for scenario "3" - "Continue report"
    When I visit the National Referral Mechanism page
    And I enter my work Email "sas-hof-test@digital.homeoffice.gov.uk" and create new report - check error "No"
    And I fill out my answers to some of the NRM questionnaire - check error "No"
    And I navigate back to the reports dashboard
    Then I am able to click 'Go to report' button and continue the report

  Scenario: NRM - Delete report
    Given I selected the data for scenario "4" - "Delete report"
    When I visit the National Referral Mechanism page
    And I enter my work Email "sas-hof-test@digital.homeoffice.gov.uk" and create new report - check error "No"
    And I fill out my answers to some of the NRM questionnaire - check error "No"
    And I navigate back to the reports dashboard
    Then I am able to delete my report

  Scenario: NRM - Save And Exit report
    Given I selected the data for scenario "11" - "Save and exit report"
    When I visit the National Referral Mechanism page
    And I enter my work Email "sas-hof-test@digital.homeoffice.gov.uk" and create new report - check error "No"
    And I fill out my answers to some of the NRM questionnaire - check error "No"
    Then I click 'Save and exit' button and confirm my report is saved

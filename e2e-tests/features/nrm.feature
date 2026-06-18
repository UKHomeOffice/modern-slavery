@NrmRegression

Feature: NRM - National Referral Mechanism

  Background:
    Given Test data has been created for "NRM" scenarios

  @RegressionTestCI @regression3
  Scenario Outline: National Referral Mechanism - E2E
    Given I selected NRM journey data "<NRM Journey Test>"
    When I visit the National Referral Mechanism page
    And I create a new NRM report for the selected journey
    And I complete the NRM questionnaire for the selected journey
    Then I am able to submit the NRM questionnaire
    Examples:
      | NRM Journey Test                      |
      | T1: Yes answers - under18             |
      | T2: No answers - over18, no cooperation |
      | T5: Not sure if under18               |
      | T6: E2E mixed                         |
      | T8: Add max locations                 |
      | T9: No answers - yes cooperation      |

  Scenario: NRM - Continue report
    Given I selected NRM journey data "T3: Continue report"
    When I visit the National Referral Mechanism page
    And I create a new NRM report for the selected journey
    And I complete some of the NRM questionnaire for the selected journey
    And I navigate back to the reports dashboard
    Then I am able to click 'Go to report' button and continue the report

  Scenario: NRM - Delete report
    Given I selected NRM journey data "T4: Delete report"
    When I visit the National Referral Mechanism page
    And I create a new NRM report for the selected journey
    And I complete some of the NRM questionnaire for the selected journey
    And I navigate back to the reports dashboard
    Then I am able to delete my report

  Scenario: NRM - Save And Exit report
    Given I selected NRM journey data "T11: Save and exit report"
    When I visit the National Referral Mechanism page
    And I create a new NRM report for the selected journey
    And I complete some of the NRM questionnaire for the selected journey
    Then I click 'Save and exit' button and confirm my report is saved

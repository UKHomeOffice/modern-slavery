@NrmValidation
@NrmRegressionCI
Feature: NRM validation

  Background:
    Given I visit the National Referral Mechanism page
    And I enter my work Email "SAS_HOF_EMAIL" and create new report

  Scenario: Validate required NRM questionnaire answers
    When I allow time for the full NRM validation journey

    # Reference page
    When I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must enter a reference" error summary
    When I complete the NRM validation page with valid answers for "reference"

    # Organisation page
    When I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select the organisation" error summary
    When I complete the NRM validation page with valid answers for "organisation"

    # Report location page
    When I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must enter a region" error summary
    When I complete the NRM validation page with valid answers for "report location"

    # Potential victim age pages
    When I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "victim age"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "age during exploitation"

    # Potential victim background page
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter the birthplace¬Enter the family details¬Enter the education history¬Enter the employment history" error summary
    When I complete the NRM validation page with valid answers for "background"

    # Number of exploitative situations page
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Select if the potential victim been in more than one exploitative situation" error summary
    When I complete the NRM validation page with valid answers for "multiple exploitation"

    # Exploitation period page
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter when the exploitation happened" error summary
    When I complete the NRM validation page with valid answers for "exploitation period"

    # How exploitation started page
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter when the exploitation started" error summary
    When I complete the NRM validation page with valid answers for "how exploitation started"

    # Journey details are required when the answer is yes
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "taken somewhere without details"
    Then I should see "There is a problem" error message displayed
    And I should see "Enter the journey's details" error summary
    When I complete the NRM validation page with valid answers for "taken somewhere"

    # Treatment page
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter what they had to do¬Enter their living conditions¬Enter how they were treated" error summary
    When I complete the NRM validation page with valid answers for "treatment details"

    # Current exploitation status and leaving the situation
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Select if the potential victim is still in an exploitative situation" error summary
    When I complete the NRM validation page with valid answers for "current exploitation status"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter how they left" error summary
    When I complete the NRM validation page with valid answers for "leaving the situation"

    # Last contact and previous reports
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us when they were last in contact" error summary
    When I complete the NRM validation page with valid answers for "last contact period"
    And I complete the NRM validation page with valid answers for "last contact details"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "first report"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter anything that prevented the potential victim from reporting this sooner" error summary
    When I complete the NRM validation page with valid answers for "why report now"

    # Modern slavery indicators and professional insight
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Select if you identified any modern slavery indicators" error summary
    When I complete the NRM validation page with valid answers for "indicators without details"
    Then I should see "There is a problem" error message displayed
    And I should see "Enter details of modern slavery indicators" error summary
    When I complete the NRM validation page with valid answers for "indicators"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter details about the interview" error summary
    When I complete the NRM validation page with valid answers for "interviews"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter details of your professional insight" error summary
    When I complete the NRM validation page with valid answers for "professional insight"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "credibility"

    # Other professionals or organisations
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "other professionals without details"
    Then I should see "There is a problem" error message displayed
    And I should see "Enter other people involved" error summary
    When I complete the NRM validation page with valid answers for "other professionals"

    # Exploitation locations
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "exploitation location type"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select a city or town from the list" error summary
    When I complete the NRM validation page with valid answers for "UK exploitation location"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select a city from the list¬You must select a region from the list" error summary
    When I complete the NRM validation page with valid answers for "current victim location"

    # Exploiter details and exploitation types
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must enter details about the exploiter(s)" error summary
    When I complete the NRM validation page with valid answers for "exploiter details"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us if you have information about where the exploiters are" error summary
    When I complete the NRM validation page with valid answers for "exploiter location availability"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us if the exploiters are in the UK" error summary
    When I complete the NRM validation page with valid answers for "exploiters in UK"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us what information you have about the exploiters' location" error summary
    When I complete the NRM validation page with valid answers for "exploiter location details"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an exploitation type" error summary
    When I complete the NRM validation page with valid answers for "exploitation types"

    # Other potential victims and future exploitation risk
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "other potential victims"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us if there are concerns about re-exploitation in the future" error summary
    When I complete the NRM validation page with valid answers for "future exploitation risk"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us why there are concerns" error summary
    When I complete the NRM validation page with valid answers for "future exploitation details"

    # Police reference and co-operation with public authorities
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "crime reference without details"
    Then I should see "There is a problem" error message displayed
    And I should see "You must select a police force from the list¬You must enter a crime or CAD reference" error summary
    When I complete the NRM validation page with valid answers for "crime reference"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us if the potential victim will co-operate with public authorities" error summary
    When I complete the NRM validation page with valid answers for "co-operation"

    # NRM referral decision and potential victim details
    When I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must enter the NRM decision" error summary
    When I complete the NRM validation page with valid answers for "NRM decision"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select if support is required" error summary
    When I complete the NRM validation page with valid answers for "support required"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must enter the potential victim's first name¬You must enter the potential victim's last name" error summary
    When I complete the NRM validation page with valid answers for "potential victim name"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a date of birth" error summary
    When I complete the NRM validation page with valid answers for "date of birth"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select the potential victim's gender" error summary
    When I complete the NRM validation page with valid answers for "gender"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "children"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select the potential victim's nationality from the list" error summary
    When I complete the NRM validation page with valid answers for "nationality"

    # Interpreter, communication help and Home Office reference
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "interpreter"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "communication help"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "Home Office reference"

    # Decision recipient and potential victim contact details
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select an option" error summary
    When I complete the NRM validation page with valid answers for "decision recipient"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must select one or more of the contact methods listed" error summary
    When I complete the NRM validation page with valid answers for "decision contact details"

    # First responder contact details and evidence
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must enter your first name ¬You must enter your last name ¬You must enter your role¬You must enter a phone number" error summary
    When I complete the NRM validation page with valid answers for "reporter contact details"
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter an alternative email address" error summary
    When I complete the NRM validation page with valid answers for "absence contact"
    And I complete the NRM validation page with valid answers for "evidence"
    Then I should be on the NRM check your answers page
    When I choose to send report
    Then I should see "NRM referral sent" header on the confirmation page
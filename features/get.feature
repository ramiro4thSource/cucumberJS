@GET
Feature: Exploring cucumber to JS
Scenario: Sunday isn't Friday
    Given todas is Sunday
    When I ask whether it's Friday yet 
    Then I should be told "Nope"

 Scenario: Friday is Friday
    Given today is Friday
    When I ask whether it's Friday yet
    Then I should be told "TGIF"
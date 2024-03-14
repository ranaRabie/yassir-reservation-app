Feature: duckduckgo.com
  Scenario: Display the reservations as a list
    Given User is in the reservation list section
    Then List of reservations for upcoming days are displayed

  Scenario: Filter reservations
    Given User is in the reservation list section
    And User click on show filters button
    When User filters by date, status, shift and area
    Then List of reservations is updated based on the filters selected

  Scenario: Search by name and surname
    Given User is in the reservation list section
    And User click on show filters button
    When User searches by name and surname of the reservation
    Then Displays the results for the specified name and surname in the list
  
  Scenario: Sort reservations
    Given User is in the reservation list section
    When User clicks on a field to sort
    Then List of reservations is updated based on the sorting applied

  Scenario: Toggle filters correct
    Given User is in the reservation list section
    When User click on show filters button
    Then User should see the filters section
    And User click on show filters button
    Then User should not see the filters section

  Scenario: Show no data if no data exists
    Given User is in the reservation list section
    And User click on show filters button
    When User searches by wrong name and wrong surname of the reservation
    Then User should see no data section

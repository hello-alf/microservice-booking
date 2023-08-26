Feature: Property API
  Scenario: Get all properties
    When a GET request is made to "/property"
    Then the response status code should be 200